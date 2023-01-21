import axios from 'axios';
import Notiflix from 'notiflix';
import TheMovieAPI from './movies-api';

(() => {
  const theMovieAPI = new TheMovieAPI();

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

  async function getModalData(event) {
    const movieCard = event.target.closest('.movie-card');
    const movieTitle = movieCard.querySelector('.movie-title').textContent;
    const movieID = await theMovieAPI.getMovieID(movieTitle);
    theMovieAPI.movieID = movieID;

    const movieData = await theMovieAPI
      .fetchOneFilm()
      .then(response => response.json())
      .catch(error => console.log(error));
  }
})();
