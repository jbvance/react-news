import React from 'react';
import styled from 'styled-components';
import Page from '../Shared/Page';
import FavoritesGrid from '../Settings/FavoritesGrid';

const FavoritesGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`;

export default () => (
    <Page name="dashboard">
        <FavoritesGrid />
    </Page>
);
