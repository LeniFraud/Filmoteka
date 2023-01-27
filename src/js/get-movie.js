import TheMovieAPI from './movies-api';
import { makeGenresList } from './cards-markup';
import { getMovieId } from './modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { closeModal } from './modal';
import { hidePagination, renderFirstPage } from './pagination-library';

Notify.init({
  position: 'center-top',
  clickToClose: true,
  pauseOnHover: false,
  cssAnimationStyle: 'from-top',
});

const theMovieAPI = new TheMovieAPI();

export const watchedBtn = document.querySelector('.watched');
export const queueBtn = document.querySelector('.queue');
const container = document.querySelector('.gallery');
const removeWatchedBtnRef = document.querySelector('.js-watched-btn');
const removeQueueBtnRef = document.querySelector('.js-queue-btn');
const loaderRef = document.querySelector('.loader');
const galleryContainerRef = document.querySelector('.movies-gallery');

async function onWatchedBtn() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  watchedBtn.disabled = true;
  queueBtn.disabled = false;

  const key = 'watched';
  renderFirstPage(key);
}
onWatchedBtn();

function onWatchedBtnSubmit() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  watchedBtn.disabled = true;
  queueBtn.disabled = false;
  container.innerHTML = '';

  const key = 'watched';
  renderFirstPage(key);
}

const onQueueBtnSubmit = async event => {
  event.preventDefault();
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');
  watchedBtn.disabled = false;
  queueBtn.disabled = true;
  container.innerHTML = '';

  const key = 'queue';
  renderFirstPage(key);
};

watchedBtn.addEventListener('click', onWatchedBtnSubmit);
queueBtn.addEventListener('click', onQueueBtnSubmit);

removeWatchedBtnRef.addEventListener('click', onRemoveWatchedBtnClick);
removeQueueBtnRef.addEventListener('click', onRemoveQueueBtnClick);

async function onRemoveWatchedBtnClick(e) {
  if (watchedBtn.disabled !== true) {
    return;
  }
  const currentId = e.target.closest('.modal-backdrop').dataset.filmid;
  const currentCard = document.querySelector(`[data-filmid="${currentId}"]`);
  currentCard.remove();
  closeModal();

  const key = 'watched';
  hidePagination(key);
}

function onRemoveQueueBtnClick(e) {
  if (queueBtn.disabled !== true) {
    return;
  }
  const currentId = e.target.closest('.modal-backdrop').dataset.filmid;
  const currentCard = document.querySelector(`[data-filmid="${currentId}"]`);
  currentCard.remove();
  closeModal();

  const key = 'queue';
  hidePagination(key);
}

export async function get(id) {
  try {
    // console.log(id);
    loaderRef.style.display = 'block';
    galleryContainerRef.style.height = '350px';
    const result = await theMovieAPI.fetchOneFilm(id);
    // console.log(result.data);
    container.insertAdjacentHTML('beforeend', createMarkup(result.data));
  } catch (error) {
    console.log(error);
  } finally {
    loaderRef.style.display = 'none';
    galleryContainerRef.style.height = 'auto';
  }
}

function prepareGenres(genres) {
  return genres.map(({ name }) => name);
}

function createMarkup(movie) {
  const BASE_URL_FOR_IMAGES = 'https://image.tmdb.org/t/p/w500';
  const { id, poster_path, original_title, release_date, vote_average } = movie;
  return `<div class = "movie-card" data-filmId = ${id}>
        <div class="movie-image-container">
         <img class="movie-image" src="${checkMoviePoster(
           BASE_URL_FOR_IMAGES,
           poster_path
         )}" alt="${original_title} poster" />
         </div>
         <h1 class= "movie-title">${original_title}</h1>
    <div class="movie-info">
    ${makeGenresList(prepareGenres(movie.genres))}
    <span class = "movie-line"> | </span>
    <span class = "movie-year"> ${release_date.slice(0, 4)} </span>
    <span class="movie-rate"> ${vote_average.toFixed(1)}
    </div>
</div>
`;
}

function checkMoviePoster(baseUrl, posterUrl) {
  if (posterUrl === null) {
    return 'https://via.placeholder.com/350x500?text=No+Poster';
  }
  return baseUrl + posterUrl;
}
