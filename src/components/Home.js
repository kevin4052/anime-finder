import React, { Component } from 'react';
import GenreList from './GenreList';
const axios = require('axios');

class Home extends Component {
  state = {
    topAnime: []
  }

  componentDidMount = () => {
    const urlBase = 'https://api.jikan.moe/v3/';
    axios
      .get(`${urlBase}top/anime`)
      .then(async response => {
        await this.setState({
          topAnime: response.data.top
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <GenreList genre="Action" />
        <GenreList genre="Shounen" />
        <GenreList genre="Fantasy" />
          {
            this.state.topAnime?.map((anime) => 
              <div key={anime.mal_id} className="anime-card">
                <img src={anime.image_url} alt={anime.title} />
                <h3>{anime.title}</h3>
              </div>
            )
          }
      </div>
    );
  }
}

export default Home;
