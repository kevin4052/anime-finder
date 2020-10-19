import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state ={
            search: "",
            searchMatches: null
        }

    }

    handleChange = async (event) => {
        const { value } = event.target;
        await this.setState({
            search: value
        });

        this.getSearchResults();
    }

    getSearchResults = () => {
        const urlBase = 'https://api.jikan.moe/v3';
        
        if (this.state.search.length >= 3) {
            axios
            .get(`${urlBase}/search/anime?q=${this.state.search}`)
            .then(response => {
                this.setState({
                searchMatches: response.data.results.map(anime => anime.title).slice(0, 5)
                });
            })
            .catch(err => console.log(err));
        } else {
            this.setState({
                searchMatches: null
            })
        }
    }


    render() {
        return (
            <nav className="navbar">
                <div className="nav-logo">
                    <img className="app-logo" src='./images/animeFinderLogo.png' alt='site-logo' />
                    <Link to='/' >Home</Link>
                </div>
                <div className='nav-links'>
                    <label>
                        <input type='text' placeholder='search' value={this.search} onChange={this.handleChange}/>
                    </label>
                    <div>
                        <ul>
                            {
                                this.state.searchMatches?.map(animeAutoComplete => <li key={animeAutoComplete}>{animeAutoComplete}</li>)
                            }
                        </ul>
                    </div>
                </div>            
            </nav>
        );
    }
}
