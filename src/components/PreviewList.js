import React, { Component } from 'react';
import AxiosService from './services/AxiosService';
import AnimeCard from './animeCard';

export default class PreviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: this.props.cacheList[this.props.genre],
            hasBeenCalled: Object.keys(this.props.cacheList).includes(this.props.genre)
        }
        this.axiosService = new AxiosService();
    }

    // componentDidMount = () => {
    //     // if (this.props.type === "top") {
    //     //     // this.getDefaultGenre();
    //     // } else {
    //     //     // const genreId = this.props.genreList[this.props.genre];            
    //     //     // this.getSelectedGenre(genreId);
    //     // }
    //     console.log(this.props.genre, this.props.cacheList[this.props.genre])
    //     this.setState({
    //         list: this.props.cacheList[this.props.genre]
    //     })
    // }

    // sets state with the default genre of "Action"
    getDefaultGenre = () => {

        this.state.hasBeenCalled 
        ? this.setState({
            list: this.props.cacheList.top
        })
        : this.axiosService
                .getTopRated(1)
                .then(async response => {
                    await this.setState({
                        list: response
                    });
                    // this.props.handleCall({top: this.state.list});
                })
                .catch(err => console.log({ err }))
    }

    // sets state with the top 10 of a given genre
    getSelectedGenre = (genreId) => {

        this.state.hasBeenCalled
        ? this.setState({
            list: this.props.cacheList[this.props.genre]
        })
        : this.axiosService
                .getGenreList(genreId)
                .then(async response => {
                    await this.setState({
                        list: response
                    });
                    // this.props.handleCall({[this.props.genre]: this.state.list});
                })
                .catch(err => console.log({ err }))
    }

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