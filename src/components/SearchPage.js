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
            filteredAnimeList: null,
            selectedGenres: [],
            cachedGenres: Object.keys(this.props.cacheList)
        }
        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        this.setState({
            displayList: this.props.cacheList['Top']
        })
    }

    // return a unique array of objects
    siftDisplayList = (array) => {
        const idCheckList = [];
        let uniqueList = [];

        array.forEach(anime => {
            if (!idCheckList.includes(anime.mal_id)) {
                idCheckList.push(anime.mal_id);
                uniqueList.push(anime);
            }
        });

        uniqueList.filter();

        return uniqueList;
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
        const currentlyChecked = Array.from(checkboxChildNodes).filter(ele => {
            return ele.className.split(' ').includes('is-link') && ele;
        });

        // iterate through checkbox array to either make an axios call or pull from the cached list
        // let newDisplayList = [];
        // currentlyChecked.forEach(genre => {
        //     newDisplayList.concat(this.props.cacheList[genre.innerText]);
        //     console.log({[genre.innerText]: this.props.cacheList[genre.innerText]});
        // });

        let newDisplayList = currentlyChecked?.map(genre => {
            return this.props.cacheList[genre.innerText]
        })

        this.setState({
            displayList: this.siftDisplayList(newDisplayList.flat()).slice(0, 50)
        });

        console.log({newDisplayList});


    }

    render() {
        const displayList = this.props.searchResults || this.state.displayList;
        return (
            <div className="home-container">
                <div id='search-container'>
                    <div id="filter-container">
                        <h2>Search Page</h2>
                        <div className="control genre-btns">
                            {
                                Object.keys(this.props.genreList)?.map(genreName =>
                                    <label key={genreName} className="button checkbox">
                                        <input type='checkbox' name='genreBtn' onClick={this.handleBtnClick}/>
                                        {genreName}
                                    </label>
                                )
                            }
                        </div>
                    </div>
                    <div id="search-result-container">
                        {
                            displayList?.map((anime) => 
                                <AnimeCard key={anime.mal_id} title={anime.title} id={anime.mal_id} img={anime.image_url} />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
