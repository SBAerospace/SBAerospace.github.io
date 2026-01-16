// Person data - MUST be at the very top
const peopleData = {
    Sammy: {
        name: "Samuel Asefa",
        role: "Rocket Design, Electronics",
        image: "./assets/team/Sammy.JPG",
        bio: "I'm a junior at South Brunswick High School interested in electrical engineering, computer science, and artificial intelligence. In my free time I compete in Robotics and Science Olympiad, as well as spending time with family and friends."
    },
    Zafir: {
        name: "Zafir Shamsi",
        role: "President",
        image: "./assets/team/Zafir.jpg",
        bio: "President bio here"
    }
};

// Open modal function
function openModal(personId) {
    console.log('Opening modal for:', personId);
    const person = peopleData[personId];

    if (!person) {
        console.error(`Person with id "${personId}" not found`);
        alert(`Person "${personId}" not found in data`);
        return;
    }

    console.log('Person found:', person);

    document.getElementById('modalImage').src = person.image || '';
    document.getElementById('modalName').textContent = person.name || '';
    document.getElementById('modalRole').textContent = person.role || '';

    let bodyHTML = `<p>${person.bio || ''}</p>`;
    if (person.achievements && person.achievements.length > 0) {
        bodyHTML += `<h3>Key Achievements</h3><ul>`;
        person.achievements.forEach(achievement => {
            bodyHTML += `<li>${achievement}</li>`;
        });
        bodyHTML += `</ul>`;
    }
    document.getElementById('modalBody').innerHTML = bodyHTML;

    let socialHTML = '';
    if (person.linkedin) {
        socialHTML += `<a href="${person.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`;
    }
    if (person.github) {
        socialHTML += `<a href="${person.github}" target="_blank" rel="noopener">GitHub</a>`;
    }
    if (person.email) {
        socialHTML += `<a href="mailto:${person.email}">Email</a>`;
    }
    document.getElementById('modalSocial').innerHTML = socialHTML;

    const modal = document.getElementById('personModal');
    if (modal) {
        modal.style.display = 'block';
        console.log('Modal should be visible now');
    } else {
        console.error('Modal element not found!');
    }
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('personModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Show team function
function showTeam(teamNumber) {
    console.log('Showing team:', teamNumber);
    const team1List = document.getElementById('team1-list');
    const team2List = document.getElementById('team2-list');
    const team1Btn = document.getElementById('team1-btn');
    const team2Btn = document.getElementById('team2-btn');

    if (teamNumber === 1) {
        if (team1List.style.display === 'grid') {
            team1List.style.display = 'none';
            team1Btn.classList.remove('active');
        } else {
            team1List.style.display = 'grid';
            team2List.style.display = 'none';
            team1Btn.classList.add('active');
            team2Btn.classList.remove('active');
        }
    } else {
        if (team2List.style.display === 'grid') {
            team2List.style.display = 'none';
            team2Btn.classList.remove('active');
        } else {
            team2List.style.display = 'grid';
            team1List.style.display = 'none';
            team2Btn.classList.add('active');
            team1Btn.classList.remove('active');
        }
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('personModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// All your existing code below
document.addEventListener('DOMContentLoaded', function () {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show');
        });
    }

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        });
    });

    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    const customAmountField = document.getElementById('customAmountField');
    if (customAmountField) {
        document.querySelectorAll('input[name="amount"]').forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.value === 'custom' && this.checked) {
                    customAmountField.style.display = 'block';
                } else {
                    customAmountField.style.display = 'none';
                }
            });
        });
    }

    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function (e) {
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
            if (customAmountField) {
                customAmountField.style.display = 'none';
            }
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
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
            const headerHeight = document.getElementById('header') ? document.getElementById('header').offsetHeight : 0;

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