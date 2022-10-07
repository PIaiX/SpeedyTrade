import React from 'react';
import { Link } from 'react-router-dom';

function GameMidi(props) {
    return (
        <>
            <figure className='game-midi'>
                <img src={props.imgLink} alt={props.title}/>
                <figcaption>
                    {
                        (props.url)
                        ? <a href={props.url} className='stretched-link'>{props.title}</a>
                        : props.title
                    }
                </figcaption>
            </figure>
            <div className='mt-3 d-flex flex-wrap align-items-center'>
                {
                    props.subLinksArr.map(obj => {
                        return <Link key={obj.anchor} to={obj.link} className='fs-09 me-3 mb-2'>{obj.anchor}</Link>
                    })
                }
            </div>
        </>
    );
}

export default GameMidi;