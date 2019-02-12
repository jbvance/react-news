import React from 'react';
import styled from 'styled-components';
import Page from '../Shared/Page';
import FavoritesGrid from '../Settings/FavoritesGrid';
import HeadlinesGrid from './HeadlinesGrid';

export default () => (
    <Page name="dashboard">
        <FavoritesGrid />
        <HeadlinesGrid />
    </Page>
);
