import Pagination from 'tui-pagination';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { get, watchedBtn, queueBtn } from './get-movie';

export const paginationLibrary = document.getElementById(
  'tui-pagination-container-library'
);
const container = document.querySelector('.gallery');

export function renderFirstPage(key) {
  const moviesArray = JSON.parse(localStorage.getItem(key));
  // console.log(moviesArray[23]);

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
    // console.log(Math.ceil(moviesArray.length / 20));


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

    instanceLibrary.on('afterMove', changePage);

    return;
  } else {
    moviesArray.map(film => {
      get(film);
    });
  }

}

function changePage(eventData) {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  const page = eventData.page;
  console.log(page);

  container.innerHTML = '';
  let key;
  watchedBtn.classList.contains('active') ? (key = 'watched') : (key = 'queue');
  const moviesArray = JSON.parse(localStorage.getItem(key));

  const totalPages = Math.ceil(moviesArray.length / 20);

  let startItem = (page - 1) * 20;

  // }
  for (let i = startItem; i < page * 20 && i < moviesArray.length; i += 1) {
    get(moviesArray[i]);
    console.log(moviesArray[i]);
  }
  return;

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
