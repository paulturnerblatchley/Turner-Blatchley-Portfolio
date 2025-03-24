// Fixed Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Get the navigation element
    const fixedNav = document.getElementById('portfolio-nav');
    
    if (!fixedNav) {
        console.error("Navigation element not found!");
        return;
    }
    
    // Set a scroll threshold - show after scrolling 100px
    const scrollThreshold = 100;
    
    // Get all section elements we want to track
    const sections = [
        { id: 'hero', navSelector: '.nav-home' },
        { id: 'website-redesign', navSelector: '.nav-item[href="#website-redesign"]' },
        { id: 'newsletter-videos', navSelector: '.nav-item[href="#newsletter-videos"]' },
        { id: 'mock-trial', navSelector: '.nav-item[href="#mock-trial"]' },
        { id: 'photography', navSelector: '.nav-item[href="#photography"]' },
        { id: 'golden-bell', navSelector: '.nav-item[href="#golden-bell"]' },
        { id: 'annual-report', navSelector: '.nav-item[href="#annual-report"]' },
        { id: 'conclusion', navSelector: '.nav-item[href="#conclusion"]' },
        { id: 'contact', navSelector: '.nav-contact' }
    ];
    
    // Handle scroll events
    window.addEventListener('scroll', function() {
        // Show/hide the navigation
        if (window.scrollY > scrollThreshold) {
            fixedNav.classList.add('visible');
        } else {
            fixedNav.classList.remove('visible');
        }
        
        // Determine which section is currently visible
        updateActiveSection();
    });
    
    // Function to update the active section based on scroll position
    function updateActiveSection() {
        // Get the current scroll position plus a small offset
        const scrollPosition = window.scrollY + 150; // offset helps with better highlighting
        
        // Find the current section
        let currentSection = null;
        
        // Loop through sections from bottom to top to find the last one we've scrolled past
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i].id);
            if (!section) continue;
            
            if (scrollPosition >= section.offsetTop) {
                currentSection = sections[i];
                break;
            }
        }
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to the current section's nav item
        if (currentSection) {
            const navItem = document.querySelector(currentSection.navSelector);
            if (navItem) {
                navItem.classList.add('active');
            }
        }
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 58,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initial checks
    if (window.scrollY > scrollThreshold) {
        fixedNav.classList.add('visible');
    }
    updateActiveSection(); // Set initial active section
});

/* Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}); */

// Improved Fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Make sure we found elements
    console.log('Found ' + fadeElements.length + ' fade-in elements');
    
    function checkFade() {
        fadeElements.forEach(element => {
            // Get element position relative to viewport
            const rect = element.getBoundingClientRect();
            
            // Check if element is in viewport
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('visible');
                console.log('Element made visible');
            }
        });
    }
    
    // Run on scroll events
    window.addEventListener('scroll', checkFade);
    
    // Run on resize events
    window.addEventListener('resize', checkFade);
    
    // Initial check
    setTimeout(checkFade, 100); // Small delay to ensure layout is complete
});

// Video Play Buttons
const playButtons = document.querySelectorAll('.play-button');

playButtons.forEach(button => {
    button.addEventListener('click', function() {
        alert('Video would play here in the final implementation. This is a placeholder for the portfolio demonstration.');
    });
});

// Image Comparison Slider for Website Redesign Case Study
document.addEventListener('DOMContentLoaded', function() {
    initImageComparisonSlider();
    initSkillTagEffects();
});

// Initialize image comparison slider
function initImageComparisonSlider() {
    // Get elements
    const container = document.getElementById('website-comparison');
    if (!container) return;
    
    const beforeEl = container.querySelector('.image-compare__before');
    const sliderEl = container.querySelector('.image-compare__slider');
    const handleEl = container.querySelector('.image-compare__handle');
    
    if (!beforeEl || !sliderEl || !handleEl) return;
    
    let isDragging = false;
    
    // Add mouse events
    handleEl.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Add touch events
    handleEl.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', endDrag);
    
    // Simple click to position
    container.addEventListener('click', function(e) {
        if (e.target === handleEl) return;
        move(e);
    });
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
    }
    
    function drag(e) {
        if (!isDragging) return;
        move(e);
    }
    
    function endDrag() {
        isDragging = false;
    }
    
    function move(e) {
        let clientX;
        
        // Get pointer position
        if (e.type === 'touchmove' || e.type === 'touchstart') {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        
        // Get relative position
        const rect = container.getBoundingClientRect();
        let position = (clientX - rect.left) / rect.width;
        
        // Limit position between 0 and 1
        position = Math.max(0, Math.min(1, position));
        
        // Update elements
        beforeEl.style.width = position * 100 + '%';
        sliderEl.style.left = position * 100 + '%';
    }
    
    // Set initial position
    beforeEl.style.width = '50%';
    sliderEl.style.left = '50%';
}

// Initialize skill tag hover effects
function initSkillTagEffects() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and sections
    const tabs = document.querySelectorAll('.arch-tab');
    const sections = document.querySelectorAll('.arch-section');
    
    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
});

// Navigation Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.getElementById('portfolio-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    
    // Toggle mobile nav
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            
            // Update active link state
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            this.classList.add('active');
        });
    });
});