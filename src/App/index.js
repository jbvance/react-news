import React, { Component } from 'react';
import AppProvider from './AppProvider';
import Favorites from '../Components/Favorites';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppProvider>
          <Favorites />
        </AppProvider>
      </div>
    );
  }
}

export default App;
