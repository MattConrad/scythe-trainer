import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getHexMap } from './def/getHexMap';
import { getFactions } from './def/getFactions';


class App extends Component {

  constructor() {
    super();
    this.test = '';
  }

  render() {
    const hexMap = getHexMap();
    console.log(hexMap);
    const factions = getFactions(hexMap);
    console.log(factions);
    this.test = factions;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
