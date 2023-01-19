import TheMovieAPI from './movies-api';


const container = document.querySelector('.gallery');
const theMovieAPI = new TheMovieAPI();

// async function  getMovieInfo() {
//     try{
//         const movieInfo = await theMovieAPI.fetchTrendingFilms();
//         console.log(movieInfo)
       

//     }
//     catch(error) {
//         console.error(error);
//     }
// }

// async function getGenres() {
//     try{
//         const genres = await theMovieAPI.getGenres();
//         console.log(genres)
//     }
//     catch (error){
//         console.error(error);
//     }
// }
// getMovieInfo();
// getGenres();

async function getData() {
    try{
        const movieInfo = await theMovieAPI.fetchTrendingFilms();
        const genres = await theMovieAPI.getGenres();
        console.log(genres);
        console.log(movieInfo.results);
        movieInfo.results.forEach(film => {
            // чи краще створити окремий ключ?
            film.genre_ids = film.genre_ids.map(filmId => genres.find(({id}) => id === filmId))
            // console.log(film.genre_ids);
        })
        
        
        container.innerHTML = createMarkup(movieInfo.results);
        
    }
    catch(error){
        console.log(error);
    }
}
getData()




 function createMarkup(array) {
    return array.map(el => 
`<div class = "movie-card"
         <img class="movie-image" src="${el.poster_path}" alt="${el.original_title} poster" loading="lazy" /> 
         <h1 class= "movie-title">${el.original_title}</h1>
    <div class="movie-info">
    <span class = "movie-line"> | </span>
    <span class = "movie-year"> ${el.release_date}</span>
    <span class="movie-rate"> ${Math.ceil(el.vote_average)} 
    </div>
</div>
`).join('')

};

