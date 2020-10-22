import React from 'react';
import { Link } from 'react-router-dom';

export default function animeCard({ id, title, img}) {
    return (
        <div className="card">
            <Link to={`/anime/${id}`}>
                <div className="card-image">
                    <figure className="image is-2by3">
                        <img src={img} alt={title}/>
                    </figure>
                </div>
            </Link>
        </div>
    )
}
