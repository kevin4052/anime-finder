import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
import { Link } from 'react-router-dom';

export default class PreviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }
        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        if (this.props.type === "genre") {
            const genreId = this.props.genreList[this.props.genre];            
            this.axiosService
                .getGenreList(genreId)
                .then(response => {
                    this.setState({
                        list: response
                    });
                })
                .catch(err => console.log({ err }));
        } else if (this.props.type === "top") {
            this.axiosService
                .getTopRated()
                .then(response => {
                    this.setState({
                        list: response.slice(0, 10)
                    })
                })
                .catch(err => console.log({ err }));
        }
    }

    render() {
        return (
            <div className="preview-box">
                <div className="row-title">
                    <h2>{this.props.genre || "Top"}</h2>
                </div>
                <div className="row-container">
                    {
                        this.state.list?.map(anime => 
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
        )
    }
}