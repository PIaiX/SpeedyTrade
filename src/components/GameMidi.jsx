import React from 'react'
import {Link} from 'react-router-dom'

const GameMidi = (props) => {
    return (
        <>
            <Link to={`/game/${props.slug}`}>
                <figure className="game-midi">
                    <img src={props.imgLink} alt={props.title} />
                    <figcaption>
                        {props.url ? (
                            <a href={props.url} className="stretched-link">
                                {props.title}
                            </a>
                        ) : (
                            props.title
                        )}
                    </figcaption>
                </figure>
            </Link>
            <div className="mt-3 d-flex flex-wrap align-items-center">
                {props?.regions?.length &&
                    props.regions.map((obj) => {
                        return (
                            <button key={obj} type="button" className="btn-4 p-2 fs-08 me-1 mb-2 text-uppercase">
                                {obj}
                            </button>
                        )
                    })}
            </div>
            <div className="mt-3 d-flex flex-wrap align-items-center">
                {props?.subLinksArr?.length &&
                    props.subLinksArr.map((obj) => {
                        return (
                            <Link key={obj.anchor} to={`/game/${props.slug}`} className="fs-09 me-3 mb-2">
                                {obj.anchor}
                            </Link>
                        )
                    })}
            </div>
        </>
    )
}

export default GameMidi
