// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

toggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  });
});

// Sticky header shadow on scroll
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.4)' : '';
}, { passive: true });

// Contact form — demo handler (mailto fallback)
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name    = form.name.value;
  const email   = form.email.value;
  const phone   = form.phone.value;
  const service = form.service.value;
  const message = form.message.value;

  const body = encodeURIComponent(
    `Name: ${name}\nPhone: ${phone}\nService: ${service}\n\n${message}`
  );
  const subject = encodeURIComponent(`Website Inquiry — ${service || 'General'}`);
  window.location.href = `mailto:wunschconstruction@gmail.com?subject=${subject}&body=${body}&cc=${email}`;

  form.reset();
  document.getElementById('form-success').hidden = false;
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-item, .stat').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
});

// Polyfill for IntersectionObserver callback
document.querySelectorAll('.service-card, .why-item, .stat').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 60}ms`;
});

const styleEl = document.createElement('style');
styleEl.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(styleEl);
