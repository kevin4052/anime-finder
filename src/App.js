import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
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
        </Switch>
      </div>
    );
  }
}

export default App;
