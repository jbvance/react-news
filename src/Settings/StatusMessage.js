import React from 'react';
import { AppContext } from '../App/AppProvider';

export default props => (
  <AppContext.Consumer>
    {({favorites}) => 
      favorites.length === 0 ? 
        <div> 
            Please select between 1 and 10 favorites. 
        </div>
      : null
  
    }
  </AppContext.Consumer>
  );