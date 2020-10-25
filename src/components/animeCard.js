import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export default function animeCard({ id, title, img, addToFavorites, favorites}) {
    let isFav = false;
    // console.log({favorites})

    if (favorites.length) {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].mal_id === id) isFav = true;
        }
    }    

    const favBtnHandler = () => {
        isFav = !isFav;
        console.log('card', id)
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
                    ? <FontAwesomeIcon style={{color: "red"}} icon={faMinusCircle}/>
                    : <FontAwesomeIcon style={{color: "green"}} icon={faPlusCircle}/>
                }
                
            </div>
        </div>
    )
}
