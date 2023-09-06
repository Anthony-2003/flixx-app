const global = {
  currentPage: window.location.pathname
}

const displayPopularMovies = async () => {
  const {
    results
  } = await getData('movie/popular');
  
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
           ${
            movie.poster_path
            ? ` <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` :  
          ` <img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
           }
          </a>
          <div class="card-body">
           <h5 class="card-title">${movie.title}</h5>
           <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
           </p>
          </div>
   `;

   document.querySelector('#popular-movies').appendChild(div);
  });
}

// Fetch data from TMDB API

const getData = async (endpoint) => {
  const API_KEY = 'd2adf7cb1c9020832b7e58388382caad';
  const API_LINK = 'https://api.themoviedb.org/3/';

  const response = await fetch(`${API_LINK}${endpoint}?api_key=${API_KEY}&language=en-US`);

  const data = await response.json();
  return data;
}



const highlightActiveLink = () => {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  })
}

//Init App
const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      break;
    case '/shows.html':
      break;
    case '/movie-details.html':
      break;
    case '/tv-details.html':
      break;
    case '/search.html':
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)