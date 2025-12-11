class SectionManager {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.currentSection = 'home';
        
        this.init();
    }
    
    init() {
        // Validate elements exist
        if (this.sections.length === 0 || this.navDots.length === 0) {
            console.warn('SectionManager: Missing sections or nav dots');
            return;
        }
        
        // Show home section by default
        this.showSection('home');
        
        this.navDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = dot.dataset.section;
                
                if (sectionId && document.getElementById(sectionId)) {
                    this.showSection(sectionId);
                    
                    // Update URL without page reload
                    history.pushState({ section: sectionId }, '', `#${sectionId}`);
                }
            });
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (event) => {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                this.showSection(hash);
            } else {
                this.showSection('home');
            }
        });
        
        // Handle initial hash
        this.handleInitialHash();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
    }
    
    handleInitialHash() {
        const initialHash = window.location.hash.substring(1);
        if (initialHash && document.getElementById(initialHash)) {
            setTimeout(() => this.showSection(initialHash), 300);
        }
    }
    
    showSection(sectionId) {
        // Hide all sections
        this.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            
            // Update nav dots
            this.updateNavDots(sectionId);
            
            // Smooth scroll to top of section with offset
            const headerHeight = 80;
            const sectionPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: sectionPosition,
                behavior: 'smooth'
            });
            
            // Update document title
            const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            document.title = `Sai Siri Chinta | ${sectionName}`;
        }
    }
    
    updateNavDots(activeSection) {
        this.navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === activeSection) {
                dot.classList.add('active');
            }
        });
    }
    
    addKeyboardNavigation() {
        // Number keys 1-7 for sections
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '7') {
                const index = parseInt(e.key) - 1;
                if (index < this.navDots.length) {
                    const sectionId = this.navDots[index].dataset.section;
                    this.showSection(sectionId);
                }
            }
        });
    }
    
    // Public method to switch sections
    switchTo(sectionId) {
        if (document.getElementById(sectionId)) {
            this.showSection(sectionId);
            return true;
        }
        return false;
    }
    
    // Get current section
    getCurrentSection() {
        return this.currentSection;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        try {
            window.sectionManager = new SectionManager();
            console.log('SectionManager initialized successfully');
        } catch (error) {
            console.error('Failed to initialize SectionManager:', error);
        }
    }, 100);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SectionManager;
}