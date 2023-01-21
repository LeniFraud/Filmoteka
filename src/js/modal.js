import axios from 'axios';
import Notiflix from 'notiflix';
import TheMovieAPI from './movies-api';

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    container: document.querySelector('.gallery'),
  };

  refs.container.addEventListener('click', getModalData);

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
  }

  function getModalData(event) {
    const movieTitle =
      event.currentTarget.querySelector('.movie-title').textContent;
    const movieID = TheMovieAPI.getMovieID(movieTitle).then(
      response => response.json
    );
    console.log(movieID);
  }
})();
