import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
import { Link } from 'react-router-dom';

export default class PreviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        }

        this.genre = {
            Action: 1,
            Adventure: 2,
            Cars: 3,
            Comedy: 4,	
            Dementia: 5,
            Demons: 6,	
            Mystery: 7,	
            Drama: 8,	
            Fantasy: 10,
            Game: 11,
            Horror: 14,	
            Kids: 15,
            Magic: 16,
            "Martial-Arts": 17,
            Mecha: 18,	
            Music: 19,
            Parody: 20,
            Samurai: 21,
            Romance: 22,
            School: 23,
            "Sci-Fi": 24,
            Shounen: 27,
            Space: 29,
            Sports: 30,
            "Super-Power": 31,
            Vampire: 32,
            "Slice-Of-Life": 36,
            Supernatural: 37,
            Military: 38,
            Police: 39,
            Psychological: 40,
            Thriller: 41,
        }

        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        if (this.props.type === "genre") {

            const genreId = this.genre[this.props.genre];
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
                        list: response
                    })
                })
                .catch(err => console.log({ err }));

        }
    }


    render() {
        return (
            <div>
                <h3>{this.props.genre}</h3>
                <ul>
                    {
                        this.state.list?.map(anime => 
                            <li key={anime.mal_id}>
                                <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>
                            </li>)
                    }
                </ul>
            </div>
        )
    }
}
