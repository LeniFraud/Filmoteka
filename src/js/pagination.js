import Pagination from 'tui-pagination';
import { getData, theMovieAPI } from './movies-markup';
import { createMarkup } from './cards-markup';

const pagination = document.getElementById('tui-pagination-container');
const container = document.querySelector('.gallery');

export const options = {
  totalItems: 20000,
  page: 1,
  itemsPerPage: 20,
  visiblePages: 5,
};
export const instance = new Pagination(pagination, options);
instance.on('afterMove', changePage);

function makePagination({ total_results: totalItems }) {
  options.totalItems = totalItems;
  instance.setTotalItems(totalItems);
  pagination.classList.remove('visually-hidden');
}

theMovieAPI
  .fetchTrendingFilms()
  .then(makePagination)
  .catch(err => console.error(err));

//onclick event (render new page)
async function changePage(eventData) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  options.page = eventData.page;
  theMovieAPI.page = eventData.page;

  if (theMovieAPI.inputValue !== null) {
    return await renderFilmsPage();
  }

  return await getData();
}

async function renderFilmsPage() {
  try {
    const movieInfo = await theMovieAPI.fetchSearchFilms();
    const genres = await theMovieAPI.getGenres();
    movieInfo.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });
    container.innerHTML = createMarkup(movieInfo.results);

    return movieInfo;
  } catch (error) {
    console.log(error);
  }
}
