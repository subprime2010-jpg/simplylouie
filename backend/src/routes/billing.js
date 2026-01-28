/**
 * Billing Routes
 */

const express = require('express');
const router = express.Router();

const billingController = require('../controllers/billingController');
const { requireAuth } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { handleValidation, updateCardRules } = require('../middleware/validate');

// GET /billing/status
router.get(
  '/status',
  requireAuth,
  billingController.getStatus
);

// POST /billing/update-card
router.post(
  '/update-card',
  requireAuth,
  updateCardRules,
  handleValidation,
  asyncHandler(billingController.updateCard)
);

// POST /billing/cancel
router.post(
  '/cancel',
  requireAuth,
  asyncHandler(billingController.cancelSubscription)
);

// POST /billing/reactivate
router.post(
  '/reactivate',
  requireAuth,
  asyncHandler(billingController.reactivateSubscription)
);

// POST /billing/webhook (Stripe webhooks)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  asyncHandler(billingController.handleWebhook)
);

module.exports = router;
