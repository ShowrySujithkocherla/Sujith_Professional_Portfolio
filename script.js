const menu = document.querySelector('.menu');
const links = document.querySelector('.links');
const bar = document.querySelector('.progress');

menu?.addEventListener('click', () => {
  links.classList.toggle('open');
  menu.textContent = links.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('.links a').forEach((a) => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    menu.textContent = '☰';
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  observer.observe(element);
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.links a');

addEventListener(
  'scroll',
  () => {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = maxScroll ? `${(scrollY / maxScroll) * 100}%` : '0%';

    let currentSection = 'home';

    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - 180) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${currentSection}`;
      link.classList.toggle('active', isActive);
    });
  },
  { passive: true }
);

