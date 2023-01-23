import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';
import {getData, theMovieAPI} from './movies-markup';
import { theMovieAPI as theMovieAPISearch} from './search-movie';


const pagination = document.getElementById('tui-pagination-container');
// const searchFormEl = document.querySelector('.header__form');

pagination.addEventListener('click', changePage);
// searchFormEl.addEventListener('submit', getTotalItemsOnSearch);

const options = {
  totalItems: 0,
  page: 1,
  itemsPerPage: 20,
  visiblePages: 5,
  typeOfSearch: 'trending',
};

function makePagination({ total_results: totalItems}) {
options.totalItems = totalItems;

  const instance = new Pagination(pagination, options);
  return instance;
}

async function getTotalItems() {
  try {
    return await theMovieAPI.fetchTrendingFilms();
  } 
}

getTotalItems()
  .then(makePagination)
  .catch(err => console.error(err));

// async function getTotalItemsOnSearch() {
//   try {
//     options.typeOfSearch === 'search'
//       return await theMovieAPISearch.fetchSearchFilms();
//   }
// }


async function changePage(e) {
  const el = e.target;

  if (!el.classList.contains('tui-page-btn')) {
    return;
  }

  if(Number(el.innerHTML)) {
    options.page = Number(el.innerHTML);
  }

  else {
    if(el.classList.contains('tui-next-is-ellip')){
      options.page +=5;
    }
    if(el.classList.contains('tui-prev-is-ellip')){
      options.page -=5;
    }
    if (el.innerText === 'first') {
      options.page = 1;
    }
    if(el.innerText === 'last') {
      options.page = Math.ceil(options.totalItems / options.itemsPerPage);
    }
    if(el.innerText === "next") {
      options.page += 1;
    }
    if(el.innerText === "prev") {
      options.page -= 1;
    }
  }
 
  theMovieAPI.page = options.page;
  console.log(theMovieAPI.page);
  // if (options.typeOfSearch === 'trending') {
    return await getData();
  // }
  // else {
  //   return await renderFilms();
  // }
}

// async function renderFilms() {
//   try {
//     const movieInfo = await theMovieAPI.fetchSearchFilms();
//     const genres = await theMovieAPI.getGenres();
//     movieInfo.results.forEach(film => {
//       film.genre_names = film.genre_ids
//         .map(filmId => genres.find(({ id }) => id === filmId))
//         .map(({ name }) => name);
//     });
//     container.innerHTML = createMarkup(movieInfo.results);
//   } catch (error) {
//     console.log(error);
//   }
// }
