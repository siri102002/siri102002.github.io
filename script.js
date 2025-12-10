// Typing Animation
const typingText = document.getElementById('typingText');
const texts = [
    "Software Development Engineer",
    "Android Developer",
    "Distributed Systems Enthusiast",
    "Machine Learning Researcher",
    "Full Stack Developer",
    "Problem Solver"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(type, 1500);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        if (textIndex === texts.length) {
            textIndex = 0;
        }
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(type, isEnd ? 100 : speed);
}


// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeToggleSmall = document.getElementById('themeToggleSmall');
const body = document.body;

// Check for saved theme or prefer-color-scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
    body.classList.replace('dark-mode', 'light-mode');
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const smallIcon = themeToggleSmall?.querySelector('i');
    
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-moon';
        if (smallIcon) smallIcon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
        if (smallIcon) smallIcon.className = 'fas fa-sun';
    }
}

function toggleTheme() {
    if (body.classList.contains('dark-mode')) {
        body.classList.replace('dark-mode', 'light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.replace('light-mode', 'dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon();
}

themeToggle.addEventListener('click', toggleTheme);
if (themeToggleSmall) {
    themeToggleSmall.addEventListener('click', toggleTheme);
}

// Floating Navigation
const floatingNav = document.getElementById('floatingNav');
const navDots = floatingNav.querySelectorAll('.nav-dot');
const sections = document.querySelectorAll('.section');

// Simple function to update active nav dot
function setActiveSection(sectionId) {
    // Only update nav dots (sections are always visible)
    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.section === sectionId) {
            dot.classList.add('active');
        }
    });
}

// Handle nav dot clicks
navDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const sectionId = dot.dataset.section;
        
        // Update active nav dot
        setActiveSection(sectionId);
        
        // Smooth scroll to section
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without scrolling
            if (history.pushState) {
                history.pushState(null, null, '#' + sectionId);
            }
        }
    });
});

// Progress Bar
const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    
    const progress = (scrolled / documentHeight) * 100;
    progressBar.style.width = `${progress}%`;
}

// Scroll Spy - Only updates nav dots
let scrollTimeout;

function handleScrollSpy() {
    const scrollPosition = window.scrollY + 100;
    let activeSection = 'home';
    
    // Find the current active section
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            activeSection = sectionId;
        }
    });
    
    // Update active nav dot
    setActiveSection(activeSection);
    updateProgressBar();
}

// Debounced scroll handler
function debounce(func, wait = 100) {
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

// Optimized scroll event listener
const debouncedScroll = debounce(handleScrollSpy, 50);
window.addEventListener('scroll', debouncedScroll, { passive: true });

// Intersection Observer for animations
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

// Observe elements for animation
document.querySelectorAll('.timeline-node, .skill-category, .experience-card, .project-card, .publication-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// FormSubmit.co with better UX
const contactForm = document.getElementById('contactForm');

// Check if form was submitted successfully
if (window.location.search.includes('success=true')) {
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    // Clear the URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

contactForm.addEventListener('submit', function(e) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Validate form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
        e.preventDefault(); // Prevent form submission
        showNotification('Please fill in all fields.', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // Form will submit normally to FormSubmit.co
    // You'll receive an email automatically
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: transparent;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        margin-left: 10px;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    setTimeout(type, 1000);
    
    // Set initial active section from URL hash or default to home
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        setActiveSection(hash);
    } else {
        setActiveSection('home');
    }
    
    // Update progress bar
    updateProgressBar();
    
    // Initialize scroll spy
    handleScrollSpy();
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Update active nav dot
                setActiveSection(targetId);
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.btn-primary, .btn-secondary, .skill-tag, .tech-tag, .company-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'translateY(-3px)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.classList.add('loading');
        img.addEventListener('load', () => {
            img.classList.remove('loading');
        });
    });
    
    // Add keyboard navigation for theme toggle
    document.addEventListener('keydown', (e) => {
        if (e.key === 't' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            toggleTheme();
        }
    });
});

// Add animation styles for scroll reveal
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(animationStyles);