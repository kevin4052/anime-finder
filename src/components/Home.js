import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
        <PreviewList genreList={this.props.genreList} type='top'/>
        <PreviewList genreList={this.props.genreList} type='genre' genre="Parody" />
        <PreviewList genreList={this.props.genreList} type='genre' genre="Shounen" />
        <PreviewList genreList={this.props.genreList} type='genre' genre="Fantasy" />
        <PreviewList genreList={this.props.genreList} type='genre' genre="Psychological" />
        <PreviewList genreList={this.props.genreList} type='genre' genre="Slice-Of-Life" />
        <PreviewList genreList={this.props.genreList} type='genre' genre="Romance" />
      </div>
    );
  }
}

export default Home;
