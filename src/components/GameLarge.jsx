import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import parse from 'react-html-parser'

function GameLarge(props) {
    return (
        <figure className="game-large">
            <img src={props.imgLink} alt={props.title} />
            <figcaption>
                <Row>
                    <Col md={9} xl={7} xxl={6}>
                        <h2>
                            <Link to={`/game/${props.title}`}>{props.title}</Link>
                        </h2>
                        <div className="mb-4">{parse(props.description)}</div>
                    </Col>
                    <Col md={10}>
                        <div className="d-flex flex-wrap align-items-center">
                            {props?.subLinksArr?.flat()?.map((obj) => (
                                <Link key={obj.anchor} to={obj.link} className="btn-2 me-2 mb-2">
                                    {obj.anchor}
                                </Link>
                            ))}
                        </div>
                    </Col>
                </Row>
            </figcaption>
        </figure>
    )
}

export default GameLarge
