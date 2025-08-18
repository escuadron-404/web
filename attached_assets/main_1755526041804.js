// Main JavaScript functionality for Escuadrón 404

class EscuadronApp {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupFirebaseAuth();
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.setupPageAnimations();
    }

    setupEventListeners() {
        // Login buttons
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const closeModal = document.getElementById('closeModal');
        const loginForm = document.getElementById('loginForm');

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showLoginModal());
        }
        
        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', () => this.showLoginModal());
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        if (closeModal) {
            closeModal.addEventListener('click', () => this.hideLoginModal());
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Discord buttons
        const discordBtns = document.querySelectorAll('#discordBtn, #discordBtn2');
        discordBtns.forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.joinDiscord());
            }
        });

        // Contact forms
        const contactForms = document.querySelectorAll('form');
        contactForms.forEach(form => {
            if (form.id !== 'loginForm') {
                form.addEventListener('submit', (e) => this.handleFormSubmit(e));
            }
        });

        // Modal backdrop click
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    this.hideLoginModal();
                }
            });
        }
    }

    setupFirebaseAuth() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().onAuthStateChanged((user) => {
                this.currentUser = user;
                this.updateUIForUser(user);
            });
        }
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.contains('hidden');
                
                if (isHidden) {
                    // Show menu
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('mobile-menu-enter');
                    mobileMenuBtn.setAttribute('aria-expanded', 'true');
                } else {
                    // Hide menu
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('mobile-menu-enter');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('mobile-menu-enter');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all elements with animate-on-scroll class
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    setupPageAnimations() {
        // Add entrance animations to hero elements
        setTimeout(() => {
            const heroTitle = document.querySelector('h1');
            const heroSubtitle = document.querySelector('section p');
            const heroButton = document.querySelector('section button');

            if (heroTitle) heroTitle.classList.add('animate-fade-in-up');
            if (heroSubtitle) heroSubtitle.classList.add('animate-fade-in-up', 'animate-delay-200');
            if (heroButton) heroButton.classList.add('animate-fade-in-up', 'animate-delay-400');
        }, 100);

        // Add staggered animations to cards
        const cards = document.querySelectorAll('.card-hover');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-scale-in');
            }, 200 * (index + 1));
        });

        // Add floating animation to icons
        const icons = document.querySelectorAll('svg');
        icons.forEach(icon => {
            icon.classList.add('float');
        });
    }

    showLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('modal-enter');
            // Focus on email input for accessibility
            setTimeout(() => {
                const emailInput = document.getElementById('loginEmail');
                if (emailInput) emailInput.focus();
            }, 100);
        }
    }

    hideLoginModal() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('modal-enter');
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const submitBtn = e.target.querySelector('button[type="submit"]');

        // Validate email format
        if (!this.validateEmail(email)) {
            this.showToast('Por favor ingresa un email válido', 'error');
            return;
        }

        if (!email || !password) {
            this.showToast('Por favor completa todos los campos', 'error');
            return;
        }

        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="spinner mx-auto"></div>';
        submitBtn.disabled = true;

        try {
            if (typeof firebase !== 'undefined' && firebase.auth && !window.isDemoMode) {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                this.hideLoginModal();
                this.showToast('¡Bienvenido de vuelta!', 'success');
            } else {
                // Fallback for demo purposes
                this.simulateLogin(email);
            }
        } catch (error) {
            console.error('Login error:', error);
            let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
            
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'Usuario no encontrado. Verifica tu email.';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Contraseña incorrecta.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Email inválido.';
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = 'Demasiados intentos. Intenta más tarde.';
            }
            
            this.showToast(errorMessage, 'error');
        } finally {
            // Restore button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateLogin(email) {
        // Demo login simulation
        const userName = email.split('@')[0];
        this.currentUser = { email, displayName: userName };
        this.updateUIForUser(this.currentUser);
        this.hideLoginModal();
        this.showToast(`¡Bienvenido, ${userName}!`, 'success');
    }

    async logout() {
        try {
            if (typeof firebase !== 'undefined' && firebase.auth) {
                await firebase.auth().signOut();
            } else {
                // Fallback for demo
                this.currentUser = null;
                this.updateUIForUser(null);
            }
            this.showToast('Sesión cerrada correctamente', 'info');
        } catch (error) {
            console.error('Logout error:', error);
            this.showToast('Error al cerrar sesión', 'error');
        }
    }

    updateUIForUser(user) {
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userWelcome = document.getElementById('userWelcome');
        const userName = document.getElementById('userName');

        if (user) {
            // User is logged in
            if (loginBtn) loginBtn.classList.add('hidden');
            if (mobileLoginBtn) mobileLoginBtn.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
            if (userWelcome) userWelcome.classList.remove('hidden');
            if (userName) {
                userName.textContent = user.displayName || user.email.split('@')[0];
            }
        } else {
            // User is logged out
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (mobileLoginBtn) mobileLoginBtn.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
            if (userWelcome) userWelcome.classList.add('hidden');
        }
    }

    joinDiscord() {
        if (this.currentUser) {
            // Simulate Discord redirect
            this.showToast('Redirigiendo a Discord...', 'info');
            setTimeout(() => {
                window.open('https://discord.gg/escuadron404', '_blank');
            }, 1000);
        } else {
            this.showToast('Inicia sesión para unirte al Discord', 'error');
            this.showLoginModal();
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Clear previous validation states
        form.querySelectorAll('.input-success, .input-error').forEach(field => {
            field.classList.remove('input-success', 'input-error');
        });

        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('input-error');
                isValid = false;
            } else {
                field.classList.add('input-success');
            }
        });

        // Validate email fields
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
            if (field.value.trim() && !this.validateEmail(field.value.trim())) {
                field.classList.remove('input-success');
                field.classList.add('input-error');
                isValid = false;
            }
        });

        // Validate phone fields
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
            if (field.value.trim() && field.value.trim().length < 10) {
                field.classList.remove('input-success');
                field.classList.add('input-error');
                isValid = false;
            }
        });

        if (!isValid) {
            this.showToast('Por favor completa todos los campos requeridos correctamente', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="spinner mx-auto"></div>';
        submitBtn.disabled = true;

        setTimeout(() => {
            this.showToast('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
            form.reset();
            
            // Remove validation classes
            form.querySelectorAll('.input-success, .input-error').forEach(field => {
                field.classList.remove('input-success', 'input-error');
            });

            // Restore button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast');
        existingToasts.forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');

        document.body.appendChild(toast);

        // Auto remove after 4 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 4000);
    }

    // Utility methods
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]}-${match[3]}`;
        }
        return phone;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.escuadronApp = new EscuadronApp();
});

// Handle page visibility for better UX
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && window.escuadronApp) {
        // Refresh auth state when page becomes visible
        if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth().currentUser) {
            window.escuadronApp.updateUIForUser(firebase.auth().currentUser);
        }
    }
});

// Additional animations keyframes
const additionalStyles = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Export for global access
window.EscuadronApp = EscuadronApp;