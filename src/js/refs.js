export const refs = {};

/*
import TheMovieAPI from './movies-api';
import { createMarkup, makeGenresList } from './cards-markup';

const form = document.querySelector('.header__form');
const searchBtn = document.querySelector('.form__btn');
const galleryRef = document.querySelector('.gallery');
const {
  elements: { searchQuery },
} = form;
const theMovieAPI = new TheMovieAPI();

searchBtn.addEventListener('click', onSearchBtnClick);

async function onSearchBtnClick(e) {
  e.preventDefault();

  if (theMovieAPI.inputValue === searchQuery.value) {
    return;
  }

  searchBtn.disabled = true;

  theMovieAPI.inputValue = searchQuery.value;
  theMovieAPI.page = 1;

  try {
    const response = await theMovieAPI.fetchSearchFilms();
    const genres = await theMovieAPI.getGenres();
    response.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });

    // if (response.results.length === 0) {
    //   alertFailureOnFindingImages();
    //
    //   galleryRef.innerHTML = '';
    //   return;
    // }
    // тут треба почистити інпут через ресет - ще не доробила

    galleryRef.innerHTML = createMarkup(response.results);
  } catch (error) {
    console.log(error);
  } finally {
    searchBtn.disabled = false;
  }
}
*/
