import React, { Component } from 'react';
import PreviewList from './PreviewList';
import AxiosService from './services/AxiosService';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.axiosService = new AxiosService();
  }

  addToFavorites = (id, isFav) => {
    this.props.addToFavorites(id, isFav);
  }

  render() {
    return (
      <div className="home-container is-dark">
        <PreviewList
          addToFavorites={this.addToFavorites}
          favorites={this.props.favorites}
          genreList={this.props.genreList} 
          cacheList={this.props.cacheList} 
          type='top'
          genre='Top'
          />
        {
          this.props.homePageGenres?.map(ele => 
            <PreviewList 
              key={ele} 
              addToFavorites={this.addToFavorites}
              favorites={this.props.favorites}
              genreList={this.props.genreList} 
              cacheList={this.props.cacheList} 
              type='genre' 
              genre={ele}
              />
          )
        }
      </div>
    );
  }
}

export default Home;
