import axios from 'axios';

export default class AxiosService {
    constructor(){
        let apiService = axios.create({
            baseURL: `https://api.jikan.moe/v3`
        });

        this.apiService = apiService;
    }

    getTopRated = () => {
        return this.apiService
            .get(`/top/anime`)
            .then(response => response.data.top)
    }

    getGenreList = (genre) => {
        return this.apiService
            .get(`/genre/anime/${genre}/1`)
            .then(response => response.data.top)
    }
}
