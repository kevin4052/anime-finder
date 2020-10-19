import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PreviewList from './GenreList';
import AxiosService from './services/AxiosService';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      topAnime: []
    };
    this.axiosService = new AxiosService();
  }

  componentDidMount = () => {
    this.axiosService
      .getTopRated()
      .then(response => {
        this.setState({
          topAnime: response
        })
      })
      .catch(err => console.log({ err }));

  }

  render() {
    return (
      <div className="container">
        <PreviewList type='top'/>
        <PreviewList type='genre' genre="Shounen" />
        <PreviewList type='genre' genre="Fantasy" />
        {
          this.state.topAnime?.map((anime) => 
            <div key={anime.mal_id} className="anime-card">
              <Link to={`/anime/${anime.mal_id}`}>
                <img src={anime.image_url} alt={anime.title} />
                <h3>{anime.title}</h3>
              </Link>
            </div>
          )
        }
      </div>
    );
  }
}

export default Home;
