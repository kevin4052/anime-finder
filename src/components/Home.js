import React, { Component } from 'react';
import PreviewList from './PreviewList';
import AxiosService from './services/AxiosService';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.axiosService = new AxiosService();
  }

  componentDidMount = () => {}

  render() {
    return (
      <div className="home-container is-dark">
        <PreviewList 
          genreList={this.props.genreList} 
          cacheList={this.props.cacheList} 
          type='top'
          genre='Top'
          />
        {
          this.props.homePageGenres?.map(ele => 
            <PreviewList 
              key={ele} 
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
