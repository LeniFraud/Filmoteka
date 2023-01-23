import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

import TheMovieAPI from './movies-api';
const theMovieAPI = new TheMovieAPI();

//async with no await not ok!!
async function makePagination({ total_results: totalItems, page }) {
  const options = {
    totalItems,
    page,
    itemsPerPage: 20,
    visiblePages: 5,
    centerAlign: true,
  };

  const container = document.getElementById('tui-pagination-container');
  const instance = new Pagination(container, options);
  return instance;
}
// console.log(instance.getCurrentPage());

async function getTotalItems() {
  try {
    const data = await theMovieAPI.fetchTrendingFilms();

    return data;
  } catch (err) {
    console.error(err);
  }
}

// container.addEventListener('click', changePage);

// function changePage() {
//   const page = instance.getCurrentPage();
//   theMovieAPI.page = page;
// }

getTotalItems()
  .then(data => {
    makePagination(data);
  })
  .catch(err => console.error(err));
