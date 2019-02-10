import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { DeletableTile, SelectableTile, SelectedTile } from '../Shared/Tile';

const FavoritesGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`;

const DeleteIcon = styled.span`
    justify-self: right;
    display: none;
    margin-right: 5px;    
    ${DeletableTile}:hover & {
        display: inline;
        color: red;
    }
`;

export default (props) => {
    return (
        <AppContext.Consumer>
            {({favorites, removeFavorite, sourceList, page, setCurrentSource, currentSource}) => (
              
               <FavoritesGridStyled>
                    {favorites.map(fav => {
                        if (page === 'settings') {
                            return <DeletableTile key={fav} onClick={() => removeFavorite(fav)}><DeleteIcon>x</DeleteIcon>{sourceList[fav].name} </DeletableTile>
                        } else if (fav === currentSource) {
                            return (
                                <SelectedTile key={fav}>{sourceList[fav].name}</SelectedTile>
                            );
                        }  else {                            
                            return (
                                <SelectableTile key={fav} onClick={() => setCurrentSource(fav)}>{sourceList[fav].name}</SelectableTile>
                            )
                        }
                    })}
               </FavoritesGridStyled>
            )}
        </AppContext.Consumer>
    );
}