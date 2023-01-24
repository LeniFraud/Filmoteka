export { createMarkup, makeGenresList };

function createMarkup(array) {
  const BASE_URL_FOR_IMAGES = 'https://image.tmdb.org/t/p/w500';
  return array
    .map(
      el =>
        `<div class = "movie-card" data-filmId = ${el.id}>
        <div class="movie-image-container">
         <img class="movie-image" src="${checkMoviePoster(
           BASE_URL_FOR_IMAGES,
           el.poster_path
         )}" alt="${el.original_title} poster" /> 
         </div>
         <h1 class= "movie-title">${el.original_title}</h1>
    <div class="movie-info">   
     ${makeGenresList(el)}
    <span class = "movie-line"> | </span>
    <span class = "movie-year"> ${el.release_date.slice(0, 4)} </span>
    <span class="movie-rate"> ${el.vote_average.toFixed(1)} 
    </div>
</div>
`
    )
    .join('');
}

function makeGenresList(el) {
  return `<div>${
    el.genre_names.length > 2
      ? `<span class ="movie-genre">${el.genre_names[0]},
    </span>` +
        `<span class="movie-genre">${el.genre_names[1]}, </span>` +
        `<span class="movie-other">Other </span>`
      : el.genre_names[0]
  }
    </div>`;
}

function checkMoviePoster(baseUrl, posterUrl) {
  if (posterUrl === null) {
    // return 'https://via.placeholder.com/350x500?text=No+Poster';
    return 'https://dummyimage.com/350x500/ccc/fff.jpg&text=No+poster';
  }
  return baseUrl + posterUrl;
}
