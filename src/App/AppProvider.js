import React from 'react';
import _ from 'lodash';

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export default class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: [],
            ...this.savedSettings(),
            setPage: this.setPage,
            credentials: '[INSERT API KEY HERE]',
            favError: '',
            addFavorite: this.addFavorite,
            removeFavorite: this.removeFavorite,
            isInFavorites: this.isInFavorites,
            confirmFavorites: this.confirmFavorites,
            setFilteredSources: this.setFilteredSources,
            setCurrentSource: this.setCurrentSource,
            getSourceHeadlines: this.getSourceHeadlines,
            checkFavorites: this.checkFavorites
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
        let favorites = [...this.state.favorites];
        let headlines = {...this.state.headlines};
        console.log(this.state.currentSource === id);
        const currentSource = this.state.currentSource === id ? null : this.state.currentSource;
        delete headlines[id];        
        this.setState({
            favorites: favorites.filter(fav => fav !== id),
            headlines,
            currentSource
        });
    }

    checkFavorites = () => {
        // If user is on favorites and goes back to dashboard, we need to check and verify whether any
        // favorites have been added or removed; if so, call fetchHeadlines to get lastest headlines
        console.log("THIS", this);
        const favorites = [...this.state.favorites];
        let headlines = {...this.state.headlines};
        let refresh = false;
        //First, check if any favorites have been added
        for (let fav of favorites) {
            if(!headlines[fav]) {
                //console.log('found fav not in headlines object');
                refresh = true;
                break;
            }
        }
        if (refresh) return this.confirmFavorites();
        // Now check and see if any favorites have been removed
        for(let source in headlines) {           
            if (favorites.indexOf(source) < 0) {
                //console.log('found a removed source');
                refresh = true;
                break;
            }
        }
        if (refresh) this.confirmFavorites();
    }

    isInFavorites = key => _.includes(this.state.favorites, key);

    componentDidMount() {
        this.fetchSources();
        this.fetchHeadlines();
    }

    arrayToObject(array) {
        const returnObj = array.reduce((obj, item) => {           
            obj[item.id] = item;
            return obj;
          }, {});       
        return returnObj;
    }

    fetchSources = async () => {        
        const url = 'https://newsapi.org/v2/sources?language=en&country=us';
        fetch(url, {
           headers: {
            'X-API-KEY': this.state.credentials
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
        if (this.state.favorites.length === 0) {
            return this.setState({favError: 'Please select between one and ten favorites to continue'})
        }
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            favError: ''
        }, () => this.fetchHeadlines());  
        localStorage.setItem('newsData', JSON.stringify({
            favorites: this.state.favorites
        }));
    }

    fetchHeadlines =  async () => {
       if (!this.state.favorites || this.state.favorites.length === 0) return;
        let sources = this.state.favorites.join(',');
        const url = `https://newsapi.org/v2/top-headlines?sources=${sources}&pageSize=100`;
        fetch(url, {
           headers: {
            'X-API-KEY': this.state.credentials
           }
        })
            .then(response => {                
                return response.json();
            })
            .then(resJson => {       
                const articles = resJson.articles;    
                let headlines= {};
                for (let article of articles) {
                    if (!headlines[article.source.id]) {
                        headlines[article.source.id] = [];
                    }
                    headlines[article.source.id].push(article);        
                }                                 
                this.setState({ headlines });
            });

    }

    getSourceHeadlines(sourceId) {
        return this.state.headlines[sourceId];
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
        let { favorites } = newsData;
        return { favorites };
    }

    setPage = page => this.setState({page}, () => {
        if (page === 'dashboard') {
            this.checkFavorites();
        }
    });

    setCurrentSource = id => this.setState({currentSource: id});

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
