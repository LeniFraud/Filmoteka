import { scroll } from '../stop-scrolling';

const loginlRefs = {
    // Login Modal
    btnLoginOpenEl: document.querySelector('.login__btn'),
    btnOutEl: document.querySelector('.logout__btn'),

    btnCloseAutEl: document.querySelector('button[data-action="close"]'),
    loginBackdropEl: document.querySelector('.login-modal-backdrop'),
    loginModalEl: document.querySelector('.modal-container'),
    logoutBtnEl: document.querySelector('.nav-btn.logout__btn'),
    loginFormEl: document.querySelector('.modal-form.login'),
    registerFormEl: document.querySelector('.modal-form.register'),
    modalBtnEls: document.querySelectorAll(
        '.modal-form button[data-action="toggle"]'
    ),
};

loginlRefs.modalBtnEls[0].addEventListener('click', switchModals);
loginlRefs.modalBtnEls[1].addEventListener('click', switchModals);

loginlRefs.btnLoginOpenEl.addEventListener('click', openLoginModal);
loginlRefs.btnCloseAutEl.addEventListener('click', closeLoginModal);
loginlRefs.loginBackdropEl.addEventListener('click', onBackdropClick);

function switchModals() {
    loginlRefs.loginFormEl.classList.toggle('is-hidden');
    loginlRefs.registerFormEl.classList.toggle('is-hidden');
};

function openLoginModal() {
    scroll.disableScroll();
    loginlRefs.loginBackdropEl.classList.toggle('is-hidden');
    window.addEventListener('keydown', onEscPress);
};

function closeLoginModal() {
    scroll.enableScroll();
    loginlRefs.loginBackdropEl.classList.toggle('is-hidden');
    window.removeEventListener('keydown', onEscPress);
};

function onEscPress(e) {
    if (e.code === 'Escape') {
        closeLoginModal();
    }
};

function onBackdropClick(e) {
    if (e.target === e.currentTarget) {
        closeLoginModal();
    }
};
