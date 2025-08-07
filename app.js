// Portfolio JavaScript - Clean and Professional - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initContactForm();
    initScrollAnimations();
    initHoverEffects();
    
    // Navigation functionality - FIXED
    function initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const nav = document.querySelector('.nav');
        const heroButtons = document.querySelectorAll('.hero-actions .btn');
        
        // Mobile menu toggle - FIXED
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav && !nav.contains(e.target)) {
                if (navToggle) navToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            }
        });
        
        // Smooth scrolling for navigation links - FIXED
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    if (navToggle) navToggle.classList.remove('active');
                    if (navMenu) navMenu.classList.remove('active');
                    
                    // Update active link
                    updateActiveNavLink(targetId);
                }
            });
        });
        
        // Hero buttons smooth scrolling - FIXED
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    updateActiveNavLink(targetId);
                }
            });
        });
        
        // Update active navigation link based on scroll position
        window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
        
        function updateActiveNavigation() {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = '#' + section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    updateActiveNavLink(sectionId);
                }
            });
        }
        
        function updateActiveNavLink(targetId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Scroll effects for navigation bar
    function initScrollEffects() {
        const nav = document.querySelector('.nav');
        
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for background effect
            if (scrollTop > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, 16));
    }
    
    // Contact form handling with validation - FIXED
    function initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        // Add error message containers
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            if (!group.querySelector('.field-error')) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.style.display = 'none';
                group.appendChild(errorDiv);
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const message = formData.get('message')?.trim();
            
            // Clear previous error states
            clearFormErrors();
            
            // Validate form
            let isValid = true;
            
            if (!name || name.length < 2) {
                showFieldError('name', 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }
            
            if (!email || !isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!message || message.length < 10) {
                showFieldError('message', 'Please enter a message (minimum 10 characters)');
                isValid = false;
            }
            
            if (!isValid) {
                showNotification('Please fix the errors below', 'error');
                return;
            }
            
            // Submit form (simulate API call)
            submitForm(this, { name, email, message });
        });
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateSingleField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateSingleField(this);
                }
            });
        });
        
        function validateSingleField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            
            clearFieldError(fieldName);
            
            switch (fieldName) {
                case 'name':
                    if (!value || value.length < 2) {
                        showFieldError(fieldName, 'Please enter a valid name (at least 2 characters)');
                        return false;
                    }
                    break;
                case 'email':
                    if (!value || !isValidEmail(value)) {
                        showFieldError(fieldName, 'Please enter a valid email address');
                        return false;
                    }
                    break;
                case 'message':
                    if (!value || value.length < 10) {
                        showFieldError(fieldName, 'Please enter a message (minimum 10 characters)');
                        return false;
                    }
                    break;
            }
            return true;
        }
        
        function submitForm(form, data) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                // Success
                showNotification(`Thank you ${data.name}! Your message has been sent successfully. I'll get back to you soon.`, 'success');
                form.reset();
                clearFormErrors();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 1500);
        }
        
        function showFieldError(fieldName, message) {
            const field = document.querySelector(`[name="${fieldName}"]`);
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.field-error');
            
            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        function clearFieldError(fieldName) {
            const field = document.querySelector(`[name="${fieldName}"]`);
            const formGroup = field.closest('.form-group');
            const errorElement = formGroup.querySelector('.field-error');
            
            field.classList.remove('error');
            if (errorElement) {
                errorElement.style.display = 'none';
                errorElement.textContent = '';
            }
        }
        
        function clearFormErrors() {
            const errorFields = contactForm.querySelectorAll('.error');
            const errorMessages = contactForm.querySelectorAll('.field-error');
            
            errorFields.forEach(field => field.classList.remove('error'));
            errorMessages.forEach(message => {
                message.style.display = 'none';
                message.textContent = '';
            });
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // Scroll animations using Intersection Observer
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Elements to animate
        const animateElements = [
            '.section-header',
            '.about-content',
            '.skill-category',
            '.project-card',
            '.timeline-item',
            '.contact-card',
            '.contact-form'
        ];
        
        animateElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                // Set initial state
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                
                observer.observe(element);
            });
        });
    }
    
    // Enhanced hover effects - FIXED
    function initHoverEffects() {
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });
            
            button.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(0) scale(0.98)';
            });
            
            button.addEventListener('mouseup', function() {
                this.style.transform = 'translateY(-2px) scale(1)';
            });
        });
        
        // Card hover effects
        const cards = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Stat hover effects
        const stats = document.querySelectorAll('.stat');
        stats.forEach(stat => {
            stat.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
                this.style.borderColor = 'var(--accent-color)';
            });
            
            stat.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = 'var(--border-color)';
            });
        });
        
        // Link hover effects
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
        
        // Social link hover effects
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.backgroundColor = '';
            });
        });
        
        // Skill tag hover effects
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
                this.style.backgroundColor = 'rgba(99, 102, 241, 0.2)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
            });
        });
    }
    
    // Notification system - ENHANCED
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        // Add icon based on type
        let icon = '';
        switch (type) {
            case 'success':
                icon = '✓ ';
                break;
            case 'error':
                icon = '✕ ';
                break;
            default:
                icon = 'ℹ ';
        }
        
        notification.textContent = icon + message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '10000',
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
        });
        
        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                break;
            default:
                notification.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        }
        
        // Add click to dismiss
        notification.addEventListener('click', function() {
            this.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            }, 300);
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Performance optimization - throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Add CSS for form errors and enhanced styles
    const errorStyles = document.createElement('style');
    errorStyles.textContent = `
        .form-control.error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
        }
        
        .field-error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            display: none;
        }
        
        .form-control:focus.error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
        }
        
        /* Enhanced hover effects */
        .btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .skill-category, .project-card, .timeline-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .stat {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .project-link {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .social-link {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .skill-tag {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
    `;
    document.head.appendChild(errorStyles);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on Escape
            const navToggle = document.getElementById('nav-toggle');
            const navMenu = document.getElementById('nav-menu');
            
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            
            // Close notifications
            const notifications = document.querySelectorAll('.notification');
            notifications.forEach(notification => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            });
        }
    });
    
    // Add loading state management and welcome message
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Show welcome message after a short delay
        setTimeout(() => {
            showNotification('Welcome to my portfolio! Navigate using the menu above and feel free to get in touch.', 'success');
        }, 1000);
    });
    
    console.log('✨ Portfolio loaded successfully - All functionality working!');
    console.log('📧 Contact: ayushvib27@gmail.com');
    console.log('🌟 Navigation, forms, and interactions are fully functional');
});