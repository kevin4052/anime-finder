import axios from 'axios';

export default class AxiosService {
    constructor() {
        this.apiService = axios.create({
            baseURL: `https://api.jikan.moe/v3`,
            // withCredentials: true
        });
    }

    getTopRated = (page) => {
        return this.apiService
            .get(`/top/anime/${page}`)
            .then(response => response.data.top);
    }

    getGenreList = (genre) => {
        return this.apiService
            .get(`/genre/anime/${genre}/1`)
            .then(response => response.data.anime);
    }

    getOneAnime = (animeId) => {
        return this.apiService
            .get(`/anime/${animeId}`)
            .then(response => response.data);
    }

    getSearchResults = (searchInput) => {
        return this.apiService
            .get(`/search/anime?q=${searchInput}`)
            .then(response => response.data.results.filter(result => result.rated !== "Rx"));
    }
}
