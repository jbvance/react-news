import React, { Component } from 'react';
import AppProvider from './AppProvider';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import Content from '../Shared/Content';
import Settings from '../Settings';
import Dashboard from '../Dashboard';

import './App.css';

class App extends Component {
  render() {
    return (     
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Content>
            <Settings />
            <Dashboard />
          </Content>
        </AppProvider>
      </AppLayout>     
    );
  }
}

export default App;
