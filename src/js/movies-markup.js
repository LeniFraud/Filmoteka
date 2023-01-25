import TheMovieAPI from './movies-api';
import { createMarkup } from './cards-markup';

const container = document.querySelector('.gallery');
export const theMovieAPI = new TheMovieAPI();
const loader = document.querySelector('.loader');
const galleryContainer = document.querySelector('.movies-gallery');

export async function getData() {
  try {
    loader.style.display = 'block';
    galleryContainer.style.height = '350px';
    const movieInfo = await theMovieAPI.fetchTrendingFilms();
    const genres = await theMovieAPI.getGenres();
    movieInfo.results.forEach(film => {
      film.genre_names = film.genre_ids
        .map(filmId => genres.find(({ id }) => id === filmId))
        .map(({ name }) => name);
    });
    container.innerHTML = createMarkup(movieInfo.results);
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
    galleryContainer.style.height = 'auto';
  }
}
getData();
