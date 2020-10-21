import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosService from './services/AxiosService';
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
        this.callAxiosService('Action')
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
                            this.state.animeCacheList?.map(anime => 
                                <div key={anime.mal_id} className="card">
                                    <Link to={`/anime/${anime.mal_id}`}>
                                        <div className="card-image">
                                            <figure className="image is-2by3">
                                                <img src={anime.image_url} alt={anime.title}/>
                                            </figure>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
