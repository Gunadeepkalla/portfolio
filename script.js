document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const themeToggle = document.getElementById('theme-toggle');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const backToTop = document.querySelector('.back-to-top');
    const navItems = document.querySelectorAll('.nav-links a');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('section');

    // Check for saved theme preference or prefer-color-scheme
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    }

    // Theme toggle functionality
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });

    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('show');
    });

    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('show');
        });
    });

    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active nav item on scroll
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Project filtering
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Get the filter value
            const filterValue = btn.getAttribute('data-category');

            // Filter projects
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                // Show/hide projects based on category
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Simple form validation
            if (name && email && subject && message) {
                // In a real application, you would send this data to a server
                // For demo purposes, we'll just log it and show a success message
                console.log({ name, email, subject, message });

                // Show success message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Message sent successfully!';
                contactForm.appendChild(formMessage);

                // Clear form
                contactForm.reset();

                // Remove success message after 3 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 3000);
            } else {
                // Show error message
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all fields.';
                contactForm.appendChild(formMessage);

                // Remove error message after 3 seconds
                setTimeout(() => {
                    formMessage.remove();
                }, 3000);
            }
        });
    }

    // Add animation to progress bars
    const skillsSection = document.querySelector('.skills');

    const animateSkills = () => {
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (skillsSection) {
            observer.observe(skillsSection);
        }
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        window.addEventListener('scroll', () => {
            if (skillsSection && window.scrollY + window.innerHeight > skillsSection.offsetTop) {
                animateSkills();
                window.removeEventListener('scroll', this);
            }
        });
    }

    // Simple typing effect for the hero section
    const typingElement = document.querySelector('.hero-text .name');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';

        let i = 0;
        const typeEffect = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeEffect, 100);
            }
        };

        setTimeout(typeEffect, 500);
    }
});