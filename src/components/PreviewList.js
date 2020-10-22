import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
import { Link } from 'react-router-dom';

export default class PreviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            hasBeenCalled: Object.keys(this.props.userList).includes(this.props.genre)
        }
        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        if (this.props.type === "top") {
            this.getDefaultGenre();
        } else {
            const genreId = this.props.genreList[this.props.genre];            
            this.getSelectedGenre(genreId);
        }
    }

    // sets state with the default genre of "Action"
    getDefaultGenre = () => {

        console.log({hasBeenCalled: this.state.hasBeenCalled});
        console.log(this.props.genre);

        this.state.hasBeenCalled 
        ? this.setState({
            list: this.props.userList.top
        })
        : this.axiosService
                .getTopRated(1)
                .then(async response => {
                    await this.setState({
                        list: response
                    });
                    this.props.handleCall({top: this.state.list});
                })
                .catch(err => console.log({ err }))
    }

    // sets state with the top 10 of a given genre
    getSelectedGenre = (genreId) => {
        console.log({hasBeenCalled: this.state.hasBeenCalled});
        console.log(this.props.genre);

        this.state.hasBeenCalled
        ? this.setState({
            list: this.props.userList[this.props.genre]
        })
        : this.axiosService
                .getGenreList(genreId)
                .then(async response => {
                    await this.setState({
                        list: response
                    });
                    this.props.handleCall({[this.props.genre]: this.state.list});
                })
                .catch(err => console.log({ err }))
    }

    render() {
        return (
            <div className="preview-box">
                <div className="row-title">
                    <h2>{this.props.genre || "Top"}</h2>
                </div>
                <div className="row-container">
                    {
                        this.state.list?.slice(0, 10).map(anime => 
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