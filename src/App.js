import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DetailsPage from './components/DetailsPage';
import SearchPage from './components/SearchPage';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userList: null,
      searchResults: null
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

  componentDidMount = () => {}

  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route 
            exact 
            path='/' 
            render={(props) => <Home {...props} genreList={this.genre} />} />
          <Route 
            exact 
            path='/search' 
            render={(props) => <SearchPage {...props} genreList={this.genre} />} />
          <Route 
            exact 
            path='/anime/:id' 
            render={(props) => <DetailsPage {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
