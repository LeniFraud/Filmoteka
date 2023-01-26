import TheMovieAPI from './movies-api';

const theMovieAPI = new TheMovieAPI();

const refs = {
  openModal: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  container: document.querySelector('.gallery'),
  modalRef: document.querySelector('.modal-wrap'),
  modalMovieInfo: document.querySelector('.modal-movie-info'),
  btnWatchedRef: document.querySelector('.js-watched-btn'),
  btnQueueRef: document.querySelector('.js-queue-btn'),
  modalLoader: document.querySelector('.modal-loader'),
};

const WATCHED_KEY = 'watched';
const QUEUE_KEY = 'queue';

let watchedStorage = JSON.parse(localStorage.getItem(WATCHED_KEY)) || null;
let queueStorage = JSON.parse(localStorage.getItem(QUEUE_KEY)) || null;

let movieId;

refs.btnWatchedRef.addEventListener('click', onBtnWatchedClick);
refs.btnQueueRef.addEventListener('click', onBtnQueueClick);

refs.openModal.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);

function openModal(e) {
  if (e.target.closest('.movie-card')?.dataset?.filmid === undefined) {
    return;
  }
  movieId = Number(getMovieId(e.target));
  if (movieId !== undefined) {
    document.body.classList.add('no-scroll');
    refs.modal.classList.remove('is-hidden');
    getCurrentMovieData(movieId);
    refs.modal.addEventListener('click', onBackdropClick);
    window.addEventListener('keydown', onKeyClick);
  }
}

export function getMovieId(target) {
  if (target.classList.contains('movie-card')) {
    return target.dataset.filmid;
  }

  const movieCard = target.closest('.movie-card');
  if (movieCard === null) {
    return;
  }
  return movieCard.dataset.filmid;
}

export function closeModal() {
  document.body.classList.remove('no-scroll');
  refs.modal.classList.add('is-hidden');
  clearBackdropListeners();
  refs.modalRef.firstElementChild.remove();
  refs.modalMovieInfo.firstElementChild.remove();
}

function onBackdropClick(event) {
  if (!event.target.classList.contains('modal-backdrop')) {
    return;
  }
  closeModal();
}

function onKeyClick(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeModal();
}

function clearBackdropListeners() {
  window.removeEventListener('keydown', onKeyClick);
  refs.modal.removeEventListener('click', closeModal);
}

async function getCurrentMovieData(id) {
  refs.modal.dataset.filmid = id;
  // const movieCard = e.target.closest('.movie-card');
  // const movieTitle = movieCard.querySelector('.movie-title').textContent;
  // console.log(e.target.closest('.movie-card'));
  // console.log(e);

  try {
    // theMovieAPI.movieId = await theMovieAPI.getMovieID(movieTitle);
    refs.modalMovieInfo.style.height = '400px';
    refs.modalMovieInfo.style.justifyContent = 'flex-end';
    refs.modalLoader.style.display = 'block';
    const result = await theMovieAPI.fetchOneFilm(id);

    // const result = await theMovieAPI.fetchOneFilm(theMovieAPI.movieId);

    if (watchedStorage !== null && watchedStorage.includes(movieId)) {
      refs.btnWatchedRef.textContent = 'Remove from watched';
    } else {
      refs.btnWatchedRef.textContent = 'Add to watched';
    }

    if (queueStorage !== null && queueStorage.includes(movieId)) {
      refs.btnQueueRef.textContent = 'Remove from queue';
    } else {
      refs.btnQueueRef.textContent = 'Add to queue';
    }

    createModalMarkup(result.data);
  } catch (error) {
    console.log(error);
  } finally {
    refs.modalMovieInfo.style.height = 'auto';
    refs.modalMovieInfo.style.justifyContent = 'unset';
    refs.modalLoader.style.display = 'none';
  }
}

function onBtnWatchedClick() {
  if (localStorage.getItem(WATCHED_KEY) === null) {
    watchedStorage = [];
  } else {
    watchedStorage = JSON.parse(localStorage.getItem(WATCHED_KEY));
  }
  if (watchedStorage.includes(movieId)) {
    const removeIdx = watchedStorage.indexOf(movieId);
    watchedStorage.splice(removeIdx, 1);
    refs.btnWatchedRef.textContent = 'Add to watched';
  } else {
    watchedStorage.push(movieId);
    refs.btnWatchedRef.textContent = 'Remove from watched';
  }
  localStorage.setItem(WATCHED_KEY, JSON.stringify(watchedStorage));
}

function onBtnQueueClick() {
  if (localStorage.getItem(QUEUE_KEY) === null) {
    queueStorage = [];
  } else {
    queueStorage = JSON.parse(localStorage.getItem(QUEUE_KEY));
  }
  if (queueStorage.includes(movieId)) {
    const removeIdx = queueStorage.indexOf(movieId);
    queueStorage.splice(removeIdx, 1);
    refs.btnQueueRef.textContent = 'Add to queue';
  } else {
    queueStorage.push(movieId);
    refs.btnQueueRef.textContent = 'Remove from queue';
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queueStorage));
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

  const posterMarkup = `<div class="modal__poster">
        <img
          class="modal__poster-img" loading="lazy"
          src="${checkMoviePoster(BASE_URL_FOR_IMAGES, poster_path)}"
          alt="${original_title}"
        />
      </div>`;

  const movieInfoMarkup = `
      <div class="modal__description">
        <h2 class="modal__title">${title}</h2>
        <ul class="modal__info">
          <li class="modal__info-item">
            <div class="modal__characteristic">Vote / Votes</div>
            <div class="modal__value">
              <span class="modal__grade-accent">${vote_average.toFixed(
                1
              )}</span> /
              <span class="modal__grade-usual">${vote_count}</span>
            </div>
          </li>
          <li class="modal__info-item">
          <div class="modal__characteristic">Popularity</div>
          <div class="modal__value">
              <span class="modal__value">${popularity.toFixed(1)}</span>
            </div>
          </li>
          <li class="modal__info-item">
            <div class="modal__characteristic">Original Title</div>
            <div class="modal__value original">${original_title}</div>
          </li>
          <li class="modal__info-item">
            <div class="modal__characteristic">Genre</div>
            <div class="modal__value">${genres[0]?.name || 'No genres'}</div>
          </li>
        </ul>
        <h3 class="modal__about">About</h3>
        <p class="modal__about-description">
          ${overview}
        </p>
      </div>
    </div>`;

  refs.modalRef.insertAdjacentHTML('afterbegin', posterMarkup);
  refs.modalMovieInfo.insertAdjacentHTML('afterbegin', movieInfoMarkup);
}

function checkMoviePoster(baseUrl, posterUrl) {
  if (posterUrl === null) {
    // return 'https://via.placeholder.com/350x500?text=No+Poster';
    return 'https://dummyimage.com/350x500/ccc/fff.jpg&text=No+poster';
  }
  return baseUrl + posterUrl;
}
