import React, { Component } from 'react';
import AnimeCard from './animeCard';

export default class PreviewList extends Component {

    render() {
        return (
            <div className="preview-box">
                <div className="row-title">
                    <h2>{this.props.genre}</h2>
                </div>
                <div className="row-container">
                    {
                        this.props.cacheList[this.props.genre]?.slice(0, 10).map(anime => 
                            <AnimeCard key={anime.mal_id} title={anime.title} id={anime.mal_id} img={anime.image_url} />                            
                        )
                    }
                </div>
            </div>
        )
    }
}