import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DetailsPage from './components/DetailsPage';
import './App.css';
// const axios = require('axios');

class App extends Component {
  state = {}

  componentDidMount = () => {}

  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/anime/:id' render={(props) => <DetailsPage {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
