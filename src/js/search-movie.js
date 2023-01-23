import TheMovieAPI from './movies-api';
import { createMarkup, makeGenresList } from './cards-markup';

const searchFormEl = document.querySelector('.header__form');
const container = document.querySelector('.gallery');
const message = document.querySelector('.header__form-warning-text');

const theMovieAPI = new TheMovieAPI();

const onSearchFormSubmit = async event => {
  event.preventDefault();

  theMovieAPI.inputValue = event.target.elements.searchQuery.value
    .trim()
    .toLowerCase();
  theMovieAPI.page = 1;

  try {
    const data = await theMovieAPI.fetchSearchFilms();
    const genres = await theMovieAPI.getGenres();

    if (data.results.length === 0) {
      event.target.reset();
      message.classList.remove('visually-hidden');
      return;
    }

    data.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });

    message.classList.add('visually-hidden');
    container.innerHTML = createMarkup(data.results);
    // event.target.reset();
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
