/**
 * Billing Controller
 * Stripe Integration
 */

const { User } = require('../models');
const { apiResponse } = require('../utils/helpers');
const config = require('../config');

// Initialize Stripe (mock for development)
let stripe = null;
if (config.stripe.secretKey && !config.stripe.secretKey.includes('placeholder')) {
  stripe = require('stripe')(config.stripe.secretKey);
}

/**
 * GET /billing/status
 * Get billing status
 */
function getStatus(req, res) {
  const user = req.user;

  // Calculate next billing date
  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  res.json(apiResponse(true, 'Billing status retrieved', {
    status: user.billing_status || 'trialing',
    plan: {
      name: 'SimplyLouie Movement',
      price: '$2/month',
      currency: 'usd',
      amount: 200
    },
    trial_ends_at: user.trial_ends_at,
    next_billing_date: nextBillingDate.toISOString(),
    has_payment_method: !!user.stripe_customer_id
  }));
}

/**
 * POST /billing/update-card
 * Update payment method
 */
async function updateCard(req, res) {
  const { payment_method_id } = req.body;
  const user = req.user;

  try {
    if (stripe) {
      // Production: Use Stripe API
      let customerId = user.stripe_customer_id;

      // Create customer if doesn't exist
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: { user_id: user.id }
        });
        customerId = customer.id;
      }

      // Attach payment method
      await stripe.paymentMethods.attach(payment_method_id, {
        customer: customerId
      });

      // Set as default
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: payment_method_id
        }
      });

      // Create or update subscription
      let subscriptionId = user.stripe_subscription_id;

      if (!subscriptionId) {
        const subscription = await stripe.subscriptions.create({
          customer: customerId,
          items: [{ price: config.stripe.priceId }],
          trial_end: Math.floor(new Date(user.trial_ends_at).getTime() / 1000)
        });
        subscriptionId = subscription.id;
      }

      // Update user
      User.updateBilling(user.id, {
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        billing_status: 'active'
      });
    } else {
      // Development: Mock update
      User.updateBilling(user.id, {
        stripe_customer_id: `cus_mock_${Date.now()}`,
        stripe_subscription_id: `sub_mock_${Date.now()}`,
        billing_status: 'active'
      });
    }

    res.json(apiResponse(true, 'Payment method updated'));
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json(apiResponse(false, 'Failed to update payment method'));
  }
}

/**
 * POST /billing/cancel
 * Cancel subscription
 */
async function cancelSubscription(req, res) {
  const user = req.user;

  try {
    if (stripe && user.stripe_subscription_id) {
      // Production: Cancel at period end
      await stripe.subscriptions.update(user.stripe_subscription_id, {
        cancel_at_period_end: true
      });
    }

    // Update user status
    User.updateBilling(user.id, {
      stripe_customer_id: user.stripe_customer_id,
      stripe_subscription_id: user.stripe_subscription_id,
      billing_status: 'canceled'
    });

    res.json(apiResponse(true, 'Subscription cancelled. Access continues until end of billing period.'));
  } catch (error) {
    console.error('Cancel error:', error);
    res.status(500).json(apiResponse(false, 'Failed to cancel subscription'));
  }
}

/**
 * POST /billing/reactivate
 * Reactivate cancelled subscription
 */
async function reactivateSubscription(req, res) {
  const user = req.user;

  if (user.billing_status !== 'canceled') {
    return res.status(400).json(apiResponse(false, 'Subscription is not cancelled'));
  }

  try {
    if (stripe && user.stripe_subscription_id) {
      await stripe.subscriptions.update(user.stripe_subscription_id, {
        cancel_at_period_end: false
      });
    }

    User.updateBilling(user.id, {
      stripe_customer_id: user.stripe_customer_id,
      stripe_subscription_id: user.stripe_subscription_id,
      billing_status: 'active'
    });

    res.json(apiResponse(true, 'Subscription reactivated'));
  } catch (error) {
    console.error('Reactivate error:', error);
    res.status(500).json(apiResponse(false, 'Failed to reactivate subscription'));
  }
}

/**
 * Stripe Webhook Handler
 * POST /billing/webhook
 */
async function handleWebhook(req, res) {
  if (!stripe) {
    return res.status(400).json(apiResponse(false, 'Stripe not configured'));
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      config.stripe.webhookSecret
    );
  } catch (err) {
    console.error('Webhook signature error:', err);
    return res.status(400).json(apiResponse(false, 'Webhook signature failed'));
  }

  // Handle events
  switch (event.type) {
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const subscription = event.data.object;
      const customerId = subscription.customer;

      // Find user by customer ID
      const { getDatabase } = require('../database');
      const db = getDatabase();
      const user = db.prepare('SELECT * FROM users WHERE stripe_customer_id = ?').get(customerId);

      if (user) {
        let status = 'active';
        if (subscription.status === 'trialing') status = 'trialing';
        if (subscription.status === 'past_due') status = 'past_due';
        if (subscription.status === 'canceled' || subscription.cancel_at_period_end) status = 'canceled';

        User.updateBilling(user.id, {
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          billing_status: status
        });
      }
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const customerId = invoice.customer;

      const { getDatabase } = require('../database');
      const db = getDatabase();
      const user = db.prepare('SELECT * FROM users WHERE stripe_customer_id = ?').get(customerId);

      if (user) {
        User.updateBilling(user.id, {
          stripe_customer_id: customerId,
          stripe_subscription_id: user.stripe_subscription_id,
          billing_status: 'past_due'
        });
      }
      break;
    }
  }

  res.json({ received: true });
}

module.exports = {
  getStatus,
  updateCard,
  cancelSubscription,
  reactivateSubscription,
  handleWebhook
};
