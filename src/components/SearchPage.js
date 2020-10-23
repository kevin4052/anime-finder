import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
import AnimeCard from './animeCard';
import 'bulma/css/bulma.css';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: null,
            genreCacheList: [],
            filteredAnimeList: null,
            selectedGenres: [],
            cachedGenres: Object.keys(this.props.cacheList)
        }
        this.axiosService = new AxiosService();
        // this.cachedGenres = Object.keys(this.props.cacheList);
    }

    componentDidMount = () => {}

    callAxiosService = (selectedGenre) => {
        const genreId = this.props.genreList[selectedGenre]; 
        this.axiosService
                .getGenreList(genreId)
                .then(async response => {
                    await this.setState(() => ({
                        displayList: response
                    }));

                    // lift newly called genre to app.js
                    this.props.handleUserList({ [selectedGenre]: response });
                    console.log({[selectedGenre]: response});
                })
                .catch(err => console.log({ err }));

    }

    handleBtnClick = (event) => {
        let checkBoxClass = event.target.parentElement.className.split(" ");
        const checkboxChildNodes = event.target.parentElement.parentElement.childNodes;

        // adds or removes "is-link" to selected checkbox
        checkBoxClass = !checkBoxClass.includes("is-link") 
            ? checkBoxClass.concat("is-link") 
            : checkBoxClass.filter(ele => ele !== "is-link");        
        event.target.parentElement.className = checkBoxClass.join(" ");

        // creates an array of currently checked checkboxes
        const currentlyChecked = Array.from(checkboxChildNodes).filter(ele => {
            return ele.className.split(' ').includes('is-link') && ele;
        });

        console.log("vv>>>", this.state.cachedGenres)

        // iterate through checkbox array to either make an axios call or pull from the cached list
        currentlyChecked.forEach(genre => {

            if (this.state.cachedGenres.includes(genre.innerText)) {

                this.setState((preState) => ({
                    displayList: preState.displayList 
                        ? preState.displayList.concat(this.props.cacheList[genre.innerText])
                        : this.props.cacheList[genre.innerText]
                }));

            } else {
                this.callAxiosService(genre.innerText);
            }
        });

    }

    updateBtnStatus = () => {}

    render() {
        const displayList = this.state.displayList || this.props.searchResults;
        return (
            <div className="home-container">
                <div id='search-container'>
                    <div id="filter-container">
                        <h2>Search Page</h2>
                        <div className="control genre-btns">
                            {
                                Object.keys(this.props.genreList)?.map(genreName =>
                                    <label key={genreName} className="button checkbox">
                                        <input type='checkbox' name='genreBtn' onClick={this.handleBtnClick}/>
                                        {genreName}
                                    </label>
                                )
                            }
                        </div>
                    </div>
                    <div id="search-result-container">
                        {
                            displayList?.map((anime, index) => 
                                <AnimeCard key={index} title={anime.title} id={anime.mal_id} img={anime.image_url} />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
