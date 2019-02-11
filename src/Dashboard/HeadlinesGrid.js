import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import Headline from './Headline';

const HeadlinesGridStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 40px;
`;

const getHeadlines = (currentSource, headlines) => {
    return headlines[currentSource].map((headline, index) => {
        return (
            <Headline key={index} headline={headline} />
        )
    });
}

//grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
export default (props) => {
    return (
        <AppContext.Consumer>
            {({currentSource,  headlines}) => (
                
                <HeadlinesGridStyled>
                { currentSource
                    ? getHeadlines(currentSource, headlines)
                    :  <div>Please select a source above to show headlines</div>

                  }
                </HeadlinesGridStyled>
            )}
        </AppContext.Consumer>
    );
}