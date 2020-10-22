import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DetailsPage from './components/DetailsPage';
import SearchPage from './components/SearchPage';
import MyList from './components/MyList';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userList: {},
      searchResults: null,
      homePageGenres: ['Parody', 'Shounen', 'Fantasy', 'Psychological', 'Slice-Of-Life', 'Romance']
    }
    this.genre = {
      Action: 1,
      Adventure: 2,
      Comedy: 4,
      Demons: 6,	
      Mystery: 7,	
      Drama: 8,	
      Fantasy: 10,
      Horror: 14,	
      Kids: 15,
      Magic: 16,
      "Martial-Arts": 17,
      Mecha: 18,	
      Music: 19,
      Parody: 20,
      Romance: 22,
      School: 23,
      "Sci-Fi": 24,
      Shounen: 27,
      Space: 29,
      Sports: 30,
      "Super-Power": 31,
      "Slice-Of-Life": 36,
      Supernatural: 37,
      Military: 38,
      Police: 39,
      Psychological: 40,
      Thriller: 41,
    }
  }

  componentDidMount = () => {}

  handleSearchResults = (searchResults) => {
    this.setState({
      searchResults
    })
  }

  // saves all api responses into the state for later use
  handleUserList = (newList) => {
    const { userList } = this.state;
    const key = Object.keys(newList)[0];

    if (!this.state.userList.hasOwnProperty(key)) {
      userList[key] = newList[key];
      this.setState({ userList });
    }   

    console.log({userList: this.state.userList});
  }

  render() {
    return (
      <div className="App">
        <Navbar submitSearch={this.handleSearchResults} />

        <Switch>
          <Route exact path='/' render={(props) => 
              <Home {...props} genreList={this.genre} homePageGenres={this.state.homePageGenres} handleUserList={this.handleUserList} userList={this.state.userList} />} />

          <Route exact path='/search' render={(props) => 
              <SearchPage {...props} searchResults={this.state.searchResults} genreList={this.genre} userList={this.state.userList} />} />

          <Route exact path='/anime/:id' render={(props) => 
              <DetailsPage {...props} userList={this.state.userList}/>} />
              
          <Route exact path='/my-list' render={(props) => 
              <MyList {...props} userList={this.state.userList}/> }/>
        </Switch>

      </div>
    );
  }
}

export default App;
