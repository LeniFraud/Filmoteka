'use strict';

import axios from 'axios';

export default class TheMovieAPI {

    static BASE_URL = 'https://api.themoviedb.org/3';
    static API_KEY = 'cf0ab519f45eea0dacef149b4aa4a796';

    constructor() {
        this.query = null;
        this.page = 1;
        this.options = {
            key: TheMovieAPI.API_KEY,
            page: this.page,
        };
    }

    async fetchMovies() {
        const searchParams = {
            params: {
                api_key: TheMovieAPI.API_KEY,
                page: this.page,
            }
        };

        const url = await axios.get(`${TheMovieAPI.BASE_URL}/trending/movie/day`, searchParams);

        return await axios
            .get(url, this.options)
            .then(resp => {
                this.page += 1;
                console.log('resp.data', resp.data);
                return resp.data;
            })
            .catch(error => console.log(error));
    }

    async fetchArticlesSearch(page) {
        localStorage.setItem('name', this.query);
        const url = `${TheMovieAPI.BASE_URL}/search/movie?api_key=${this.options.key}&query=${this.query}&page=${this.page}`;
        const first = await axios.get(url, this.options);
        return first.data;
    }

    async getMovieById(movieId) {
        try {
            const resp = await axios
                .get(
                    `${BASE_URL}/movie/${movieId}?api_key=${this.options.key}`
                );
            this.page += 1;
            return resp.data;
        } catch (error) {
            return console.log(error);
        }
    }

}