// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header shadow
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 16);
}, { passive: true });

// Mobile nav
const toggle   = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
toggle.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
mobileNav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
  })
);

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (e.target.dataset.delay || 0) + 'ms';
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .why-item, .hstat, .check-list li, .contact-detail-item').forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 70;
  observer.observe(el);
});

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const f = e.target;
  const body = encodeURIComponent(
    `Name: ${f.name.value}\nPhone: ${f.phone.value}\nService: ${f.service.value}\n\n${f.message.value}`
  );
  const subject = encodeURIComponent(`Website Inquiry — ${f.service.value || 'General'}`);
  window.location.href = `mailto:wunschconstruction@gmail.com?subject=${subject}&body=${body}&cc=${f.email.value}`;
  f.reset();
  document.getElementById('form-success').hidden = false;
}
