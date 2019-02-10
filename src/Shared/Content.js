import React from 'react';
import { AppContext } from '../App/AppProvider';

export default props => {
    return <AppContext.Consumer>
        {({sourceList, firstVisit}) => {
            if (!sourceList) {
                return <div>Loading Sources...</div>
            }            
            return <div>{props.children}</div>
    }}
    </AppContext.Consumer>
}