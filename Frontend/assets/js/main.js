/* =============================
   StreamSphere – main.js
============================= */

(function () {
  'use strict';

  /* ── Navbar scroll shadow ── */
  const navbar = document.querySelector('.ss-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 4px 28px rgba(0,0,0,.35)'
        : '0 2px 20px rgba(0,0,0,.25)';
    });
  }

  /* ── Category pill filter ── */
  document.querySelectorAll('.ss-pill').forEach(pill => {
    pill.addEventListener('click', function () {
      document.querySelectorAll('.ss-pill').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      // In a real app, filter cards here
      const cards = document.querySelectorAll('.ss-video-card');
      cards.forEach(c => {
        c.parentElement.style.opacity = '0.4';
        setTimeout(() => { c.parentElement.style.opacity = '1'; }, 300);
      });
    });
  });

  /* ── Toast helper ── */
  window.ssToast = function (message, icon = 'fa-check-circle') {
    let toast = document.getElementById('ss-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ss-toast';
      toast.className = 'ss-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  /* ── Like button toggle ── */
  document.querySelectorAll('.ss-action-btn[data-action="like"]').forEach(btn => {
    btn.addEventListener('click', function () {
      this.classList.toggle('liked');
      const icon = this.querySelector('i');
      const label = this.querySelector('span');
      if (this.classList.contains('liked')) {
        icon && icon.classList.replace('far', 'fas');
        if (label) {
          const n = parseInt(label.textContent.replace(/\D/g,'')) || 0;
          label.textContent = (n + 1).toLocaleString();
        }
        ssToast('Added to your likes!');
      } else {
        icon && icon.classList.replace('fas', 'far');
        if (label) {
          const n = parseInt(label.textContent.replace(/\D/g,'')) || 1;
          label.textContent = (n - 1).toLocaleString();
        }
      }
    });
  });

  /* ── Share button ── */
  document.querySelectorAll('.ss-action-btn[data-action="share"]').forEach(btn => {
    btn.addEventListener('click', function () {
      navigator.clipboard && navigator.clipboard.writeText(window.location.href)
        .then(() => ssToast('Link copied to clipboard!', 'fa-link'))
        .catch(() => ssToast('Copy the URL from your address bar', 'fa-link'));
    });
  });

  /* ── Video card click navigation ── */
  document.querySelectorAll('.ss-video-card').forEach(card => {
    card.addEventListener('click', function (e) {
      if (!e.target.closest('button') && !e.target.closest('a')) {
        window.location.href = 'watch.html';
      }
    });
  });

  /* ── Suggested video items ── */
  document.querySelectorAll('.ss-suggest-item').forEach(item => {
    item.addEventListener('click', () => {
      window.location.href = 'watch.html';
    });
  });

  /* ── Active nav link highlight ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.ss-navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) link.classList.add('active');
  });

})();
