document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    
    mobileNavToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Custom amount toggle in donation form
    const amountCustom = document.getElementById('amountCustom');
    const customAmountField = document.getElementById('customAmountField');
    
    document.querySelectorAll('input[name="amount"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'custom' && this.checked) {
                customAmountField.style.display = 'block';
            } else {
                customAmountField.style.display = 'none';
            }
        });
    });

    // Form submission handlers
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            
            // Get selected amount
            let amount;
            const selectedAmount = document.querySelector('input[name="amount"]:checked').value;
            if (selectedAmount === 'custom') {
                amount = document.getElementById('customAmount').value;
            } else {
                amount = selectedAmount;
            }
            
            // Simulate donation processing
            alert(`Thank you, ${name}! Your donation of $${amount} has been processed. We'll send a confirmation to your email.`);
            
            // Reset form
            donationForm.reset();
            customAmountField.style.display = 'none';
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            
            // Simulate contact form submission
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Animation on scroll for achievements section
    const achievementItems = document.querySelectorAll('.achievement-item');
    
    // Simple function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Add animation class when scrolling
    function checkScroll() {
        achievementItems.forEach(item => {
            if (isInViewport(item)) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state for animation
    achievementItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on scroll and on load
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Highlight current section in navigation
    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.getElementById('header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 50) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.style.color = '#FFD700';
            } else {
                link.style.color = '';
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    window.addEventListener('load', highlightNavigation);
});