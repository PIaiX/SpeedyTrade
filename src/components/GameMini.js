import React from 'react';

function GameMini(props) {
    return (
        <figure className='game-small'>
            <img src={props.imgLink} alt={props.title}/>
            <figcaption>
                {
                    (props.url)
                    ? <a href={props.url} className='stretched-link'>{props.title}</a>
                    : props.title
                }
            </figcaption>
        </figure>
    );
}

export default GameMini;