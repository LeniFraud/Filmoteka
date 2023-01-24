//! make the same instance of API class for search and trending instead of making new insance of class
//! import pagination instance and sesttings of it (in options)
import { theMovieAPI } from './movies-markup';
import { instance, options } from './pagination';

import TheMovieAPI from './movies-api';
import { createMarkup, makeGenresList } from './cards-markup';

const searchFormEl = document.querySelector('.header__form');
const container = document.querySelector('.gallery');
const message = document.querySelector('.header__form-warning-text');

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

    event.target.reset();

    //! move pagination instance from selected =>to the first page on the new search
    instance.movePageTo(1);
    options.page = 1;

    //!change totalItems quantity
    instance.setTotalItems(data.total_results);
    options.totalItems = data.total_results;
  } catch (err) {
    console.log(err);
  }
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);
