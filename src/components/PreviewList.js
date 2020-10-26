import React, { Component } from 'react';
import AnimeCard from './animeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class PreviewList extends Component {
    state = {
        sliderTransform: 0
    }

    
    addToFavorites = (id, isFav) => {
        this.props.addToFavorites(id, isFav);
    }

    sliderHandler = (event) => {
        const rowContainer = Object.values(event.target.parentElement.getClientRects())[0];
        const slider = Object.values(event.target.parentElement.children[0].getClientRects())[0];
        const rowContainerEnd = rowContainer.x + rowContainer.width;
        const sliderEnd = slider.x + slider.width;
        // console.log('rowContainerEnd', rowContainerEnd);
        // console.log('sliderEnd', sliderEnd);

        if (sliderEnd - rowContainerEnd >= 1410) {
            this.setState((preState) => ({
                sliderTransform: preState.sliderTransform - (rowContainerEnd - 255)
            }));
        } else if (sliderEnd - rowContainerEnd < 1410 && sliderEnd - rowContainerEnd > 255) {
            this.setState((preState) => ({
                sliderTransform: preState.sliderTransform - (sliderEnd - rowContainerEnd - 255)
            }));
        } else {
            this.setState({ sliderTransform: 0 })
        }
    }

    render() {
        return (
            <div className="preview-box">
                <div className="row-title">
                    <h2>{this.props.genre}</h2>
                </div>
                <div className="row-container">
                    <div className='slider' style={{transform: `translate3d(${this.state.sliderTransform}px, 0px, 0px)`} }>
                       {
                            this.props.cacheList[this.props.genre]?.slice(0, 20).map(anime => 
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
                    <div className="slide-btn slide-btn-next" onClick={this.sliderHandler}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                </div>
            </div>
        )
    }
}