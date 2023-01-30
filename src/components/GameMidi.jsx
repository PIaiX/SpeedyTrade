import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const GameMidi = (props) => {
    if (props.regions.length === 0) return null

    return (
        <>
            <Link to={`/game/${props.slug + '/' + props.regions[0]}`}>
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
                    props.regions.map((region) => {
                        return (
                            <NavLink
                                key={region.id}
                                to={`/game/${props.slug}/${region.name.replace('/', '_')}`}
                                className="btn-4 p-2 fs-08 me-1 mb-2 text-uppercase"
                            >
                                {region.name}
                            </NavLink>
                        )
                    })}
            </div>
            <div className="mt-3 d-flex flex-wrap align-items-center">
                {props?.subLinksArr?.length > 0 &&
                    props.subLinksArr?.map((category) => {
                        return (
                            <Link
                                key={category.id}
                                to={`/game/${props.slug}/${props.regions[0].name}/${category.id}`}
                                className="fs-09 me-3 mb-2"
                            >
                                {category.name}
                            </Link>
                        )
                    })}
            </div>
        </>
    )
}

export default GameMidi
