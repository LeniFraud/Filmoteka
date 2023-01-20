(() => {
  const refs = {
    openFooterModal: document.querySelector('[data-footer-modal-open]'),
    closeFooterModalBtn: document.querySelector('[data-footer-modal-close]'),
    footerModal: document.querySelector('[data-footer-modal]'),
  };

  refs.openFooterModal.addEventListener('click', toggleModal);
  refs.closeFooterModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    document.body.classList.toggle('no-scroll');
    refs.footerModal.classList.toggle('is-closed');
  }
})();
