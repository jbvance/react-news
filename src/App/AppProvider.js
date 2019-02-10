import React from 'react';
import _ from 'lodash';

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['abc-news', 'axios', 'bleacher-report'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addFavorite: this.addFavorite,
            removeFavorite: this.removeFavorite,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredSources: this.setFilteredSources,
            setCurrentSource: this.setCurrentSource
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
                return response.json();
            })
            .then(resJson => {       
                const sourceList = this.arrayToObject(resJson.sources);                                     
                this.setState({ sourceList });
            });        
        
    };

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });  
        localStorage.setItem('newsData', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    savedSettings() {
        let newsData = JSON.parse(localStorage.getItem('newsData'));
        if (!newsData) {
            return {
                page: 'settings',
                firstVisit: true,
                currentSource: null
            };
        }
        let {
            favorites
        } = newsData;
        return {
            favorites
        };
    }

    setPage = page => this.setState({page});

    setCurrentSource = id => this.setState({currentSource: id});

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}