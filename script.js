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
    // genres: [],
    likedMovies: []
};

// Controllers

function fetchMovies(){
    // fetch(`${baseUrl}${type}?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4&page=${page}`)
    return fetch(popularMoviesUrl)
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
        // console.log(model);
    });
}

// function fetchGenres() {
//     return fetch(genresUrl)
//     .then((resp) => {
//         if (resp.ok){
//             return resp.json();
//         }
//         else {
//             console.log("Genres fetching error");
//         }
//     })
//     .then((data) => {  
//         model.genres = data
//     });
// }

function fetchDetails(id) {
    const detailUrl = `${baseUrl}${id}?api_key=f7b946d6ee4e6d5684eae0ca10ca98e4`;

    return fetch(detailUrl)
    .then((resp) => {
        if (resp.ok){
            return resp.json();
        }
        else {
            console.log("Companies fetching error");
        }
    })
    .then((data) => {
        return data;
    });
}

// function getGenre(genre_id) {
//     model.genres.find((genre) => {
//         if(genre.id === genre_id){
//             return genre.name;
//         }
//     });
// }

function fetchCompanies() {
    return 
}

// Views

function createMoviePage(movies) {
    if(movies && movies.length > 0) {
        const moviesPage = document.querySelector(".movies-page");
        moviesPage.innerHTML = "";
        movies.forEach((movie) => {
            console.log(movie);
            const movieContainer = createMovie(movie);
            moviesPage.appendChild(movieContainer);
        });
    }
    else {
        console.log("Error while updating Movies page")
    }
}

function upadteMoviesPage() {
    const promise = fetchMovies();
    promise.then(() => {
       createMoviePage(model.movies);
    });
}

function updateView() {
    upadteMoviesPage();
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
    const detailsPage = document.querySelector(".details-page");
    const detailsPromise = fetchDetails(id);
    detailsPromise
    .then((movie) => {
        console.log(movie);
        detailsPage.id = id;

        const imageDiv = document.createElement("div");
        const image = `<img class="detail-img" src="${imageUrl}${movie.poster_path}"/>`;
        imageDiv.innerHTML = image;
    
        const detailsContainer = document.createElement("div");
        detailsContainer.className = "details-conatiner";
    
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
        movie.genres.forEach((genre) => {
            const genreLabel= document.createElement("label");
            genreLabel.className = "genre-label";
            genreLabel.textContent = genre.name;
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
    
        // const companiesArray = fetchCompanies(id);
        const companyContainer = document.createElement("div");
        companyContainer.className = "companies-img";
        companyContainer.innerHTML = ""
        movie.production_companies.forEach((company) => {
            if(company.logo_path !== null) {
                const innerHTML = `
                <img class="company" src="${imageUrl}${company.logo_path}" />`;
                companyContainer.innerHTML = `${companyContainer.innerHTML}\n ${innerHTML}`;
            }
        });

        detailsContainer.appendChild(title);
        detailsContainer.appendChild(overview);
        detailsContainer.appendChild(description);
        detailsContainer.appendChild(genres);
        detailsContainer.appendChild(genresContainer);
        detailsContainer.appendChild(ratingTitle);
        detailsContainer.appendChild(ratingContent);
        detailsContainer.appendChild(companies);
        detailsContainer.appendChild(companyContainer);

        detailsPage.appendChild(imageDiv);
        detailsPage.appendChild(detailsContainer);
        
    });   
}


const loadEvent = () => {
    updateView();
    fillDetails(464052);
}

loadEvent();