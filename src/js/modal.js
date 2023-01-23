import TheMovieAPI from './movies-api';

const theMovieAPI = new TheMovieAPI();

const refs = {
  openModal: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  container: document.querySelector('.gallery'),
  modalRef: document.querySelector('.modal-wrap'),
  btnWatchedRef: document.querySelector('.js-watched-btn'),
  btnQueueRef: document.querySelector('.js-queue-btn'),
};

const WATCHED_KEY = 'watched';
const QUEUE_KEY = 'queue';

let watchedStorage = JSON.parse(localStorage.getItem(WATCHED_KEY)) || null;
let queueStorage = JSON.parse(localStorage.getItem(QUEUE_KEY)) || null;

refs.btnWatchedRef.addEventListener('click', onBtnWatchedClick);
refs.btnQueueRef.addEventListener('click', onBtnQueueClick);

function onBtnWatchedClick() {
  if (localStorage.getItem(WATCHED_KEY) === null) {
    watchedStorage = [];
  } else {
    watchedStorage = JSON.parse(localStorage.getItem(WATCHED_KEY));
  }
  if (watchedStorage.includes(theMovieAPI.movieId)) {
    const removeIdx = watchedStorage.indexOf(theMovieAPI.movieId);
    watchedStorage.splice(removeIdx, 1);
    refs.btnWatchedRef.textContent = 'Add to watched';
  } else {
    watchedStorage.push(theMovieAPI.movieId);
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
  if (queueStorage.includes(theMovieAPI.movieId)) {
    const removeIdx = queueStorage.indexOf(theMovieAPI.movieId);
    queueStorage.splice(removeIdx, 1);
    refs.btnQueueRef.textContent = 'Add to queue';
  } else {
    queueStorage.push(theMovieAPI.movieId);
    refs.btnQueueRef.textContent = 'Remove from queue';
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(queueStorage));
}

refs.openModal.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);

function openModal(e) {
  console.log(e.target);
 const movieId = getMovieId(e.target);
 console.log(movieId);
  if (movieId !== undefined) {
    document.body.classList.add('no-scroll');
    refs.modal.classList.remove('is-hidden');

    getCurrentMovieData(movieId);
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
console.log(movieCard.dataset);
return movieCard.dataset.filmid;
}


function closeModal() {
  document.body.classList.remove('no-scroll');
  refs.modal.classList.add('is-hidden');
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
   
    // const result = await theMovieAPI.fetchOneFilm(theMovieAPI.movieId);

    if (
      watchedStorage !== null &&
      watchedStorage.includes(theMovieAPI.movieId)
    ) {
      refs.btnWatchedRef.textContent = 'Remove from watched';
    } else {
      refs.btnWatchedRef.textContent = 'Add to watched';
    }

    if (queueStorage !== null && queueStorage.includes(theMovieAPI.movieId)) {
      refs.btnQueueRef.textContent = 'Remove from queue';
    } else {
      refs.btnQueueRef.textContent = 'Add to queue';
    }

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
