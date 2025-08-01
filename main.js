document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    
    mobileNavToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
        });
    });

    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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

    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            
            let amount;
            const selectedAmount = document.querySelector('input[name="amount"]:checked').value;
            if (selectedAmount === 'custom') {
                amount = document.getElementById('customAmount').value;
            } else {
                amount = selectedAmount;
            }
            
            alert(`Thank you, ${name}! Your donation of ${amount} has been processed. We'll send confirmation to your email.`);
            
            donationForm.reset();
            customAmountField.style.display = 'none';
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            
            alert(`Thank you, ${name}! Your message has been sent. We'll get back to you soon.`);
            
            contactForm.reset();
        });
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.achievement-card, .tier-card, .about-content, .contact-grid').forEach(el => {
        observer.observe(el);
    });

    function highlightNavigation() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerHeight = document.getElementById('header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.style.color = 'var(--gold)';
            } else {
                link.style.color = '';
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    window.addEventListener('load', highlightNavigation);
});
