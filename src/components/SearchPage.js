import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosService from './services/AxiosService';
import 'bulma/css/bulma.css';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animeCacheList: null
        }
        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        for (let i = 1; i <= 4; i++) {
            this.axiosService
                    .getTopRated(i)
                    .then(async response => {
                        await this.setState((preState) => ({
                            animeCacheList: preState.animeCacheList ? preState.animeCacheList.concat(response) : response
                        }));
                    })
                    .catch(err => console.log({ err }));
        }
    }

    handleBtnClick = (event) => {
        const { className } = event.target;
        let classNameArray = className.split(" ");

        if (!classNameArray.includes('is-link')) {
            classNameArray.push("is-link");
        } else {
            classNameArray = classNameArray.filter(name => name !== "is-link")
        }

        event.target.className = classNameArray.join(" ");

    }
    render() {
        return (
            <div className="home-container">
                <div id='search-container'>
                    <div id="filter-container">
                        <h2>Search Page</h2>
                        <div>
                            {
                                Object.keys(this.props.genreList)?.map(genreName =>
                                    <button className='button is-small' key={genreName} onClick={this.handleBtnClick}>{genreName}</button>    
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
