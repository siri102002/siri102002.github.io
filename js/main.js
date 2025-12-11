document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Initialize all components
    initLoadingScreen();
    initTypingAnimation();
    initThemeToggle();
    initProgressBar();
    initColoredIcons();
    initInteractiveEffects();
    initFormSubmit();
    initLogoFix();
});

// 1. Loading Screen
function initLoadingScreen() {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// 2. Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const texts = [
        "Software Development Engineer",
        "Problem Solver"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // If text is complete
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        }
        
        // If text is deleted
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before next
        }
        
        setTimeout(type, typingSpeed);
    }
    
    setTimeout(type, 1000);
}

// 3. Theme Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleSmall = document.getElementById('themeToggleSmall');
    const body = document.body;
    
    if (!themeToggle) return;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.replace('dark-mode', 'light-mode');
    }
    
    // Update icon
    updateThemeIcon();
    
    // Toggle function
    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('portfolio-theme', 'dark');
        }
        updateThemeIcon();
    }
    
    // Update icon function
    function updateThemeIcon() {
        const isDark = body.classList.contains('dark-mode');
        const icon = themeToggle.querySelector('i');
        const smallIcon = themeToggleSmall?.querySelector('i');
        
        if (isDark) {
            icon.className = 'fas fa-moon';
            if (smallIcon) smallIcon.className = 'fas fa-moon';
        } else {
            icon.className = 'fas fa-sun';
            if (smallIcon) smallIcon.className = 'fas fa-sun';
        }
    }
    
    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleSmall) {
        themeToggleSmall.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('portfolio-theme')) {
            if (e.matches) {
                body.classList.replace('light-mode', 'dark-mode');
            } else {
                body.classList.replace('dark-mode', 'light-mode');
            }
            updateThemeIcon();
        }
    });
}

// 4. Progress Bar
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        
        const progress = Math.min((scrolled / documentHeight) * 100, 100);
        progressBar.style.width = `${progress}%`;
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgressBar();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    updateProgressBar();
}

// 5. Colored Icons
function initColoredIcons() {
    // Brand colors mapping
    const brandColors = {
        'fa-android': '#3ddc84',
        'fa-aws': '#ff9900',
        'fa-react': '#61dafb',
        'fa-docker': '#2496ed',
        'fa-node-js': '#339933',
        'fa-python': '#3776ab',
        'fa-java': '#007396',
        'fa-js': '#f7df1e',
        'fa-html5': '#e34f26',
        'fa-css3-alt': '#1572b6',
        'fa-git-alt': '#f05032',
        'fa-github': '#181717',
        'fa-linkedin': '#0a66c2',
        'fa-phone': '#25d366',
        'fa-envelope': '#ea4335',
        'fa-map-marker-alt': '#4285f4'
    };
    
    // Apply colors to all icons
    document.querySelectorAll('i').forEach(icon => {
        for (const [className, color] of Object.entries(brandColors)) {
            if (icon.classList.contains(className)) {
                icon.style.color = color;
                break;
            }
        }
    });
}

// 6. Interactive Effects
function initInteractiveEffects() {
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll(
        '.btn-primary, .btn-secondary, .skill-tag, .project-card, ' +
        '.experience-card, .contact-card, .publication-card'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-8px)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });
    
    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
}

// Form submission handling
function initFormSubmit() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        const formData = new FormData(this);
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Validate form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        try {
            // Submit form using fetch
            const response = await fetch('https://formsubmit.co/ajax/siri102002@gmail.com', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success === "true") {
                // Show success notification
                showNotification(
                    'Message Sent Successfully!',
                    'Thank you for your message. I will get back to you soon.',
                    'success'
                );
                
                // Reset form
                contactForm.reset();
                
                // Scroll to contact section smoothly
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                showNotification(
                    'Submission Failed',
                    'There was an error sending your message. Please try again.',
                    'error'
                );
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification(
                'Network Error',
                'Unable to send message. Please check your connection and try again.',
                'error'
            );
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Notification function
function showNotification(title, message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Icons based on type
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
        <div class="notification-progress"></div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    }, 5000);
    
    // Close on click
    notification.addEventListener('click', (e) => {
        if (e.target.closest('.notification-close')) {
            notification.style.animation = 'fadeOut 0.5s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    });
}

// Initialize form when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initFormSubmit();
});

function initLogoFix() {
    const body = document.body;
    const observer = new MutationObserver(() => {
        const logos = document.querySelectorAll('.company-logo img[src*="makemytrip"]');
        logos.forEach(logo => {
            if (body.classList.contains('dark-mode')) {
                logo.style.filter = 'brightness(0) invert(1)';
            } else {
                logo.style.filter = 'brightness(1) invert(0)';
            }
        });
    });
    
    observer.observe(body, { attributes: true, attributeFilter: ['class'] });
}

// 9. Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + T for theme toggle
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.click();
    }
    
    // Escape to close any active modals (future feature)
    if (e.key === 'Escape') {
        // Add modal close functionality here
    }
});