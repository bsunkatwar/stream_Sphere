/* =============================
   StreamSphere – dashboard.js
============================= */

(function () {
  'use strict';

  /* ── Edit buttons (UI demo) ── */
  document.querySelectorAll('.ss-btn-edit').forEach(btn => {
    btn.addEventListener('click', function () {
      const card  = this.closest('.ss-dash-video-card');
      const title = card?.querySelector('h5')?.textContent || 'this video';
      const modal = document.getElementById('edit-modal');
      if (modal) {
        const titleInput = modal.querySelector('#edit-title');
        if (titleInput) titleInput.value = title;
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
      }
    });
  });

  /* ── Edit form save ── */
  const editSaveBtn = document.getElementById('edit-save-btn');
  if (editSaveBtn) {
    editSaveBtn.addEventListener('click', () => {
      const modal = document.getElementById('edit-modal');
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) bsModal.hide();
      window.ssToast && ssToast('Changes saved successfully!', 'fa-check-circle');
    });
  }

  /* ── Delete buttons ── */
  let targetCard = null;

  document.querySelectorAll('.ss-btn-delete').forEach(btn => {
    btn.addEventListener('click', function () {
      targetCard = this.closest('.col');
      const modal = document.getElementById('delete-modal');
      if (modal) {
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
      }
    });
  });

  const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', () => {
      const modal = document.getElementById('delete-modal');
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) bsModal.hide();

      if (targetCard) {
        targetCard.style.transition = 'all .35s ease';
        targetCard.style.opacity   = '0';
        targetCard.style.transform = 'scale(.92)';
        setTimeout(() => {
          targetCard.remove();
          targetCard = null;
          updateVideoCount();
          window.ssToast && ssToast('Video deleted.', 'fa-trash');
        }, 350);
      }
    });
  }

  function updateVideoCount() {
    const countEl = document.getElementById('video-count');
    if (!countEl) return;
    const remaining = document.querySelectorAll('.ss-dash-video-card').length;
    countEl.textContent = remaining;
  }

  /* ── Sidebar active state ── */
  const sideLinks = document.querySelectorAll('.ss-dash-sidebar .nav-link');
  sideLinks.forEach(link => {
    link.addEventListener('click', function () {
  sideLinks.forEach(l => l.classList.remove('active'));
  this.classList.add('active');
});
});
});
