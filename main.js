// Paulie's Phone Service - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initTypewriter();
    initScrollReveal();
    initServiceCalculator();
    initContactForm();
    initParticles();
    initMobileMenu();
    initSmoothScrolling();
    
    // Typewriter effect for hero text
    function initTypewriter() {
        const typed = new Typed('#hero-text', {
            strings: [
                "Paulie's Got You Covered",
                "Professional Phone Services",
                "We Handle Your Calls",
                "Giving You Back Your TIME"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Scroll reveal animations
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Service calculator functionality
    function initServiceCalculator() {
        const volumeSlider = document.getElementById('call-volume');
        const volumeDisplay = document.getElementById('volume-display');
        const volumeEstimate = document.getElementById('volume-estimate');
        const servicesCount = document.getElementById('services-count');
        const totalCost = document.getElementById('total-cost');
        const serviceTypeButtons = document.querySelectorAll('.service-type-btn');
        const serviceCheckboxes = document.querySelectorAll('.service-checkbox');
        
        let currentServiceType = 'personal';
        let selectedServices = new Set();
        
        // Service type selection
        serviceTypeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                serviceTypeButtons.forEach(b => {
                    b.classList.remove('bg-mob-burgundy');
                    b.classList.add('bg-mob-gray');
                });
                
                this.classList.remove('bg-mob-gray');
                this.classList.add('bg-mob-burgundy');
                
                currentServiceType = this.dataset.type;
                updateCalculator();
            });
        });
        
        // Volume slider
        volumeSlider.addEventListener('input', function() {
            volumeDisplay.textContent = this.value;
            volumeEstimate.textContent = `${this.value} calls`;
            updateCalculator();
        });
        
        // Service checkboxes
        serviceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedServices.add(this.dataset.service);
                } else {
                    selectedServices.delete(this.dataset.service);
                }
                updateCalculator();
            });
        });
        
        function updateCalculator() {
            const volume = parseInt(volumeSlider.value);
            const serviceCount = selectedServices.size;
            
            servicesCount.textContent = `${serviceCount} services`;
            
            // Calculate cost
            let baseCost = 0;
            selectedServices.forEach(service => {
                const checkbox = document.querySelector(`[data-service="${service}"]`);
                const price = parseFloat(checkbox.dataset.price);
                baseCost += price * volume;
            });
            
            // Apply business multiplier
            const finalCost = currentServiceType === 'business' ? baseCost * 1.2 : baseCost;
            
            totalCost.textContent = `$${Math.round(finalCost).toLocaleString()}`;
            
            // Animate cost update
            anime({
                targets: totalCost,
                scale: [1.1, 1],
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    }
    
    // Contact form handling
    function initContactForm() {
        const form = document.getElementById('contact-form');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            showNotification('Message sent! Paulie will get back to you within 24 hours.', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
            }, 2000);
        });
        
        // Form validation with custom messages
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    showFieldError(this, 'This field is required, capisce?');
                } else {
                    clearFieldError(this);
                }
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-400 text-sm mt-1 field-error';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
        field.classList.add('border-red-400');
    }
    
    function clearFieldError(field) {
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.classList.remove('border-red-400');
    }
    
    // Particle system for hero background
    function initParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1 h-1 bg-mob-gold rounded-full opacity-20';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            container.appendChild(particle);
            
            // Animate particle
            anime({
                targets: particle,
                translateY: [
                    { value: -20, duration: 2000 },
                    { value: 0, duration: 2000 }
                ],
                opacity: [
                    { value: 0.6, duration: 1000 },
                    { value: 0.2, duration: 1000 }
                ],
                loop: true,
                easing: 'easeInOutSine',
                delay: Math.random() * 2000
            });
        }
    }
    
    // Mobile menu toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const nav = document.querySelector('nav');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', function() {
                // Toggle mobile menu (implement as needed)
                console.log('Mobile menu toggled');
            });
        }
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
            type === 'success' ? 'bg-green-600' : 
            type === 'error' ? 'bg-red-600' : 'bg-mob-gold'
        } text-white`;
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        anime({
            targets: notification,
            translateX: [300, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutCubic'
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                anime({
                    targets: notification,
                    translateX: 300,
                    opacity: 0,
                    duration: 300,
                    easing: 'easeInCubic',
                    complete: () => notification.remove()
                });
            }
        }, 5000);
    }
    
    // Add hover effects to cards
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
    });
    
    // Add click handlers for CTA buttons
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Quote') || this.textContent.includes('Message')) {
                e.preventDefault();
                
                // Animate button
                anime({
                    targets: this,
                    scale: [1, 0.95, 1],
                    duration: 200,
                    easing: 'easeInOutCubic'
                });
                
                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading animation to page elements
    anime.timeline({
        easing: 'easeOutCubic',
        duration: 800
    })
    .add({
        targets: 'nav',
        translateY: [-100, 0],
        opacity: [0, 1],
        delay: 300
    })
    .add({
        targets: '.hero-bg .relative > *',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200)
    }, '-=400');
    
    console.log('Paulie\'s Phone Service initialized - Everything is ready to handle your calls!');
});
