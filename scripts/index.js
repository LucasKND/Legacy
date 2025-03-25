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