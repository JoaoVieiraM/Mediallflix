// ============================================
// MEDIALLFLIX LANDING PAGE - INTERACTIVE JS
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initHeader();
    initMobileMenu();
    initFAQ();
    initTestimonialSlider();
    initSmoothScroll();
    initFormValidation();
    initCounterAnimations();
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger counter animation if element has counter
                const statNumberChildren = entry.target.querySelectorAll('.stat-number, [class*="text-"][class*="font-bold"]');
                statNumberChildren.forEach(stat => {
                    if (stat.textContent.match(/^\d+[,.]?\d*\+?$/)) {
                        animateCounter(stat);
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all elements with reveal class
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================

function initHeader() {
    const header = document.querySelector('header');
    let lastScroll = 0;

    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled (Tailwind already has shadow, just enhance it)
        if (currentScroll > 50) {
            header.classList.add('shadow-lg');
            header.classList.remove('shadow-sm');
        } else {
            header.classList.add('shadow-sm');
            header.classList.remove('shadow-lg');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
    });

    // Close menu when clicking nav link
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuToggle.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            menuToggle.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
        }
    });

    // Add mobile menu styles dynamically for hamburger animation
    addMobileMenuStyles();
}

function addMobileMenuStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        if (!question || !answer) return;

        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

            // Close all other items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.faq-icon');
                if (otherAnswer && otherItem !== item) {
                    otherAnswer.style.maxHeight = '0px';
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            if (isOpen) {
                answer.style.maxHeight = '0px';
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================

function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    let currentSlide = 0;
    const isMobile = window.innerWidth <= 768;

    // Only activate slider on mobile
    if (!isMobile) return;

    function showSlide(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play slider
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplayInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    }

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }

    // Initialize
    if (isMobile) {
        showSlide(0);
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FORM VALIDATION
// ============================================

function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Handle form submission
                handleFormSubmit(form);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateInput(input);
                }
            });
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    let isValid = true;
    let errorMessage = '';

    // Remove previous error
    removeError(input);

    // Required field check
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo é obrigatório';
    }

    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um email válido';
        }
    }

    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value) || value.length < 10) {
            isValid = false;
            errorMessage = 'Por favor, insira um telefone válido';
        }
    }

    if (!isValid) {
        showError(input, errorMessage);
    }

    return isValid;
}

function showError(input, message) {
    input.classList.add('error');

    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;

    input.parentElement.appendChild(errorElement);

    // Add error styles
    addErrorStyles();
}

function removeError(input) {
    input.classList.remove('error');

    const errorMessage = input.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function addErrorStyles() {
    if (document.getElementById('error-styles')) return;

    const style = document.createElement('style');
    style.id = 'error-styles';
    style.textContent = `
        input.error,
        textarea.error {
            border-color: #c0392b !important;
            background-color: #fff5f5 !important;
        }

        .error-message {
            display: block;
            color: #c0392b;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        }
    `;
    document.head.appendChild(style);
}

function handleFormSubmit(form) {
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';

    form.appendChild(successMessage);

    // Add success styles
    addSuccessStyles();

    // Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        successMessage.remove();
    }, 3000);
}

function addSuccessStyles() {
    if (document.getElementById('success-styles')) return;

    const style = document.createElement('style');
    style.id = 'success-styles';
    style.textContent = `
        .success-message {
            padding: 1rem;
            margin-top: 1rem;
            background: #d1fae5;
            color: #065f46;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            animation: slideInDown 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function animateCounter(element) {
    if (element.classList.contains('counted')) return;

    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/[^0-9]/g, ''));

    if (isNaN(number)) return;

    element.classList.add('counted');

    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    const stepDuration = duration / steps;

    let current = 0;

    const counter = setInterval(() => {
        current += increment;

        if (current >= number) {
            element.textContent = formatNumber(number) + (hasPlus ? '+' : '');
            clearInterval(counter);
        } else {
            element.textContent = formatNumber(Math.floor(current)) + (hasPlus ? '+' : '');
        }
    }, stepDuration);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace('.', ',') + 'k';
    }
    return num.toString();
}

function initCounterAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');

    // Format initial numbers
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const number = parseInt(text.replace(/[^0-9]/g, ''));

        if (!isNaN(number)) {
            stat.setAttribute('data-count', number);
            stat.textContent = '0' + (hasPlus ? '+' : '');
        }
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    const testimonialSlider = document.querySelector('.testimonials-slider');

    if (!testimonialSlider) return;

    if (e.key === 'ArrowLeft') {
        document.querySelector('.slider-btn.prev')?.click();
    } else if (e.key === 'ArrowRight') {
        document.querySelector('.slider-btn.next')?.click();
    }
});

// Focus trap for mobile menu
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// ============================================
// ANALYTICS & TRACKING (Optional)
// ============================================

// Track CTA clicks
function trackCTAClicks() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();

            // Log to console (replace with actual analytics)
            console.log('CTA Click:', buttonText);

            // Example: Google Analytics
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'cta_click', {
            //         'event_category': 'engagement',
            //         'event_label': buttonText
            //     });
            // }
        });
    });
}

// Initialize analytics
trackCTAClicks();

// ============================================
// WHATSAPP BUTTON ENHANCEMENTS
// ============================================

function enhanceWhatsAppButton() {
    const whatsappButton = document.querySelector('a[href*="wa.me"]');

    if (!whatsappButton) return;

    // Hide button when scrolled to footer
    window.addEventListener('scroll', throttle(() => {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const footerTop = footer.offsetTop;
        const scrollPosition = window.pageYOffset + window.innerHeight;

        if (scrollPosition >= footerTop) {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.pointerEvents = 'none';
        } else {
            whatsappButton.style.opacity = '1';
            whatsappButton.style.pointerEvents = 'auto';
        }
    }, 100));
}

enhanceWhatsAppButton();

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c🎉 MediallFlix Landing Page', 'font-size: 20px; font-weight: bold; color: #b8860b;');
console.log('%cDesenvolvido com HTML, CSS e JavaScript', 'font-size: 12px; color: #666;');
console.log('%cTodos os direitos reservados © 2025', 'font-size: 12px; color: #666;');

// ============================================
// EXPORT FOR TESTING (Optional)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateInput,
        animateCounter,
        formatNumber,
        debounce,
        throttle
    };
}