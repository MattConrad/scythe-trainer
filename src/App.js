import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { getHexMap } from './def/getHexMap';
import { getFactions } from './def/getFactions';
import { getActionBoards } from './def/getActionBoards';
import { ChooseGameStart } from './components/ChooseGameStart';


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
    const actionBoards = getActionBoards();
    console.log(actionBoards);
    this.test = hexMap;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ChooseGameStart factions={factions} actionBoards={actionBoards} hexMap={hexMap} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
