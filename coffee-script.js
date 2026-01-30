// = NAVBAR SCROLL EFFECT ====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});


const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

const animateFeaturedCards = () => {
    const cards = document.querySelectorAll('.featured-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
};


const animateLocationCards = () => {
    const cards = document.querySelectorAll('.location-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
};

// ========== NEWSLETTER FORM HANDLING ==========
const newsletterForm = document.querySelector('.newsletter-form');
const emailInput = document.querySelector('.email-input');
const subscribeBtn = document.querySelector('.btn-subscribe');

if (subscribeBtn) {
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
            // Simulate subscription
            subscribeBtn.textContent = 'Subscribed! ✓';
            subscribeBtn.style.background = '#6b8e23';
            emailInput.value = '';
            
            setTimeout(() => {
                subscribeBtn.textContent = 'Subscribe';
                subscribeBtn.style.background = '';
            }, 3000);
        } else {
            emailInput.style.borderColor = '#e74c3c';
            emailInput.placeholder = 'Please enter a valid email';
            
            setTimeout(() => {
                emailInput.style.borderColor = '';
                emailInput.placeholder = 'Enter your email address';
            }, 2000);
        }
    });
}

// ========== EMAIL VALIDATION ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========== ADD TO CART BUTTONS ==========
const addToCartButtons = document.querySelectorAll('.btn-add');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        this.textContent = 'Added! ✓';
        this.style.background = '#6b8e23';
        
        // Animate button
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
        }, 2000);
    });
});

// ========== PARALLAX EFFECT FOR HERO ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    }
});

// ========== COFFEE STEAM ANIMATION ==========
const createSteam = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 5; i++) {
        const steam = document.createElement('div');
        steam.className = 'steam-particle';
        steam.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            border-radius: 50%;
            bottom: ${Math.random() * 20}%;
            left: ${Math.random() * 100}%;
            animation: steam ${Math.random() * 10 + 15}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(steam);
    }
    
    // Add CSS animation for steam
    const style = document.createElement('style');
    style.textContent = `
        @keyframes steam {
            0% {
                transform: translateY(0) scale(1);
                opacity: 0;
            }
            50% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) scale(1.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// ========== INITIALIZE ALL ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateFeaturedCards();
    animateLocationCards();
    createSteam();
    
    // Add active class to current nav item
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});


const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);


const createCursorTrail = () => {
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;
    
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 968) { // Only on desktop
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(212, 175, 55, 0.3);
                pointer-events: none;
                left: ${e.clientX - 4}px;
                top: ${e.clientY - 4}px;
                animation: trailFade 0.8s ease-out forwards;
                z-index: 9999;
            `;
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 800);
        }
    });
    
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(trailStyle);
};



console.log('BeanCraft Coffee - Landing Page Loaded Successfully! ☕');