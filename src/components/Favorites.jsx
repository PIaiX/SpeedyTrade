import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {HiBookmark} from 'react-icons/hi'
import {IoArrowUpCircleOutline, IoCloseCircleOutline} from 'react-icons/io5'

function Favorites(props) {
    const [showFav, setShowFav] = useState(false)
    const handleCloseFav = () => setShowFav(false)
    const handleShowFav = () => setShowFav(true)

    return (
        <>
            <button type="button" className="fav-btn" onClick={showFav ? handleCloseFav : handleShowFav}>
                <HiBookmark />
            </button>
            <Offcanvas show={showFav} placement={'top'} onHide={handleCloseFav}>
                <Offcanvas.Body>
                    <Container className="fav-box">
                        <button type="button" className="d-flex me-4 mt-1" onClick={handleCloseFav}>
                            <IoArrowUpCircleOutline />
                        </button>
                        <ul>
                            <li>
                                <img src="/images/slider-main/wow2.jpg" alt="World of Warcraft: Shadowlands" />
                                <Link to="/">World of Warcraft: Shadowlands</Link>
                                <button type="button" className="d-flex">
                                    <IoCloseCircleOutline />
                                </button>
                            </li>
                            <li>
                                <img src="/images/slider-main/genshin.jpg" alt="Genshin Impact" />
                                <Link to="/">Genshin Impact</Link>
                                <button type="button" className="d-flex">
                                    <IoCloseCircleOutline />
                                </button>
                            </li>
                        </ul>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Favorites
