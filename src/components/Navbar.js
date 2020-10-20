import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosService from './services/AxiosService';
import 'bulma/css/bulma.css';

export default class Navbar extends Component {
    constructor() {
        super();
        this.state ={
            search: "",
            searchMatches: null
        }
        this.axiosService = new AxiosService();

    }

    handleChange = async (event) => {
        const { value } = event.target;
        await this.setState({
            search: value
        });

        this.getSearchResults();
    }

    getSearchResults = () => {        
        if (this.state.search.length >= 3) {
            this.axiosService
                .getSearchResults(this.state.search)
                .then(response => {
                    this.setState({
                        searchMatches: response.map(anime => anime.title)
                    })
                })
                .catch(err => console.log({ err }));

        } else {
            this.setState({
                searchMatches: null
            })
        }
    }


    render() {
        return (
            <nav className="navbar is-dark">
                <div className="nav-logo">
                    <Link to='/' >
                        <img className="app-logo" src='./images/animeFinderLogo.png' alt='site-logo' />
                    </Link>
                </div>
                <div className='nav-links'>
                    <label>
                        <input className="input is-rounded" type='text' placeholder='search' list="auto-complete" size="30" value={this.search} onChange={this.handleChange}/>
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
