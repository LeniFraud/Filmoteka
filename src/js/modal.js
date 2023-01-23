import TheMovieAPI from './movies-api';

const theMovieAPI = new TheMovieAPI();

const refs = {
  openModal: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  container: document.querySelector('.gallery'),
  modalRef: document.querySelector('.modal-wrap'),
};

refs.openModal.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);


function openModal(e) {
  // console.log(e.target);

  movieId = Number(getMovieId(e.target));
  if (movieId !== undefined) {
    document.body.classList.add('no-scroll');
    refs.modal.classList.remove('is-hidden');
    getCurrentMovieData(movieId);
    refs.modal.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onKeyClick);
  }
}

function getMovieId(target) {
  if (target.classList.contains('movie-card')) {
    return target.dataset.filmid;
  }

  const movieCard = target.closest('.movie-card');
  if (movieCard === null) {
    return;
  }
  // console.log(movieCard.dataset);
  return movieCard.dataset.filmid;
}

function closeModal() {
  document.body.classList.remove('no-scroll');
  refs.modal.classList.add('is-hidden');
  clearBackdropListeners();
}

function onBackdropClick(event) {
  if (!event.target.classList.contains('modal-backdrop')) {
    return;
  }
  document.body.classList.remove('no-scroll');
  refs.modal.classList.add('is-hidden');
  clearBackdropListeners();
}

function onKeyClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  document.body.classList.remove('no-scroll');
  refs.modal.classList.add('is-hidden');
  clearBackdropListeners();
}

function clearBackdropListeners() {
  window.removeEventListener('keydown', onKeyClick);
  refs.modal.removeEventListener('click', closeModal);
}

async function getCurrentMovieData(id) {
  refs.modalRef.innerHTML = '';
  refs.modal.dataset.filmid = id;
  // const movieCard = e.target.closest('.movie-card');
  // const movieTitle = movieCard.querySelector('.movie-title').textContent;
  // console.log(e.target.closest('.movie-card'));
  // console.log(e);

  try {
    // theMovieAPI.movieId = await theMovieAPI.getMovieID(movieTitle);
    const result = await theMovieAPI.fetchOneFilm(id);
    
    createModalMarkup(result.data);
  } catch (error) {
    console.log(error);
  }
}

function createModalMarkup(movie) {
  const {
    poster_path,
    original_title,
    title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
  } = movie;

  const BASE_URL_FOR_IMAGES = 'https://image.tmdb.org/t/p/w500';

  const markup = `<div class="modal__poster">
        <img
          class="modal__poster-img"
          src="${BASE_URL_FOR_IMAGES}${
    poster_path ? poster_path : '/rBxo92GmbsQbinrbJOFnmiKuMXj.jpg'
  }"
          alt="${original_title}"
        />
      </div>
      <div class="modal__description">
        <h2 class="modal__title">${title}</h2>
        <ul class="modal__info">
          <li class="modal__info-item">
            <div class="modal__characteristic">Vote / Votes</div>
            <div class="modal__value votes">
              <span class="modal__grade-accent">${vote_average.toFixed(
                1
              )}</span> /
              <span class="modal__grade-usual">${vote_count}</span>
            </div>
          </li>
          <li class="modal__info-item">
            Popularity<span class="modal__value popularity">${popularity.toFixed(
              1
            )}</span>
          </li>
          <li class="modal__info-item">
            <div class="modal__characteristic">Original Title</div>
            <div class="modal__value original">${original_title}</div>
          </li>
          <li class="modal__info-item">
            <div class="modal__characteristic">Genre</div>
            <div class="modal__value genre">${genres[0].name}</div>
          </li>
        </ul>
        <h3 class="modal__about">About</h3>
        <p class="modal__about-description">
          ${overview}
        </p>
        <div class="modal__buttons">
          <button class="btn-accent btn" type="button">Add to watched</button>
          <button class="btn-usual btn" type="button">Add to queue</button>          
        </div>
      </div>
    </div>`;

  refs.modalRef.innerHTML = markup;
}

/*import TheMovieAPI from './movies-api';

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
*/
