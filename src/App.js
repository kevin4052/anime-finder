import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppBar from './components/AppBar'
import Home from './components/Home';
import DetailsPage from './components/DetailsPage';
import SearchPage from './components/SearchPage';
import MyList from './components/MyList';
import AxiosService from './components/services/AxiosService';
import Loading from './components/Loading';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cacheList: {},
      favorites: [],
      searchResults: null,
      loading: true,
      homePageGenres: ['Parody', 'Shounen', 'Fantasy', 'Psychological', 'Slice-Of-Life', 'Romance']
    }
    this.axiosService = new AxiosService();
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

  componentDidMount = async () => {
    await this.axiosService
      .getTopRated(1)
      .then(response => {
        this.setState((preState) => ({
          cacheList: Object.assign(preState.cacheList, {Top: response})
        }));

      });

    Object.keys(this.genre).forEach((genre, index) => {
      const getAllGenres = setInterval(() => {
        this.axiosService
          .getGenreList(this.genre[genre])
          .then(response => {
            this.setState((preState) => ({
              cacheList: Object.assign(preState.cacheList, {[genre]: response})
            }));

          })
        }, 4000)

        if (index === Object.keys(this.genre).length - 1) {
          clearInterval(getAllGenres);
          this.setState({ loading: false});
        };
      });
  }

  addToFavorites = async (id, isFav) => {
    let anime;
    const favs = this.state.favorites;

    await this.axiosService
            .getOneAnime(id)
            .then(response => anime = response)
            .catch(err => console.log({ err }));    

    if (isFav) {
      this.setState((preState) => ({
        favorites: preState.favorites.concat(anime)
      }))
    } else {
      const newFavs = favs.filter(fav => {
        return (fav.mal_id !== anime.mal_id)
      })

      this.setState(() => ({
        favorites: newFavs
      }))
    }
    
  }

  render() {
    return (
      <div className="App">
        <Navbar submitSearch={this.handleSearchResults} />
        <AppBar />

        <Switch>
          <Route exact path='/' render={(props) => 
              this.state.loading
              ? <Loading />
              : <Home 
                  {...props}
                  addToFavorites={this.addToFavorites}
                  favorites={this.state.favorites}
                  genreList={Object.keys(this.state.cacheList)} 
                  homePageGenres={this.state.homePageGenres} 
                  cacheList={this.state.cacheList} />} />
                    
              

          <Route exact path='/search' render={(props) => 
              <SearchPage 
                {...props}
                addToFavorites={this.addToFavorites}
                favorites={this.state.favorites}
                genreList={this.genre}
                handleUserList={this.handleUserList}
                cacheList={this.state.cacheList} />} />

          <Route exact path='/anime/:id' render={(props) => 
              <DetailsPage 
                {...props}
                addToFavorites={this.addToFavorites}
                favorites={this.state.favorites}
                cacheList={this.state.cacheList}/>} />
              
          <Route exact path='/my-list' render={(props) => 
              <MyList 
                {...props}
                addToFavorites={this.addToFavorites}
                favorites={this.state.favorites}
                /> }/>
        </Switch>
      </div>
    );
  }
}

export default App;
