 gsap.registerPlugin(ScrollTrigger);

        window.addEventListener('load', () => {
            const preloader = document.getElementById('preloader');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            const openMenuBtn = document.getElementById('open-menu');
            const closeMenuBtn = document.getElementById('close-menu');
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

            // 0. Preloader Exit
            const mainTl = gsap.timeline({
                onComplete: () => {
                    preloader.classList.add('loaded');
                    ScrollTrigger.refresh();
                }
            });

            mainTl.to('#preloader-bar', { width: '100%', duration: 0.5 });
            mainTl.to('#preloader', { opacity: 0, duration: 0.8, ease: "power4.inOut" });

            // 1. Header Smooth Entry
            mainTl.to('#navbar', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.out"
            }, "-=0.4");

            // 2. Hero Section Animations
            mainTl.to('#hero-section .gsap-reveal', {
                opacity: 1,
                visibility: 'visible',
                y: -30,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.6");

            // 3. Featured Products - Staggered Entry
            gsap.to('#products-section .gsap-reveal:not(.product-card)', {
                scrollTrigger: {
                    trigger: '#products-section',
                    start: 'top 80%',
                },
                opacity: 1,
                visibility: 'visible',
                y: -30,
                duration: 1,
                ease: "power3.out"
            });

            gsap.to('#products-section .product-card', {
                scrollTrigger: {
                    trigger: '#products-section .grid',
                    start: 'top 80%',
                },
                opacity: 1,
                visibility: 'visible',
                y: -30,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // 4. About Section Animations
            gsap.utils.toArray('#about-section .gsap-reveal').forEach((elem) => {
                gsap.to(elem, {
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 85%',
                    },
                    opacity: 1,
                    visibility: 'visible',
                    y: -30,
                    duration: 1,
                    ease: "power3.out"
                });
            });

            // --- Mobile Menu Logic ---
            const menuTl = gsap.timeline({ paused: true });

            menuTl.set(mobileMenuOverlay, { display: 'flex' })
                .to(mobileMenuOverlay, {
                    clipPath: 'circle(150% at 100% 0%)',
                    duration: 0.8,
                    ease: 'power4.inOut'
                })
                .from('.mobile-nav-link', {
                    y: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power3.out'
                }, "-=0.4");

            openMenuBtn.addEventListener('click', () => {
                menuTl.play();
            });

            closeMenuBtn.addEventListener('click', () => {
                menuTl.reverse();
            });

            mobileNavLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        menuTl.reverse();
                        const target = document.querySelector(href);
                        if (target) {
                            setTimeout(() => {
                                window.scrollTo({
                                    top: target.offsetTop - 72,
                                    behavior: 'smooth'
                                });
                            }, 600);
                        }
                    } else {
                        menuTl.reverse();
                    }
                });
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.classList.add('hidden');
            successMsg.classList.remove('hidden');
            console.log("Mock submission success!");
        });
    }
});
