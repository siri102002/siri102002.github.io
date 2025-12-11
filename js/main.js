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

// 7. Form Submission
function initFormSubmit() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Form will submit normally
        // Reset button after 5 seconds if something goes wrong
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}

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