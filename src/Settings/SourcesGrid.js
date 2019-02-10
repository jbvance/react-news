import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { SelectableTile, DisabledTile } from '../Shared/Tile';

const SourcesGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`;


export default (props) => {
    return (
        <AppContext.Consumer>
            {({sourceList, addFavorite, isInFavorites}) => {  
              let TileClass = SelectableTile;                      
              return (
               <SourcesGridStyled>
                    {Object.keys(sourceList).map(key => {
                        const TileClass = isInFavorites(key) ? DisabledTile : SelectableTile                    
                            return <TileClass key={key} onClick={() => addFavorite(key)}>{sourceList[key].name} </TileClass>                     
                    })}
               </SourcesGridStyled>
              );
            }}
        </AppContext.Consumer>
    );
}