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

    try {
      const movieID = await theMovieAPI.getMovieID(movieTitle);
      const movieData = await theMovieAPI.fetchOneFilm(movieID);
      console.log(movieData);
    }
    catch (error) {
      console.log(error);
    }
  }
})();
