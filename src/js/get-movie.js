import TheMovieAPI from './movies-api';
// import { createMarkup, makeGenresList } from './cards-markup';
import { getMovieId } from './modal';

const theMovieAPI = new TheMovieAPI();

const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');
const container = document.querySelector('.gallery');

// container.innerHTML = 'hello';

watchedBtn.addEventListener('click', onWatchedBtnSubmit);
// queueBtn.addEventListener('click', onQueueBtnSubmit);

function onWatchedBtnSubmit() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');
  queueBtn.disabled = true;

  const moviesArray = JSON.parse(localStorage.getItem('watched'));

  moviesArray.map(film => {
    get(film);
  });

  console.log(moviesArray);
}

async function get(id) {
  try {
    const result = await theMovieAPI.fetchOneFilm(id);

    console.log(result.data);
    // container.innerHTML = createMarkup(result.data);
    container.insertAdjacentHTML('beforeend', createMarkup(result.data));
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(movie) {
  const BASE_URL_FOR_IMAGES = 'https://image.tmdb.org/t/p/w500';
  const { id, poster_path, original_title, release_date, vote_average } = movie;
  return `<div class = "movie-card" data-filmId = ${id}>
        <div class="movie-image-container">
         <img class="movie-image" src="${checkMoviePoster(
           BASE_URL_FOR_IMAGES,
           poster_path
         )}" alt="${original_title} poster" />
         </div>
         <h1 class= "movie-title">${original_title}</h1>
    <div class="movie-info">

    <span class = "movie-line"> | </span>
    <span class = "movie-year"> ${release_date.slice(0, 4)} </span>
    <span class="movie-rate"> ${vote_average.toFixed(1)}
    </div>
</div>
`;
}

// ${makeGenresList(movie)}
// function makeGenresList(el) {
//   const {} = movie;
//   return `<div>${
//     el.genre_names.length > 2
//       ? `<span class ="movie-genre">${el.genre_names[0]},
//     </span>` +
//         `<span class="movie-genre">${el.genre_names[1]}, </span>` +
//         `<span class="movie-other">Other </span>`
//       : el.genre_names[0]
//   }
//     </div>`;
// }

function checkMoviePoster(baseUrl, posterUrl) {
  if (posterUrl === null) {
    return 'https://via.placeholder.com/350x500?text=No+Poster';
  }
  return baseUrl + posterUrl;
}

/*

// const onContactFormFieldWached = async event => {
//   const movieInfo = await theMovieAPI.fetchTrendingFilms();

//   localStorage.setItem('wached', JSON.stringify(movieInfo));
// };

// onContactFormFieldWached();

// const onContactFormFieldQueue = async event => {
//   const movieInfo = await theMovieAPI.fetchTrendingFilms();

//   localStorage.setItem('queue', JSON.stringify(movieInfo));
// };

// onContactFormFieldQueue();

async function onWatchedBtn() {
  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');

  try {
    const movieInfo = JSON.parse(localStorage.getItem('watched'));
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

onWatchedBtn();

const onWatchedBtnSubmit = async event => {
  event.preventDefault();

  watchedBtn.classList.add('active');
  queueBtn.classList.remove('active');

  // try {
  //   const movieInfo = JSON.parse(localStorage.getItem('wached'));
  //   const genres = await theMovieAPI.getGenres();
  //   movieInfo.results.forEach(film => {
  //     film.genre_names = film.genre_ids
  //       .map(filmId => genres.find(({ id }) => id === filmId))
  //       .map(({ name }) => name);
  //   });

  //   console.log('Submit Wached');
  //   container.innerHTML = createMarkup(movieInfo.results);
  // } catch (error) {
  //   console.log(error);
  // }
};

const onQueueBtnSubmit = async event => {
  event.preventDefault();

  queueBtn.classList.add('active');
  watchedBtn.classList.remove('active');

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

watchedBtn.addEventListener('click', onWatchedBtnSubmit);
queueBtn.addEventListener('click', onQueueBtnSubmit);
*/
