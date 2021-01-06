const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4&page=1`; //https://api.themoviedb.org/3/movie/popular?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4, 500 pages

const nowPlayingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4&page=1`; //https://api.themoviedb.org/3/movie/now_playing?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4, 58 pages

const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4&page=1`; //https://api.themoviedb.org/3/movie/top_rated?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4, 410 pages

const upComingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4&page=1`; //https://api.themoviedb.org/3/movie/upcoming?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4, 10 pages

// MODEL

const baseUrl = "https://api.themoviedb.org/3/movie/";

const imageUrl = "https://image.tmdb.org/t/p/w500";

const genresUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4";


const model = {
    movies: [],
    page: 0,
    total_pages: 0,
    total_results: 0,
    genres: []
};

// Controllers

function fetchMovies(type, page){
    // fetch(`${baseUrl}${type}?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4&page=${page}`)
    fetch(popularMoviesUrl)
    .then((resp) => {
        if (resp.ok){
            return resp.json();
        }
        else {
            console.log("Movies fetching error");
        }
    })
    .then((data) => {
        model.movies = data.results;
        model.page = data.page;
        model.total_pages = data.total_pages;
        model.total_results = data.total_results;
        console.log(model);
    });
}

function fetchGenres() {
    fetch(genresUrl)
    .then((resp) => {
        if (resp.ok){
            return resp.json();
        }
        else {
            console.log("Genres fetching error");
        }
    })
    .then((data) => {  
        model.genres = data
    });
}

function fetchCompanies(id) {
    const detailUrl = `${baseUrl}${id}?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4`;

    fetch(detailUrl)
    .then((resp) => {
        if (resp.ok){
            return resp.json();
        }
        else {
            console.log("Companies fetching error");
        }
    })
    .then((data) => {
        return data.production_companies;
    });
}

function getGenre(genre_id) {
    model.genres.find((genre) => {
        if(genre.id === genre_id){
            return genre.name;
        }
    });
}

// Views

function updateView() {

}

function createMovie(movie) {
    const movieDiv = document.createElement("div");
    movieDiv.className = "movie-container";
    movieDiv.id = movie.id;
    const innerHtml = `
    <img class="movie-img" src="${imageUrl}${movie.poster_path}"/>
    <h3 class="movie-name">${movie.title}</h3>
    <div class="movie-icon">
        <ion-icon name="star"></ion-icon>
        <label class="vote">${movie.vote_average}</label>
        <ion-icon name="heart-empty"></ion-icon>
    </div>`;
    movieDiv.innerHTML = innerHtml;
    return movieDiv;
}

function fillDetails(id) {
    const movie = model.movies.find((movie) => movie.id === id);
    const detailsContainer = document.querySelector(".details_page");
    detailsContainer.id = id;

    const image = `<img class="detail-img" src="${imageUrl}${movie.poster_path}"/>`;
    detailsContainer.appendChild(image);

    const detailsDiv = document.createElement("div");
    detailsDiv.className = "details-conatiner";

    const title = document.createElement("h3");
    title.innerText = movie.title;
    title.className = "etail-movie-name";

    const overview = document.createElement("h4");
    overview.textContent = "Overview";
    overview.className = "overview";

    const description = document.createElement("span");
    description.className = "description";
    description.textContent = movie.overview;

    const genres = document.createElement("h4");
    genres.className = "genres";
    genres.textContent = "Genres";

    const genresContainer = document.createElement("div");
    genresContainer.className = "genres-container";
    movie.genre_ids.forEach((genreId) => {
        const genreLabel= document.createElement("label");
        genreLabel.className = "genre-label";
        genreLabel.textContent = getGenre(genreId);
        genresContainer.appendChild(genreLabel);
    });

    const ratingTitle = document.createElement("h4");
    ratingTitle.className = "rating-title";
    ratingTitle.textContent = "Rating";

    const ratingContent = document.createElement("span");
    ratingContent.className = "rating";
    ratingContent.textContent = movie.vote_average;

    const companies = document.createElement("h4");
    companies.className = "companies";
    companies.textContent = "Production Companies";

    const companiesArray = fetchCompanies(id);
    const companyContainer = document.createElement("div");
    companyContainer.className = "companies-img";
    companiesArray.forEach((company) => {
        const innerHTML = `
        <img class="company" src="${imageUrl}${company.logo_path}" />`;
        companyContainer.appendChild(innerHTML);
    });

    detailsContainer.appendChild(image);
    detailsContainer.appendChild(detailsDiv);
    detailsContainer.appendChild(title);
    detailsContainer.appendChild(overview);
    detailsContainer.appendChild(description);
    detailsContainer.appendChild(genres);
    detailsContainer.appendChild(genresContainer);
    detailsContainer.appendChild(ratingTitle);
    detailsContainer.appendChild(ratingContent);
    detailsContainer.appendChild(companies);
    detailsContainer.appendChild(companyContainer);
}


fetchGenres();
fetchMovies(popularMoviesUrl);