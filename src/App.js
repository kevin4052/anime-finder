import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

class App extends Component {
  state = {
    anime: {}
  }

  componentDidMount = () => {
    const urlBase = 'https://api.jikan.moe/v3/';
    axios
      .get(`${urlBase}anime/1`)
      .then(async response => {

        console.log(response.data);

        await this.setState({
          anime: response.data
        });

        console.log(this.state.anime.genres)

      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.anime.title}</h1>
        <p>{this.state.anime.synopsis}</p>
        <ul>
          {
            this.state.anime.genres?.map((genre) => <li key={genre.mal_id}>{genre.name}</li> )
          }
        </ul>
      </div>
    );
  }
}

export default App;
