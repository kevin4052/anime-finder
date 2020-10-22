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
        // console.log(event.target);
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
                        searchMatches: response.map(ele => {
                            return {
                                mal_id: ele.mal_id,
                                title: ele.title,
                                image_url: ele.image_url
                            }
                        })
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

    clickSearchLink = () => {
        const resetEvent = {
            target: {value: ""}
        }
        this.handleChange(resetEvent);
    }


    render() {
        return (
            <nav className="navbar is-dark">
                <div className="nav-logo">
                    <Link to='/' >
                        <img className="app-logo" src='./images/animeFinderLogo.png' alt='site-logo' />
                    </Link>
                    <div className='nav-links'>
                        <Link to='/'>Home</Link>
                        <Link to='/search'>Search</Link>
                        <Link to='/my-list'>My List</Link>
                    </div>
                </div>
                <div className='nav-search'>
                    <div className='field search-input'>
                        <p className="control has-icons-left">
                            <input 
                                className="input" 
                                type='text' 
                                placeholder='search' 
                                list="auto-complete"
                                size="30" 
                                value={this.state.search} 
                                onChange={this.handleChange}/>
                            <span className="icon is-small is-left">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </p>
                        <div className='input-results'>
                            <ul>
                                {
                                    this.state.searchMatches?.slice(0, 5).map(result => 
                                        <li key={result.mal_id} onClick={this.clickSearchLink}>
                                            <Link to={`/anime/${result.mal_id}`}>{result.title}</Link>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                </div>            
            </nav>
        );
    }
}
