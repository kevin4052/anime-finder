import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
// import { Link } from 'react-router-dom';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anime: null,
            isFav: false
        };
        this.axiosService = new AxiosService();
    }

    componentDidMount = async () => {
        await this.axiosService
            .getOneAnime(this.props.match.params.id)
            .then(response => {
                this.setState({
                    anime: response
                });
            })
            .catch(err => console.log({ err }));

        this.props.favorites.forEach(anime => {
            if (anime.mal_id === this.state.anime.mal_id) {
                this.setState({ isFav: true })
            }
        })
    }

    addToFavorites = async () => {
        await this.setState((preState) => ({
            isFav: !preState.isFav
        }));

        this.props.addToFavorites(this.state.anime, this.state.isFav)
    }

    render() {
        return (
            <div className="details-container">
                {
                    this.state.anime && 
                        <div className="details-box">
                            <div className="details-img">
                                <img src={this.state.anime.image_url} alt="" />
                            </div>
                            <div className="details-content">
                                <h3>{this.state.anime.title_english || this.state.anime.title}</h3>
                                <div>
                                    {
                                        this.state.anime.genres?.map(genre => // genre btns need link to genre page
                                            <button key={genre.mal_id} className="genre-btn">{genre.name}</button>
                                        )
                                    }
                                </div>
                                <p>score: {this.state.anime.score}</p>
                                <p>{this.state.anime.synopsis}</p>
                                <br/>
                                {
                                    this.state.isFav
                                    ? <button className='button' onClick={this.addToFavorites}>Remove from Favorites</button>
                                    : <button className='button' onClick={this.addToFavorites}>Add to Favorites</button>
                                }
                            </div>
                                                    
                        </div>
                }
            </div>
        )
    }
}
