import TheMovieAPI from './movies-api';

const backdrop = document.querySelector('.backdrop-trailer');
const modal = document.querySelector('.trailer-modal');
const btnTrailer = document.querySelector('.trailer-btn');
const loader = document.querySelector('.loader');

btnTrailer.addEventListener('click', onTrailerBtnClick);
backdrop.addEventListener('click', onCloseModalBtnClick);

function onTrailerBtnClick(e) {
    
  const movieId = getMovieId(e.target);
  modal.classList.remove('is-hidden');
  backdrop.classList.remove('is-hidden');

  getData(movieId);
}

const theMovieAPI = new TheMovieAPI();
async function getData(movieId) {
  try {
    loader.style.display = 'block';
    const { data } = await theMovieAPI.fetchTrailerFilm(movieId);
    // console.log(data.results[0]);
    modal.insertAdjacentHTML('beforeend', createModalMarkUp(data.results[0]));
  } catch (error) {
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
}

function getMovieId(target) {
  const movieCard = target.closest('[data-modal]');
  if (movieCard === null) {
    return;
  }
  return movieCard.dataset.filmid;
}

function createModalMarkUp(obj) {
  const markUp = `<iframe class="trailer"
    src="https://www.youtube.com/embed/${obj.key}" 
    title="YouTube video player" frameborder="0"
     allow="accelerometer; autoplay; clipboard-write;
      encrypted-media; gyroscope; picture-in-picture;
       web-share" allowfullscreen></iframe>
`;
  return markUp;
}

function onCloseModalBtnClick() {
  modal.innerHTML = '';
  modal.classList.add('is-hidden');
  backdrop.classList.add('is-hidden');
}
