document.addEventListener('DOMContentLoaded', () => {
    // عناصر التحكم بالثيم
    const themeToggleButton = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const topBar = document.querySelector('.top-bar');
    const links = document.querySelectorAll('.Healer-link');
    const socialIcons = document.querySelectorAll('.social-icon');
    let lastScrollY = 0;

    const applyTheme = (theme) => {
        const isDarkMode = theme === 'dark-mode';
        document.body.classList.toggle('dark-mode', isDarkMode);

        sunIcon.style.display = isDarkMode ? 'none' : 'block';
        moonIcon.style.display = isDarkMode ? 'block' : 'none';

        socialIcons.forEach(icon => {
            icon.src = isDarkMode ? icon.dataset.dark : icon.dataset.light;
        });
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = document.body.classList.contains('dark-mode');
        const newTheme = isDarkMode ? '' : 'dark-mode';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            topBar.classList.add('hidden');
        } else {
            topBar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    document.addEventListener('mousemove', (e) => {
        const isMouseNearTop = e.clientY < 50;
        if (isMouseNearTop) {
            topBar.classList.remove('hidden');
        }

        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        const glowStrengthX = Math.abs((mouseX / maxWidth) * 100);
        const glowStrengthY = Math.abs((mouseY / maxHeight) * 100);
        const glowStrength = (glowStrengthX + glowStrengthY) / 2;

        topBar.style.boxShadow = `0 0 ${glowStrength * 0.5}px rgba(255, 215, 0, 1)`;
    });

    // معالجة الروابط بناءً على بيئة GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    const blockedExtensions = ['.html', '.css', '.js', '.png'];

    links.forEach(link => {
        const linkHref = link.href;

        const isBlocked = blockedExtensions.some(ext => linkHref.endsWith(ext));
        if (isBlocked) {
            link.href = '/404';
        } else {
            if (isGitHubPages) {
                link.href = linkHref.replace('.html', '');
            } else if (!linkHref.includes('.html')) {
                link.href = linkHref + '.html';
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.Healer-link');
    const sections = document.querySelectorAll('section');
    const scrollDuration = 1200;

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            const pageTransition = document.createElement('div');
            pageTransition.classList.add('page-transition');
            document.body.appendChild(pageTransition);

            setTimeout(() => {
                pageTransition.classList.add('active');
            }, 10);

            const targetPosition = targetSection.offsetTop;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            setTimeout(() => {
                pageTransition.remove();
            }, scrollDuration);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('.Healer-link[href="#home"]');
    const scrollDuration = 100;  

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});