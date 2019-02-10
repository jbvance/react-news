import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';

export const SourceGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`;

export default ({sources}) => {
    return (                   
            <SourceGridStyled>
                {sources.map(source => 
                    <div>Test</div>)}
            </SourceGridStyled>
            );
};