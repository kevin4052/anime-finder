import React, { Component } from 'react';
import AxiosService from './services/AxiosService';

export default class DetailsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anime: null
        };
        this.axiosService = new AxiosService();
    }

    componentDidMount = () => {
        this.axiosService
            .getOneAnime(this.props.match.params.id)
            .then(response => {
                this.setState({
                    anime: response
                });
            })
            .catch(err => console.log({ err }));
    }

    render() {
        return (
            <div>
                {
                    this.state.anime && 
                        <>
                            <h3>{this.state.anime.title_english}</h3>
                            <img src={this.state.anime.image_url} alt="" />
                        </>
                }
            </div>
        )
    }
}
