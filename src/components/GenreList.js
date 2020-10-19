import React, { Component } from 'react';
import axios from 'axios';

export default class GenreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genreList: null
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
        

    }

    componentDidMount = () => {
        const urlBase = 'https://api.jikan.moe/v3';
        axios
          .get(`${urlBase}/genre/anime/${this.genre[this.props.genre]}/1`)
          .then(async response => {
            await this.setState({
              genreList: response.data.anime.slice(0, 10)
            });
            console.log(this.state.genreList)
          })
          .catch(err => console.log(err));
    }


    render() {
        return (
            <div>
                <h3>{this.props.genre}</h3>
                <ul>
                    {
                        this.state.genreList?.map(anime => <li key={anime.mal_id}>{anime.title}</li>)
                    }
                </ul>
            </div>
        )
    }
}
