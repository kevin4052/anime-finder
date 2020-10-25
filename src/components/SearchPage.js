import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
import AnimeCard from './animeCard';
import 'bulma/css/bulma.css';

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayList: null,
            genreCacheList: [],
            currentlyChecked: [],
            cachedGenres: Object.keys(this.props.cacheList)
        }
        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        this.setState({
            displayList: this.props.cacheList['Top']
        })
    }
    
    handleBtnClick = (event) => {
        // get the checkbox class name and splits into an array
        let checkBoxClass = event.target.parentElement.className.split(" ");        
        // adds or removes "is-link" to selected checkbox array
        checkBoxClass = !checkBoxClass.includes("is-link") 
        ? checkBoxClass.concat("is-link") 
        : checkBoxClass.filter(ele => ele !== "is-link");
        // set the className to the new state
        event.target.parentElement.className = checkBoxClass.join(" ");
        
        // the node list of all the checkboxes
        const checkboxChildNodes = event.target.parentElement.parentElement.childNodes;
        // creates an array of currently checked checkboxes
        const currentlyChecked = Array.from(checkboxChildNodes)
            .filter(ele => ele.className.split(' ').includes('is-link') && ele)
            .map(genre => genre.innerText);

        this.setState({ currentlyChecked });

        const currentlyCheckedIds = currentlyChecked.map(checkbox => this.props.genreList[checkbox]);
        console.log({currentlyCheckedIds})
        
        let newDisplayList = currentlyChecked?.map(genre => {
            return this.props.cacheList[genre]
        })

        const filteredList = this.siftDisplayList(newDisplayList.flat(), currentlyCheckedIds);
        let displayList = [];

        if (currentlyChecked.length === 0) {
            displayList = this.props.cacheList['Top']
        } else if (filteredList.length === 0) {
            displayList = null;
        } else {
            displayList = filteredList
        }

        this.setState({ displayList });
    }
        
    // return a unique array of objects
    siftDisplayList = (array, selected) => {
        const idCheckList = [];
        let uniqueList = [];        

        // create an array of unique anime objects
        array.forEach(anime => {
            if (!idCheckList.includes(anime.mal_id)) {
                idCheckList.push(anime.mal_id);
                uniqueList.push(anime);
            }
        });

        // filter unique array of objects for the selected genres
        const filterList = uniqueList.filter(anime => {
            let count = 0;
            // an array of this animes genres
            const animeGenres = anime.genres.map(genre => genre.mal_id);
            for (let i = 0; i < selected.length; i++) {
                if (animeGenres.includes(selected[i])) {
                  count++
                }
            }
            // returns anime object if all the selected genres are contained in the anime object
            return count === selected.length;
        });

        return this.sortByRating(filterList);
    }

    sortByRating = (array) => {
        return array.sort((a, b) => b.score - a.score);
    }

    addToFavorites = (id, isFav) => {
        this.props.addToFavorites(id, isFav);
        console.log('search page', id)
    }

    render() {
        const displayList = this.state.displayList
        console.log({displayList})
        return (
            <div className="home-container">
                <div id='search-container'>
                    <div id="filter-container">
                        <h2>Genres</h2>
                        <div className="control genre-btns">
                            {
                                Object.keys(this.props.genreList)?.map(genreName =>
                                    <label key={genreName} className="button checkbox">
                                        <input type='checkbox' name='genreBtn' className="hide-checkbox" onClick={this.handleBtnClick}/>
                                        {genreName}
                                    </label>
                                )
                            }
                        </div>
                    </div>
                    <div id="search-result-container">
                        <div id='display-search-genres'>
                            {
                                this.state.currentlyChecked.length 
                                ? this.state.currentlyChecked.map(checkedGenre => <span key={checkedGenre}>{checkedGenre}</span>)
                                : <span>Top</span>
                            }
                        </div>
                        <div id='display-results'>
                            {
                                displayList?.map((anime) => 
                                    <AnimeCard 
                                        key={anime.mal_id} 
                                        title={anime.title} 
                                        id={anime.mal_id} 
                                        img={anime.image_url}
                                        addToFavorites={this.addToFavorites}
                                        favorites={this.props.favorites} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
