/**
 * SimplyLouie Main JavaScript
 * Core functionality and UI interactions
 */

(function() {
    'use strict';

    // ============================================
    // DOM READY
    // ============================================

    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initForms();
        initModals();
        initTabs();
        initToasts();
        initAnimations();
        checkAuth();
    });

    // ============================================
    // MOBILE MENU
    // ============================================

    function initMobileMenu() {
        const menuBtn = document.querySelector('.header__menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (!menuBtn || !mobileMenu) return;

        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        const menuLinks = mobileMenu.querySelectorAll('.mobile-menu__link');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // FORMS
    // ============================================

    function initForms() {
        // Auto-validate on blur
        const inputs = document.querySelectorAll('.form-input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });

            input.addEventListener('input', function() {
                // Clear error state on input
                this.classList.remove('form-input--error');
                const error = this.parentNode.querySelector('.form-error');
                if (error) error.remove();
            });
        });

        // Form submissions
        const forms = document.querySelectorAll('form[data-ajax]');
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let message = '';

        // Required check
        if (input.required && !value) {
            isValid = false;
            message = 'This field is required';
        }

        // Email check
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        // Password check
        if (input.type === 'password' && value && input.minLength) {
            if (value.length < input.minLength) {
                isValid = false;
                message = `Password must be at least ${input.minLength} characters`;
            }
        }

        // Show/hide error
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) existingError.remove();

        if (!isValid) {
            input.classList.add('form-input--error');
            const error = document.createElement('span');
            error.className = 'form-error';
            error.textContent = message;
            input.parentNode.appendChild(error);
        } else {
            input.classList.remove('form-input--error');
        }

        return isValid;
    }

    function validateForm(form) {
        const inputs = form.querySelectorAll('.form-input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;

        if (!validateForm(form)) return;

        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('btn--loading');
        submitBtn.textContent = 'Loading...';

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const action = form.dataset.action;
            let response;

            switch (action) {
                case 'login':
                    response = await SimplyLouieAPI.login(data.email, data.password);
                    if (response.success) {
                        window.location.href = '/dashboard.html';
                    }
                    break;

                case 'register':
                    response = await SimplyLouieAPI.register(data);
                    if (response.success) {
                        window.location.href = '/checkout.html';
                    }
                    break;

                case 'forgot-password':
                    response = await SimplyLouieAPI.forgotPassword(data.email);
                    if (response.success) {
                        showToast('Check your email for reset instructions', 'success');
                    }
                    break;

                default:
                    console.warn('Unknown form action:', action);
            }

            if (response && !response.success) {
                showToast(response.message || 'An error occurred', 'error');
            }
        } catch (error) {
            showToast(error.message || 'An error occurred', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn--loading');
            submitBtn.textContent = originalText;
        }
    }

    // ============================================
    // MODALS
    // ============================================

    function initModals() {
        // Open modal triggers
        document.querySelectorAll('[data-modal]').forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modalId = this.dataset.modal;
                openModal(modalId);
            });
        });

        // Close modal triggers
        document.querySelectorAll('.modal__close, [data-modal-close]').forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = this.closest('.modal-overlay');
                if (modal) closeModal(modal);
            });
        });

        // Close on overlay click
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this);
                }
            });
        });

        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) closeModal(activeModal);
            }
        });
    }

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ============================================
    // TABS
    // ============================================

    function initTabs() {
        document.querySelectorAll('.tabs').forEach(tabContainer => {
            const tabs = tabContainer.querySelectorAll('.tab');
            const parent = tabContainer.parentElement;

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const target = this.dataset.tab;

                    // Update tab states
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');

                    // Update content states
                    parent.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    const targetContent = parent.querySelector(`[data-tab-content="${target}"]`);
                    if (targetContent) targetContent.classList.add('active');
                });
            });
        });
    }

    // ============================================
    // TOASTS
    // ============================================

    let toastContainer;

    function initToasts() {
        toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
    }

    function showToast(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;

        const icons = {
            info: 'ℹ️',
            success: '✓',
            error: '✕',
            warning: '⚠'
        };

        toast.innerHTML = `
            <span class="toast__icon">${icons[type] || icons.info}</span>
            <span class="toast__message">${message}</span>
            <button class="toast__close" aria-label="Close">✕</button>
        `;

        toastContainer.appendChild(toast);

        // Close button
        toast.querySelector('.toast__close').addEventListener('click', function() {
            removeToast(toast);
        });

        // Auto remove
        setTimeout(() => removeToast(toast), duration);
    }

    function removeToast(toast) {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }

    // Make showToast globally available
    window.showToast = showToast;

    // ============================================
    // ANIMATIONS
    // ============================================

    function initAnimations() {
        // Intersection Observer for scroll animations
        const animatedElements = document.querySelectorAll('[data-animate]');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-slide-up');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for older browsers
            animatedElements.forEach(el => el.classList.add('animate-slide-up'));
        }
    }

    // ============================================
    // AUTH CHECK
    // ============================================

    function checkAuth() {
        const protectedPages = ['/dashboard.html', '/settings.html'];
        const authPages = ['/login.html', '/onboarding.html'];
        const currentPath = window.location.pathname;

        const isAuthenticated = SimplyLouieAPI.isAuthenticated();

        // Redirect from protected pages if not authenticated
        if (protectedPages.some(p => currentPath.endsWith(p)) && !isAuthenticated) {
            window.location.href = '/login.html';
            return;
        }

        // Redirect from auth pages if already authenticated
        if (authPages.some(p => currentPath.endsWith(p)) && isAuthenticated) {
            window.location.href = '/dashboard.html';
            return;
        }

        // Update UI based on auth state
        updateAuthUI(isAuthenticated);
    }

    function updateAuthUI(isAuthenticated) {
        const authLinks = document.querySelectorAll('[data-auth]');
        const guestLinks = document.querySelectorAll('[data-guest]');

        authLinks.forEach(el => {
            el.style.display = isAuthenticated ? '' : 'none';
        });

        guestLinks.forEach(el => {
            el.style.display = isAuthenticated ? 'none' : '';
        });

        // Update user info in nav
        if (isAuthenticated) {
            const user = SimplyLouieAPI.getUser();
            const userNameElements = document.querySelectorAll('[data-user-name]');
            userNameElements.forEach(el => {
                el.textContent = user?.name || 'Member';
            });
        }
    }

    // ============================================
    // UTILITIES
    // ============================================

    // Format currency
    window.formatCurrency = function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    };

    // Format date
    window.formatDate = function(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
    };

    // Format relative time
    window.formatRelativeTime = function(date) {
        const now = new Date();
        const then = new Date(date);
        const diffMs = now - then;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);

        if (diffSec < 60) return 'just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        if (diffHour < 24) return `${diffHour}h ago`;
        if (diffDay < 7) return `${diffDay}d ago`;
        return formatDate(date);
    };

    // Debounce
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Throttle
    window.throttle = function(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Copy to clipboard
    window.copyToClipboard = async function(text) {
        try {
            await navigator.clipboard.writeText(text);
            showToast('Copied to clipboard', 'success');
            return true;
        } catch (err) {
            showToast('Failed to copy', 'error');
            return false;
        }
    };

    // Logout handler
    window.handleLogout = async function() {
        await SimplyLouieAPI.logout();
        window.location.href = '/login.html';
    };

})();
