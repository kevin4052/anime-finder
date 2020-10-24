import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AxiosService from './services/AxiosService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import AnimeCard from './animeCard';
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
                        searchMatches: response.map(ele => {
                            return {
                                mal_id: ele.mal_id,
                                title: ele.title,
                                image_url: ele.image_url
                            }
                        })
                    })
                })
                .catch(err => console.log({ err }));
        } else {
            await this.setState({
                searchMatches: null
            });
        }
    }

    clickSearchLink = () => {
        const resetEvent = {
            target: {value: ""}
        }
        this.handleChange(resetEvent);
    }


    render() {
        // const style = {opacity: "0"};
        return (
            <nav className="navbar is-dark">
                <div className="nav-logo">
                    <NavLink to='/' >
                        <img className="app-logo" src='./images/animeFinderLogo.png' alt='site-logo' />
                    </NavLink>
                    <div className='nav-links'>
                        <NavLink exact activeClassName='current-nav' to='/'>Home</NavLink>
                        <NavLink exact activeClassName='current-nav' to='/search'>Search</NavLink>
                        <NavLink exact activeClassName='current-nav' to='/my-list'>My List</NavLink>
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
                    {/* <div {...this.state.searchMatches && `style=${style}`} className="display-search-results">
                        {
                            this.state.searchMatches?.map((anime) => 
                                <div onClick={this.clickSearchLink}>
                                    <AnimeCard key={anime.mal_id} title={anime.title} id={anime.mal_id} img={anime.image_url} />
                                </div>
                                
                            )
                        }
                    </div> */}
                </div>            
            </nav>
        );
    }
}
