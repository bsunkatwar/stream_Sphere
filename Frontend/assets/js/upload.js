/* =============================
   StreamSphere – upload.js
============================= */

(function () {
  'use strict';

  const dropzone     = document.getElementById('upload-zone');
  const fileInput    = document.getElementById('video-file-input');
  const previewWrap  = document.getElementById('video-preview-wrap');
  const previewVid   = document.getElementById('video-preview');
  const fileNameEl   = document.getElementById('file-name-display');
  const fileSizeEl   = document.getElementById('file-size-display');
  const progressBar  = document.querySelector('.ss-progress-bar');
  const uploadForm   = document.getElementById('upload-form');
  const thumbInput   = document.getElementById('thumb-file-input');
  const thumbPreview = document.getElementById('thumb-preview');

  if (!dropzone) return;

  /* ── Click on zone triggers file picker ── */
  dropzone.addEventListener('click', () => fileInput && fileInput.click());

  /* ── Drag & drop ── */
  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));

  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length) handleVideoFile(files[0]);
  });

  /* ── File input change ── */
  if (fileInput) {
    fileInput.addEventListener('change', function () {
      if (this.files.length) handleVideoFile(this.files[0]);
    });
  }

  function handleVideoFile(file) {
    const allowed = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-msvideo'];
    if (!allowed.includes(file.type)) {
      window.ssToast && ssToast('Please select a valid video file (MP4, WebM, MOV, AVI).', 'fa-times-circle');
      return;
    }

    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = formatSize(file.size);

    const url = URL.createObjectURL(file);
    if (previewVid) previewVid.src = url;
    if (previewWrap) previewWrap.style.display = 'block';

    dropzone.querySelector('h5').textContent = 'Video selected';
    dropzone.querySelector('p').textContent = file.name;
  }

  /* ── Thumbnail preview ── */
  if (thumbInput) {
    thumbInput.addEventListener('change', function () {
      if (!this.files.length) return;
      const file = this.files[0];
      if (!file.type.startsWith('image/')) {
        window.ssToast && ssToast('Please select an image file.', 'fa-times-circle');
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        if (thumbPreview) {
          thumbPreview.src = e.target.result;
          thumbPreview.style.display = 'block';
        }
      };
      reader.readAsDataURL(file);
    });
  }

  /* ── Form submit (simulated upload) ── */
  if (uploadForm) {
    uploadForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const titleInput = document.getElementById('video-title');
      const descInput  = document.getElementById('video-desc');
      let valid = true;

      if (!titleInput || !titleInput.value.trim()) {
        if (titleInput) {
          titleInput.classList.add('is-invalid');
          titleInput.closest('.mb-3')?.querySelector('.ss-invalid-feedback') &&
            (titleInput.closest('.mb-3').querySelector('.ss-invalid-feedback').textContent = 'Video title is required.');
        }
        valid = false;
      } else {
        titleInput.classList.remove('is-invalid');
        titleInput.classList.add('is-valid');
      }

      if (!valid) return;

      if (!fileInput || !fileInput.files.length) {
        window.ssToast && ssToast('Please select a video file first.', 'fa-times-circle');
        return;
      }

      simulateUpload();
    });
  }

  function simulateUpload() {
    const btn = uploadForm.querySelector('.btn-primary-ss');
    if (btn) { btn.textContent = 'Uploading…'; btn.disabled = true; }

    if (progressBar) {
      progressBar.style.width = '0%';
      progressBar.closest('.ss-progress').style.display = 'block';
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 4;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        if (progressBar) progressBar.style.width = '100%';
        setTimeout(() => {
          window.ssToast && ssToast('Video uploaded successfully!', 'fa-check-circle');
          setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
        }, 400);
      }
      if (progressBar) progressBar.style.width = progress + '%';
    }, 260);
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

})();
