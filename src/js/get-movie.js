import TheMovieAPI from './movies-api';
// import { createMarkup, makeGenresList } from './cards-markup';
import { getMovieId } from './modal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'center-top',
  clickToClose: true,
  pauseOnHover: false,
  cssAnimationStyle: 'from-top',
});

const theMovieAPI = new TheMovieAPI();

const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');
const container = document.querySelector('.gallery');

async function onWatchedBtn() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  watchedBtn.disabled = true;
  queueBtn.disabled = false;

  const moviesArray = JSON.parse(localStorage.getItem('watched'));

  if (moviesArray === null || moviesArray.length === 0) {
    Notify.failure('You don`t have any watched film');
    container.innerHTML = 'Your watchlist is empty. Please add some film.';
    return
  }

  moviesArray.map(film => {
    get(film);
  });
}
onWatchedBtn();

function onWatchedBtnSubmit() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  watchedBtn.disabled = true;
  queueBtn.disabled = false;
  container.innerHTML = '';

  const moviesArray = JSON.parse(localStorage.getItem('watched'));

  if (moviesArray === null || moviesArray.length === 0) {
    Notify.failure('You don`t have any watched film');
    container.innerHTML = 'Your watchlist is empty. Please add some film.';
    return
  }

  moviesArray.map(film => {
    get(film);
  });
}

const onQueueBtnSubmit = async event => {
  event.preventDefault();
  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');
  watchedBtn.disabled = false;
  queueBtn.disabled = true;
  container.innerHTML = '';

  const moviesArray = JSON.parse(localStorage.getItem('queue'));

  if (moviesArray === null || moviesArray.length === 0) {
    Notify.failure('You don`t have any film in your queue');
    container.innerHTML = 'Your queue is empty. Please add some film.';
    return
  }

  moviesArray.map(film => {
    get(film);
  });
};

watchedBtn.addEventListener('click', onWatchedBtnSubmit);
queueBtn.addEventListener('click', onQueueBtnSubmit);

async function get(id) {
  try {
    const result = await theMovieAPI.fetchOneFilm(id);

    container.insertAdjacentHTML('beforeend', createMarkup(result.data));
  } catch (error) {
    console.log(error);
  }
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
