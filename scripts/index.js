document.addEventListener("DOMContentLoaded", () => {
    // Get the "Veja nosso portfólio abaixo" teaser in header
    const headerTeaser = document.querySelector('.header .more-examples-teaser');
    
    // Make sure the element is visible on page load
    if (headerTeaser) {
        // Set opacity immediately on page load
        headerTeaser.style.opacity = '1';
        
        // Add click event to scroll to the first project section
        headerTeaser.addEventListener('click', function() {
            // Scroll to the first project section
            const firstProjectSection = document.querySelector('section:nth-of-type(2)');
            if (firstProjectSection) {
                firstProjectSection.scrollIntoView({ 
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Create scroll indicators
    createScrollIndicators();
    
    // Handle scroll events for scroll indicators and parallax
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        updateScrollIndicators(scrollPosition);
        
        // Parallax effect for header images
        if (scrollPosition < window.innerHeight) {
            const headerImages = document.querySelectorAll('.header .img-div');
            headerImages.forEach((img, index) => {
                const speed = 0.05 + (index * 0.01);
                img.style.transform = `translateY(${scrollPosition * speed}px)`;
            });
        }
    });
    
    // Call the function to adjust mobile layout
    adjustMobileLayout();
    
    // Run on window resize
    window.addEventListener('resize', function() {
        adjustMobileLayout();
    });
});

// Create scroll indicators for each section
function createScrollIndicators() {
    const sections = document.querySelectorAll('section');
    if (sections.length < 2) return; // Only create indicators if multiple sections
    
    // Create container
    const indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'scroll-indicator';
    
    // Create a dot for each section
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'scroll-indicator-dot';
        if (index === 0) dot.classList.add('active');
        
        // Add click event to scroll to corresponding section
        dot.addEventListener('click', () => {
            sections[index].scrollIntoView({ behavior: 'smooth' });
        });
        
        indicatorContainer.appendChild(dot);
    });
    
    document.body.appendChild(indicatorContainer);
}

// Update scroll indicators based on current scroll position
function updateScrollIndicators(scrollPos) {
    const sections = document.querySelectorAll('section');
    const dots = document.querySelectorAll('.scroll-indicator-dot');
    
    if (!dots.length) return;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop - window.innerHeight/2 && 
            scrollPos < sectionTop + sectionHeight - window.innerHeight/2) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
    });
}

// Function to adjust layout for mobile
function adjustMobileLayout() {
    if (window.innerWidth <= 768) {
        const sections = document.querySelectorAll('section:not(.header)');
        
        sections.forEach(section => {
            const infoSection = section.querySelector('.info-section');
            const infoText = section.querySelector('.info-text');
            const infoCard = section.querySelector('.info-card');
            const title = infoText ? infoText.querySelector('h2') : null;
            
            if (infoSection && infoText && title && !section.querySelector('h2:not(.info-text h2)')) {
                // Clone the title to preserve all styles and event handlers
                const clonedTitle = title.cloneNode(true);
                // Add special class for mobile titles
                clonedTitle.classList.add('mobile-section-title');
                
                // Add the title before the info section
                infoSection.parentNode.insertBefore(clonedTitle, infoSection);
                
                // Temporarily hide the original title
                title.style.visibility = 'hidden';
                title.style.position = 'absolute';
                title.style.pointerEvents = 'none';
            }
        });
    } else {
        // Reset on desktop
        document.querySelectorAll('.mobile-section-title').forEach(title => {
            title.remove();
        });
        
        document.querySelectorAll('.info-text h2').forEach(title => {
            title.style.visibility = '';
            title.style.position = '';
            title.style.pointerEvents = '';
        });
    }
}