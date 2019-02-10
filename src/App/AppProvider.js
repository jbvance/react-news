import React from 'react';
import _ from 'lodash';

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
            favorites: [{
                id: 'src-1',
                name: 'Source 1'
            },
            {
                id: 'src-2',
                name: 'Source 2'
            },
            {
                id: 'src-3',
                name: 'Source 3'
            },
            {
                id: 'src-4',
                name: 'Source 4'
            },
            {
                id: 'src-5',
                name: 'Source 5'
            }
        ],
            ...this.savedSettings(),            
            addSource: this.addSource,
            removeFavorite: this.removeFavorite,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredSources: this.setFilteredSources
        }
    }

    addSource = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites});
        }
    }

    removeFavorite = id => {
       console.log('REMOVING', id);
        let favorites = [...this.state.favorites];
        this.setState({favorites: this.state.favorites.filter(fav => fav.id !== id)});       
    }

    isInFavorites = key => _.includes(this.state.favorites, key);

    componentDidMount() {
        console.log('MOUNTED');
    }
    

    confirmFavorites = () => {              
        localStorage.setItem('newsData', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    savedSettings() {
        let newsData = JSON.parse(localStorage.getItem('newsData'));
        if(!newsData) {
            return {};
        }
        let { favorites } = newsData;
        return {favorites};        
    }    
    
    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}