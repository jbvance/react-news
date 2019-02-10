import React from 'react';
import _ from 'lodash';

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favorites: ['abc-news', 'axios', 'bleacher-report'],
            ...this.savedSettings(),
            addFavorite: this.addFavorite,
            removeFavorite: this.removeFavorite,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredSources: this.setFilteredSources
        }
    }

    addFavorite = key => {
        let favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({
                favorites
            });
        }
    }

    removeFavorite = id => {
        console.log('REMOVING', id);
        let favorites = [...this.state.favorites];
        this.setState({
            favorites: favorites.filter(fav => fav !== id)
        });
    }

    isInFavorites = key => _.includes(this.state.favorites, key);

    componentDidMount() {
        this.fetchSources();
    }

    arrayToObject(array) {
        const returnObj = array.reduce((obj, item) => {           
            obj[item.id] = item;
            return obj;
          }, {});

        console.log('returnObj', returnObj);
        return returnObj;
    }

    fetchSources = async () => {        
        const url = 'https://newsapi.org/v2/sources?language=en&country=us';
        fetch(url, {
           headers: {
            'X-API-KEY': 'ce530658d8e24415951b95c4c602bb03'
           }
        })
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(resJson => {       
                const sourceList = this.arrayToObject(resJson.sources);                                     
                this.setState({            
                    sourceList
                });
            });        
        
    };


    confirmFavorites = () => {
        localStorage.setItem('newsData', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    savedSettings() {
        let newsData = JSON.parse(localStorage.getItem('newsData'));
        if (!newsData) {
            return {
                page: 'settings',
                firstVisit: true
            };
        }
        let {
            favorites
        } = newsData;
        return {
            favorites
        };
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}