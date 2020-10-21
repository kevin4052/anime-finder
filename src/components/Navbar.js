import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AxiosService from './services/AxiosService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
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

    getSearchResults = async () => {        
        if (this.state.search.length >= 3) {
            this.axiosService
                .getSearchResults(this.state.search)
                .then(async response => {
                    await this.setState({
                        searchMatches: response
                    })
                    this.props.submitSearch(this.state.searchMatches);
                })
                .catch(err => console.log({ err }));

        } else {
            await this.setState({
                searchMatches: null
            });
            this.props.submitSearch(this.state.searchMatches);
        }
    }


    render() {
        return (
            <nav className="navbar is-dark">
                <div className="nav-logo">
                    <Link to='/' >
                        <img className="app-logo" src='./images/animeFinderLogo.png' alt='site-logo' />
                    </Link>
                    <Link to='/'>Home</Link>
                    <Link to='/search'>Search</Link>
                </div>
                <div className='nav-search'>
                    <div className='field'>
                        <p className="control has-icons-left">
                            <input 
                                className="input" 
                                type='text' 
                                placeholder='search' 
                                list="auto-complete" 
                                size="30" 
                                value={this.search} 
                                onChange={this.handleChange}/>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </p>
                    </div>
                    {/* <div>
                        <ul>
                            {
                                this.state.searchMatches?.map(animeAutoComplete => <li key={animeAutoComplete}>{animeAutoComplete}</li>)
                            }
                        </ul>
                    </div> */}
                </div>            
            </nav>
        );
    }
}
