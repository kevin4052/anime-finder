import React from 'react';
import AnimeCard from './animeCard';
import 'bulma/css/bulma.css';

export default function MyList(props) {
    console.log({props})
    return (
        <div className="container general-padding" id='display-results'>
            {
                props.favorites?.map((anime) => 
                    <AnimeCard key={anime.mal_id} title={anime.title} id={anime.mal_id} img={anime.image_url} />
                )
            }
        </div>
    )
}
