import TheMovieAPI from './movies-api';
import { createMarkup, makeGenresList } from './cards-markup';

const theMovieAPI = new TheMovieAPI();

const wachedBtn = document.querySelector('.wached');
const queueBtn = document.querySelector('.queue');
const container = document.querySelector('.gallery');

const onContactFormFieldWached = async event => {
  const movieInfo = await theMovieAPI.fetchTrendingFilms();

  localStorage.setItem('wached', JSON.stringify(movieInfo));
};

onContactFormFieldWached();

const onContactFormFieldQueue = async event => {
  const movieInfo = await theMovieAPI.fetchTrendingFilms();

  localStorage.setItem('queue', JSON.stringify(movieInfo));
};

onContactFormFieldQueue();

async function onWachedBtn() {
  wachedBtn.classList.add('active');
  queueBtn.classList.remove('active');

  try {
    const movieInfo = JSON.parse(localStorage.getItem('wached'));
    const genres = await theMovieAPI.getGenres();
    movieInfo.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });
    container.innerHTML = createMarkup(movieInfo.results);
  } catch (error) {
    console.log(error);
  }
}

onWachedBtn();

const onWachedBtnSubmit = async event => {
  event.preventDefault();

  wachedBtn.classList.add('active');
  queueBtn.classList.remove('active');

  try {
    const movieInfo = JSON.parse(localStorage.getItem('wached'));
    const genres = await theMovieAPI.getGenres();
    movieInfo.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });

    console.log('Submit Wached')
    container.innerHTML = createMarkup(movieInfo.results);

  } catch (error) {
    console.log(error);
  }
};

const onQueueBtnSubmit = async event => {
  event.preventDefault();

  queueBtn.classList.add('active');
  wachedBtn.classList.remove('active');

  try {
    const movieInfo = JSON.parse(localStorage.getItem('queue'));
    const genres = await theMovieAPI.getGenres();
    movieInfo.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });
    // container.innerHTML = "createMarkup(movieInfo.results)";
    container.innerHTML = ' ';
  } catch (error) {
    console.log(error);
  }
};

wachedBtn.addEventListener('click', onWachedBtnSubmit);
queueBtn.addEventListener('click', onQueueBtnSubmit);
