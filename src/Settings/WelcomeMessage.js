import React from 'react';
import { AppContext } from '../App/AppProvider';

export default props => (
  <AppContext.Consumer>
    {({firstVisit}) => 
      firstVisit ? 
        <div> 
          Welcome to NewsDash, please select your favorite news sources to begin.{' '} 
        </div>
      : null
  
    }
  </AppContext.Consumer>
  );