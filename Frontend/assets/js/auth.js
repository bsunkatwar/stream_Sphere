/* =============================
   StreamSphere – auth.js
============================= */

(function () {
  'use strict';

  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  /* ── Validators ── */
  function isEmpty(val) { return !val.trim(); }
  function isEmail(val) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val); }
  function isStrongPwd(val) { return val.length >= 8; }

  function setFieldState(input, valid, msg) {
    const feedback = input.parentElement.querySelector('.ss-invalid-feedback')
      || input.closest('.mb-3')?.querySelector('.ss-invalid-feedback');
    if (valid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-invalid');
      input.classList.remove('is-valid');
      if (feedback && msg) feedback.textContent = msg;
    }
    return valid;
  }

  function clearField(input) {
    input.classList.remove('is-invalid', 'is-valid');
  }

  /* ── Real-time clearing ── */
  document.querySelectorAll('.ss-form-control').forEach(input => {
    input.addEventListener('input', () => clearField(input));
  });

  /* ── Login ── */
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email    = document.getElementById('login-email');
      const password = document.getElementById('login-password');
      let valid = true;

      if (!isEmail(email.value)) valid = setFieldState(email, false, 'Enter a valid email address.') && valid;
      else setFieldState(email, true);

      if (isEmpty(password.value)) valid = setFieldState(password, false, 'Password is required.') && valid;
      else setFieldState(password, true);

      if (valid) {
        const btn = loginForm.querySelector('.btn-primary-ss');
        btn.textContent = 'Signing in…';
        btn.disabled = true;
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1200);
      }
    });
  }

  /* ── Register ── */
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name     = document.getElementById('reg-name');
      const email    = document.getElementById('reg-email');
      const password = document.getElementById('reg-password');
      const confirm  = document.getElementById('reg-confirm');
      let valid = true;

      if (isEmpty(name.value)) {
        setFieldState(name, false, 'Full name is required.');
        valid = false;
      } else setFieldState(name, true);

      if (!isEmail(email.value)) {
        setFieldState(email, false, 'Enter a valid email address.');
        valid = false;
      } else setFieldState(email, true);

      if (!isStrongPwd(password.value)) {
        setFieldState(password, false, 'Password must be at least 8 characters.');
        valid = false;
      } else setFieldState(password, true);

      if (confirm.value !== password.value || isEmpty(confirm.value)) {
        setFieldState(confirm, false, 'Passwords do not match.');
        valid = false;
      } else setFieldState(confirm, true);

      if (valid) {
        const btn = registerForm.querySelector('.btn-primary-ss');
        btn.textContent = 'Creating account…';
        btn.disabled = true;
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1400);
      }
    });
  }

  /* ── Password show/hide toggle ── */
  document.querySelectorAll('.ss-pwd-toggle').forEach(toggle => {
    toggle.addEventListener('click', function () {
      const targetId = this.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        this.innerHTML = '<i class="fas fa-eye-slash"></i>';
      } else {
        input.type = 'password';
        this.innerHTML = '<i class="fas fa-eye"></i>';
      }
    });
  });

})();
