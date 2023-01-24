import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import { getData, theMovieAPI } from './movies-markup';
import { createMarkup } from './cards-markup';

const pagination = document.getElementById('tui-pagination-container');
const container = document.querySelector('.gallery');

pagination.addEventListener('click', changePage);

export const options = {
  totalItems: 20000,
  page: 1,
  itemsPerPage: 20,
  visiblePages: 5,
};
export const instance = new Pagination(pagination, options);

function makePagination({ total_results: totalItems }) {
  options.totalItems = totalItems;
  instance.setTotalItems(totalItems);
}

theMovieAPI
  .fetchTrendingFilms()
  .then(makePagination)
  .catch(err => console.error(err));

//onclick event (render new page)
async function changePage(e) {
  const el = e.target;

  if (!el.classList.contains('tui-page-btn')) {
    return;
  }

  if (Number(el.innerHTML)) {
    options.page = Number(el.innerHTML);
  } else {
    if (el.classList.contains('tui-next-is-ellip')) {
      options.page += 5;
    }
    if (el.classList.contains('tui-prev-is-ellip')) {
      options.page -= 5;
    }
    if (el.innerText === 'first') {
      options.page = 1;
    }
    if (el.innerText === 'last') {
      options.page = Math.ceil(options.totalItems / options.itemsPerPage);
    }
    if (el.innerText === 'next') {
      options.page += 1;
    }
    if (el.innerText === 'prev') {
      options.page -= 1;
    }
  }

  theMovieAPI.page = options.page;

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
