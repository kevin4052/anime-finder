import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PreviewList from './PreviewList';
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
      <div className="container is-dark">
        <PreviewList type='top'/>
        <PreviewList type='genre' genre="Shounen" />
        <PreviewList type='genre' genre="Fantasy" />
        <PreviewList type='genre' genre="Psychological" />
      </div>
    );
  }
}

export default Home;
