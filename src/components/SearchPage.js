import React, { Component } from 'react'

export default class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animeCacheList: []
        }
    }
    render() {
        return (
            <div className="home-container">
                <h2>Search Page</h2>
                <div id='search-container'>
                    <div id="filter-container">
                        {
                            Object.keys(this.props.genreList)?.map(genreName =>
                                <button>{genreName}</button>    
                            )
                        }
                    </div>
                    <div id="search-result-container"></div>
                </div>
            </div>
        )
    }
}
