// export const refs = {};

/*
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
  if (e.target !== refs.container) {
    document.body.classList.add('no-scroll');
    refs.modal.classList.remove('is-hidden');

    getCurrentMovieData(e);
  }
}

function closeModal() {
  document.body.classList.remove('no-scroll');
  refs.modal.classList.add('is-hidden');
}

async function getCurrentMovieData(e) {
  refs.modalRef.innerHTML = '';
  const movieCard = e.target.closest('.movie-card');
  const movieTitle = movieCard.querySelector('.movie-title').textContent;

  try {
    theMovieAPI.movieId = await theMovieAPI.getMovieID(movieTitle);
    const result = await theMovieAPI.fetchOneFilm(theMovieAPI.movieId);

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
*/

/*
import TheMovieAPI from './movies-api';
import { createMarkup, makeGenresList } from './cards-markup';

const form = document.querySelector('.header__form');
const searchBtn = document.querySelector('.form__btn');
const galleryRef = document.querySelector('.gallery');
const {
  elements: { searchQuery },
} = form;
const theMovieAPI = new TheMovieAPI();

searchBtn.addEventListener('click', onSearchBtnClick);

async function onSearchBtnClick(e) {
  e.preventDefault();

  if (theMovieAPI.inputValue === searchQuery.value) {
    return;
  }

  searchBtn.disabled = true;

  theMovieAPI.inputValue = searchQuery.value;
  theMovieAPI.page = 1;

  try {
    const response = await theMovieAPI.fetchSearchFilms();
    const genres = await theMovieAPI.getGenres();
    response.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });

    // if (response.results.length === 0) {
    //   alertFailureOnFindingImages();
    //
    //   galleryRef.innerHTML = '';
    //   return;
    // }
    // тут треба почистити інпут через ресет - ще не доробила

    galleryRef.innerHTML = createMarkup(response.results);
  } catch (error) {
    console.log(error);
  } finally {
    searchBtn.disabled = false;
  }
}
*/
