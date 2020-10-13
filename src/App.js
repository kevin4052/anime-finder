import React, { Component } from 'react';
import './App.css';
const axios = require('axios');

class App extends Component {
  state = {
    topAnime: []
  }

  componentDidMount = () => {
    const urlBase = 'https://api.jikan.moe/v3/';
    axios
      .get(`${urlBase}top/anime`)
      .then(async response => {
        // console.log(response.data.top.title);
        await this.setState({
          topAnime: response.data.top
        });
        // console.log(this.state.anime);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
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

export default App;
