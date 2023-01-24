//! make the same instance of API class for search and trending instead of making new insance of class
//! import pagination instance and sesttings of it (in options)
import { theMovieAPI } from './movies-markup';
import { instance, options } from './pagination';

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

function createMarkup(array) {
  const BASE_URL_FOR_IMAGES = 'https://image.tmdb.org/t/p/w500';
  return array
    .map(
      el =>
        `<div class = "movie-card">
<div class="movie-image-container">
         <img class="movie-image" src="${BASE_URL_FOR_IMAGES}${
          el.poster_path
        }" alt="${el.original_title} poster" />
         </div>
         <h1 class= "movie-title">${el.original_title}</h1>
    <div class="movie-info">
     ${makeGenresList(el)}
    <span class = "movie-line"> | </span>
    <span class = "movie-year"> ${el.release_date.slice(0, 4)} </span>
    <span class="movie-rate"> ${el.vote_average.toFixed(1)}
    </div>
</div>
`
    )
    .join('');
}
function makeGenresList(el) {
  return `<div>${
    el.genre_names.length > 2
      ? `<span class ="movie-genre">${el.genre_names[0]},
    </span>` +
        `<span class="movie-genre">${el.genre_names[1]}, </span>` +
        `<span class="movie-other">Other </span>`
      : el.genre_names[0]
  }
    </div>`;
}
