import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
    }

    componentDidMount = () => {
        // this.callAxiosService('Action');
    }

    callAxiosService = (selectedGenre) => {
        const genreId = this.props.genreList[selectedGenre]; 
        this.axiosService
                .getGenreList(genreId)
                .then(async response => {
                    // await this.setState((preState) => ({
                    //     animeCacheList: preState.animeCacheList ? preState.animeCacheList.concat(response).slice(0, 50) : response
                    // }));
                    await this.setState(() => ({
                        animeCacheList: response
                    }));
                })
                .catch(err => console.log({ err }));
    }

    handleBtnClick = (event) => {
        // const className= event.target.className;
        const innerText = event.target.parentElement.innerText;

        // console.log("parent>>>", event.target.parentElement.innerText);
        // // console.log({className})
        // let classNameArray = className.split(" ");

        // if (!classNameArray.includes('is-link')) {
        //     classNameArray.push("is-link");
        //     this.setState((preState) => ({
        //         selectedGenres: preState.selectedGenres.concat(innerText)
        //     }))
        //     // console.log({innerText})
        // } else {
        //     classNameArray = classNameArray.filter(name => name !== "is-link")
        //     this.setState((preState) => ({
        //         selectedGenres: preState.selectedGenres.filter(genre => genre !== innerText)
        //     }))
        // }
        this.setState((preState) => ({
            selectedGenres: preState.selectedGenres.concat(innerText)
        }))

        // event.target.className = classNameArray.join(" ");
        // console.log('>>>>>', this.state.selectedGenres);
        this.callAxiosService(innerText);
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
