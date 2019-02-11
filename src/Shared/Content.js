import React from 'react';
import { AppContext } from '../App/AppProvider';

export default props => {
    return <AppContext.Consumer>
        {({sourceList, firstVisit, headlines}) => {
            if (!sourceList) {
                return <div>Loading Sources...</div>
            }
            if(!firstVisit && !headlines) {
                return <div>Loading Headlines...</div>
            }           
            return <div>{props.children}</div>
    }}
    </AppContext.Consumer>
}