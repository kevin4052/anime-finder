import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

export default function animeCard({ id, title, img, addToFavorites, favorites}) {
    let isFav = false;

    if (favorites.length) {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].mal_id === id) isFav = true;
        }
    }    

    const favBtnHandler = () => {
        isFav = !isFav;
        addToFavorites(id, isFav);
    }

    return (
        <div className="card">
            <Link to={`/anime/${id}`}>
                <div className="card-image">
                    <figure className="image is-2by3">
                        <img src={img} alt={title}/>
                    </figure>
                </div>
            </Link>
            <div className='fav-btn' onClick={() => favBtnHandler()}>
                {
                    isFav 
                    ? <FontAwesomeIcon style={{color: "red"}} icon={faMinus}/>
                    : <FontAwesomeIcon style={{color: "green"}} icon={faPlus}/>
                }                
            </div>
        </div>
    )
}
