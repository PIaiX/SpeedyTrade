import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom';

function GameLarge(props) {
    return (
        <figure className='game-large'>
            <img src={props.imgLink} alt={props.title}/>
            <figcaption>
                <Row>
                    <Col md={9} xl={7} xxl={6}>
                        <h2><Link to='/'>{props.title}</Link></h2>
                        <p className='mb-4'>{props.description}</p>
                    </Col>
                    <Col md={10}>
                        <div className='d-flex flex-wrap align-items-center'>
                            {
                                props.subLinksArr.map(obj => {
                                    return <Link key={obj.anchor} to={obj.link} className='btn-2 me-2 mb-2'>{obj.anchor}</Link>
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </figcaption>
        </figure>
    );
}

export default GameLarge;