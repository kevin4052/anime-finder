import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
// import { Link } from 'react-router-dom';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anime: null
        };
        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        this.axiosService
            .getOneAnime(this.props.match.params.id)
            .then(response => {
                this.setState({
                    anime: response
                });
            })
            .catch(err => console.log({ err }));
    }

    render() {
        return (
            <div className="container">
                {
                    this.state.anime && 
                        <div className="details-box">
                            <div className="details-img">
                                <img src={this.state.anime.image_url} alt="" />
                            </div>
                            <div className="details-content">
                                <h3>{this.state.anime.title_english}</h3>
                                <div>
                                    {
                                        this.state.anime.genres?.map(genre => // genre btns need link to genre page
                                            <button key={genre.mal_id} className="genre-btn">{genre.name}</button>
                                        )
                                    }
                                </div>
                                <p>{this.state.anime.synopsis}</p>
                            </div>                            
                        </div>
                }
            </div>
        )
    }
}
