// // import { theMovieAPI } from './movies-markup';

// const pagination = document.querySelector('.tui-pagination-container');

// const instanceLib = new Pagination(container, options);

// const watchedFilms = localStorage.getItem('watched');
// const watchedQuantity = JSON.parse(watchedFilms).length;

// function makePaginationLib() {
//   options.totalItems = watchedQuantity;
//   instanceLib.setTotalItems(watchedQuantity);

//   if (watchedQuantity > 20) {
//     pagination.classList.remove('visually-hidden');
//   }
// }

// makePaginationLib();

// console.log(JSON.parse(watchedFilms).length);
// console.log('tui-pagination-container-library');
// location.pathname === '/library.html';

import Pagination from 'tui-pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { get, watchedBtn, queueBtn } from './get-movie';

export const paginationLibrary = document.getElementById(
  'tui-pagination-container-library'
);
const container = document.querySelector('.gallery');

export function renderFirstPage(key) {
  const moviesArray = JSON.parse(localStorage.getItem(key));
  console.log(moviesArray[23]);

  if (!moviesArray) {
    key === 'watched' ? errorMessageWatched() : errorMessageQueue();
    return;
  }

  const options = {
    totalItems: moviesArray.length,
    page: 1,
    itemsPerPage: 20,
    visiblePages: 5,
  };
  const instanceLibrary = new Pagination(paginationLibrary, options);

  if (moviesArray.length > 20) {
    console.log(Math.ceil(moviesArray.length / 20));

    if (Math.ceil(moviesArray.length / 20) < 5) {
      instanceLibrary._options.visiblePages = Math.ceil(
        moviesArray.length / 20
      );
    }
    paginationLibrary.classList.remove('visually-hidden');

    const page = instanceLibrary.getCurrentPage();
    for (let i = 0; i < page * 20; i += 1) {
      get(moviesArray[i]);
    }
    return;
  } else {
    moviesArray.map(film => {
      get(film);
    });
  }
  instanceLibrary.on('afterMove', changePage);
}
paginationLibrary.addEventListener('click', changePage);
function changePage(eventData) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  // const page = eventData.page;

  // let key;
  // watchedBtn.classList.contains('active') ? (key = 'watched') : 'queue';
  // console.log(page);
  // const totalPages = Math.ceil(
  //   JSON.parse(localStorage.getItem(key)).length / 20
  // );
  // console.log(totalPages);
  // console.log(key);
  // let startItem = 0;
  // if (page !== 1 && page <= totalPages) {
  //   return (startItem = (page - 1) * 20 + 1);
  // }
  // for (let i = startItem; i < page * 20 || i < totalItems; i += 1) {
  //   get(moviesArray[i]);
  // }
  // return;
}

function errorMessageWatched(moviesArray) {
  // if (!moviesArray) {
  Notify.failure('You don`t have any watched film');
  container.innerHTML = 'Your watchlist is empty. Please add some film.';
  //   return;
  // }
}

function errorMessageQueue(moviesArray) {
  // if (!moviesArray) {
  Notify.failure('You don`t have any film in your queue');
  container.innerHTML = 'Your queue is empty. Please add some film.';
  //   return;
  // }
}

export function hidePagination(key) {
  const moviesArray = JSON.parse(localStorage.getItem(key));

  if (moviesArray.length <= 21) {
    paginationLibrary.classList.add('visually-hidden');
  }
}
