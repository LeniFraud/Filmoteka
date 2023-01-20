import TheMovieAPI from './movies-api';


const container = document.querySelector('.gallery');
const theMovieAPI = new TheMovieAPI();

async function getData() {
    try{
        const movieInfo = await theMovieAPI.fetchTrendingFilms();
        const genres = await theMovieAPI.getGenres();
        movieInfo.results.forEach(film => {
            film.genre_names = film.genre_ids.map(filmId => genres.find(({id}) => id === filmId)).map(({name}) => name);
        })        
        container.innerHTML = createMarkup(movieInfo.results);
        
    }
    catch(error){
        console.log(error);
    }
}
getData();

 function createMarkup(array) {
    const BASE_URL_FOR_IMAGES = 'https://image.tmdb.org/t/p/w500';
    return array.map(el => 
`<div class = "movie-card">
<div class="movie-image-container">
         <img class="movie-image" src="${BASE_URL_FOR_IMAGES}${el.poster_path}" alt="${el.original_title} poster" /> 
         </div>
         <h1 class= "movie-title">${el. original_title}</h1>
    <div class="movie-info">   
     ${makeGenresList (el)}
    <span class = "movie-line"> | </span>
    <span class = "movie-year"> ${el.release_date.slice(0,4)} </span>
    <span class="movie-rate"> ${el.vote_average.toFixed(1)} 
    </div>
</div>
`).join('')
};


function makeGenresList (el) {
    return  `<div>${el.genre_names.length > 2 ? `<span class ="movie-genre">${el.genre_names[0]}, 
    </span>` + `<span class="movie-genre">${el.genre_names[1]}, </span>` +
        `<span class="movie-other">Other </span>` : el.genre_names[0]}
    </div>`
}
