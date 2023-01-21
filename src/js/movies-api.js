'use strict';

import axios from 'axios';
import Notiflix from 'notiflix';

export default class TheMovieAPI {
  static BASE_URL = 'https://api.themoviedb.org/3/';
  static API_KEY = 'cf0ab519f45eea0dacef149b4aa4a796';
  static TRENDING_URL = 'trending/movie/week';
  static SEARCH = `search/movie`;
  static GENRES_LIST = `genre/movie/list`;

  constructor() {
    this.inputValue = null;
    this.page = 1;
    this.genresId = null;
    this.movieId = null;
  }

  // колекція популярних фільмів
  async fetchTrendingFilms() {
    const searchParams = {
      params: {
        api_key: TheMovieAPI.API_KEY,
        page: this.page,
      },
    };
    const response = await axios.get(
      `${TheMovieAPI.BASE_URL}${TheMovieAPI.TRENDING_URL}`,
      searchParams
    );
    return response.data;
  }

  // колекція по пошуку за ключовим словом
  async fetchSearchFilms() {
    const searchParams = {
      params: {
        api_key: TheMovieAPI.API_KEY,
        page: this.page,
        include_adult: false,
        query: this.inputValue,
      },
    };
    const response = await axios.get(
      `${TheMovieAPI.BASE_URL}${TheMovieAPI.SEARCH}`,
      searchParams
    );
    return response.data;
  }

  // отримання movieId
  // const movieID = await getMovieID('Matrix');
  // console.log(movieID);
  async getMovieID(title) {
    const searchParams = {
      params: {
        api_key: TheMovieAPI.API_KEY,
        query: title,
      },
    };
    const response = await axios.get(
      `${TheMovieAPI.BASE_URL}${TheMovieAPI.SEARCH}`,
      searchParams
    );
    if (response.data.results.length > 0) {
      return response.data.results[0].id;
    } else {
      return Notiflix.Notify.failure('No Results Found');
    }
  }

  // повна інформація про фільм
  // приклад movieId - число;
  // newApiServiсe.movieId = 94671;
  // console.log(newApiServiсe.fetchOneFilm());
  async fetchOneFilm() {
    const searchParams = {
      params: {
        api_key: TheMovieAPI.API_KEY,
      },
    };
    const response = await axios.get(
      `${TheMovieAPI.BASE_URL}movie/${this.movieId}`,
      searchParams
    );
    return response;
  }

  // трейлер до фільму
  async fetchTrailerFilm() {
    const searchParams = {
      params: {
        api_key: TheMovieAPI.API_KEY,
      },
    };
    const response = await axios.get(
      `${TheMovieAPI.BASE_URL}movie/${this.movieId}/videos`,
      searchParams
    );
    return response;
  }

  // Запит на АРІ за жанрами
  async getGenres() {
    const searchParams = {
      params: {
        api_key: TheMovieAPI.API_KEY,
      },
    };
    const response = await axios.get(
      `${TheMovieAPI.BASE_URL}${TheMovieAPI.GENRES_LIST}`,
      searchParams
    );
    return response.data.genres; // Повертає проміс із жанрами
  }

  //   повертає обєкт з масивом жанрів, масивом фильмів, total_pages, total_results
  async dataMovies() {
    const genres = await this.getGenres(); // Повертає жанри з АРІ
    let data = null;
    if (this.query) {
      data = await this.fetchSearchFilms();
    } else {
      data = await this.fetchTrendingFilms(); // Повертає масив фільмів з АРІ
    }
    const { results, total_pages, total_results } = data;
    return { genres, results, total_pages, total_results };
  }
}

// Імпортуємо
// import TheMovieAPI from './js/movies-api';

// const theMovieAPI = new TheMovieAPI();

// колекція популярних фільмів
// console.log(theMovieAPI.fetchTrendingFilms());

// колекція по ключевому слову
// theMovieAPI.inputValue = e.target.....value.trim();
// theMovieAPI.inputValue = 'avatar'
// console.log(theMovieAPI.fetchSearchFilms());

// повна інформація про фільм
// theMovieAPI.movieId = 94671;
// console.log(theMovieAPI.fetchOneFilm());

// трейлер до фільму
// theMovieAPI.movieId = 94671;
// console.log(theMovieAPI.fetchTrailerFilm());

// повертає обєкт з масивом жанрів, масивом фильмів, total_pages, total_results
// theMovieAPI.dataMovies().then(data => console.log(data));
