import React from 'react';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import WelcomeMessage from './WelcomeMessage';
import FavoritesGrid from './FavoritesGrid';
import SourcesGrid from './SourcesGrid';

export default () => (
    <Page name="settings">
        <WelcomeMessage />
        <FavoritesGrid />
        <ConfirmButton />
        <SourcesGrid />    
    </Page>
);