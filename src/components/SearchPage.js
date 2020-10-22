import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
import AnimeCard from './animeCard';
import 'bulma/css/bulma.css';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animeCacheList: null,
            genreCacheList: [],
            filteredAnimeList: null,
            selectedGenres: []
        }
        this.axiosService = new AxiosService();
        this.cachedGenres = Object.keys(this.props.cacheList);
    }

    componentDidMount = () => {}

    callAxiosService = (selectedGenre) => {
        const genreId = this.props.genreList[selectedGenre]; 
        this.axiosService
                .getGenreList(genreId)
                .then(async response => {
                    await this.setState(() => ({
                        animeCacheList: response
                    }));
                    this.props.handleUserList(this.state.selectedGenres);
                })
                .catch(err => console.log({ err }));

    }

    handleBtnClick = (event) => {
        const innerText = event.target.parentElement.innerText;

        if (this.cachedGenres.includes(innerText)) {
            this.setState(() => ({
                animeCacheList: this.props.cacheList[innerText]
            }));
        } else {
            this.callAxiosService(innerText);
        }
    }

    updateBtnStatus = () => {}

    render() {
        const displayList = this.state.animeCacheList || this.props.searchResults;
        return (
            <div className="home-container">
                <div id='search-container'>
                    <div id="filter-container">
                        <h2>Search Page</h2>
                        <div className="control genre-btns">
                            {
                                Object.keys(this.props.genreList)?.map(genreName =>
                                    <label key={genreName} className="radio">
                                        <input type='radio' name='genreBtn' onClick={this.handleBtnClick}/>
                                        {genreName}
                                    </label>
                                )
                            }
                        </div>
                    </div>
                    <div id="search-result-container">
                        {
                            displayList?.map(anime => 
                                <AnimeCard key={anime.mal_id} title={anime.title} id={anime.mal_id} img={anime.image_url} />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
