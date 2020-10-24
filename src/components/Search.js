import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default class Search extends Component {
    render() {
        return (
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
        )
    }
}
