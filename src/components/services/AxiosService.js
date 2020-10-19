import axios from 'axios';

export default class AxiosService {
    constructor() {
        this.apiService = axios.create({
            baseURL: `https://api.jikan.moe/v3`
        });
    }

    getTopRated = () => {
        return this.apiService
            .get(`/top/anime`)
            .then(response => response.data.top);
    }

    getGenreList = (genre) => {
        return this.apiService
            .get(`/genre/anime/${genre}/1`)
            .then(response => response.data.anime.slice(0, 10));
    }

    getOneAnime = (animeId) => {
        return this.apiService
            .get(`/anime/${animeId}`)
            .then(response => response.data);
    }

    getSearchResults = (searchInput) => {
        return this.apiService
            .get(`/search/anime?q=${searchInput}`)
            .then(response => response.data.results);

    }
}
