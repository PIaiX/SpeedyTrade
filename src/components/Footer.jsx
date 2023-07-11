import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import { IoGridOutline, IoHomeOutline, IoSearchOutline } from 'react-icons/io5'
import { VscAccount, VscChromeClose, VscCommentDiscussion } from 'react-icons/vsc'
import { FiSearch } from 'react-icons/fi'
import Sign from './utils/Sign'
import Plaix from './utils/Plaix'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import {SlSocialVkontakte} from "react-icons/sl";
import {BsTelegram} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc";
import {AiFillYoutube} from "react-icons/ai";

function Footer() {
    const [showMenu, setShowMenu] = useState(false)
    const handleCloseMenu = () => setShowMenu(false)
    const handleShowMenu = () => setShowMenu(true)
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const [showSearch, setShowSearch] = useState(false)
    const handleCloseSearch = () => setShowSearch(false)
    const handleShowSearch = () => setShowSearch(true)
    const theme = useSelector((state) => state?.theme?.mode)
    const nav = useNavigate()

    return (
        <>
            <footer>
                <Container className="d-none d-md-flex">
                    <Link to="/" style={{ height: '40px' }}>
                        <img src={theme === 'dark' ? "/images/dark.svg" : "/images/light.svg"} alt="SpeedyTrade.ru" className='h-100' />
                    </Link>
                    <div className="d-flex flex-column flex-xl-row-reverse align-item-center justify-content-center">
                        <ul className="list-unstyled d-flex">
                            <li>
                                <Link to="/document/1">Политика конфиденциальности</Link>
                            </li>
                            <li>
                                <Link to="/document/2">Политика cookie</Link>
                            </li>
                            <li>
                                {isAuth
                                    ? <Link to="/account/help">Помощь</Link>
                                    : <div
                                        onClick={() => swal('Пожалуйста, войдите или зарегистрируйтесь', { buttons: ['Отмена', 'Хорошо'] })
                                            .then((o) => o && nav('/login'))}
                                        style={{ cursor: 'pointer' }}
                                    >Помощь</div>
                                }
                            </li>
                            <li>
                                <div className={'d-flex gap-2'}>
                                    <div className={'bg-white d-flex justify-content-center align-items-center'} style={{width:'30px', height:'30px', borderRadius:'25px'}}>
                                        <SlSocialVkontakte color={'blue'} size={20} />
                                    </div>
                                    <div className={'bg-white d-flex justify-content-center align-items-center'} style={{width:'30px', height:'30px', borderRadius:'25px'}}>
                                        <BsTelegram color={'#32A8E2'} size={20} />
                                    </div>
                                    <div className={'bg-white d-flex justify-content-center align-items-center'} style={{width:'30px', height:'30px', borderRadius:'25px'}}>
                                        <AiFillYoutube color={'red'} size={20} />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <Sign className="text-center fs-09 mt-3 mt-xl-0 me-xl-4" />
                    </div>
                    <Plaix />
                </Container>

                <Container className="d-md-none">
                    <nav className="mobile w-100">
                        <ul className="list-unstyled d-flex align-items-center justify-content-around">
                            <li>
                                <Link to="/" className="active">
                                    <IoHomeOutline />
                                </Link>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    to="/"
                                    onClick={showSearch ? handleCloseSearch : handleShowSearch}
                                >
                                    {showSearch ? <VscChromeClose /> : <IoSearchOutline />}
                                </button>
                            </li>
                            <li>
                                <Link to={isAuth ? '/account' : '/login'}>
                                    <VscAccount />
                                </Link>
                            </li>
                            <li>
                                <Link to={isAuth ? '/account/messages' : '/login'}>
                                    <VscCommentDiscussion />
                                </Link>
                            </li>
                            <li>
                                <button type="button" to="/" onClick={showMenu ? handleCloseMenu : handleShowMenu}>
                                    {showMenu ? <VscChromeClose /> : <IoGridOutline />}
                                </button>
                                {/* <Link to='/'><IoGridOutline /></Link> */}
                            </li>
                        </ul>
                    </nav>
                </Container>
            </footer>

            <Offcanvas show={showSearch} placement={'bottom'} onHide={handleCloseSearch}>
                <Offcanvas.Body>
                    <Container>
                        <form className="form-search w-100">
                            <input type="search" placeholder="Поиск по играм" />
                            <button type="submit">
                                <FiSearch />
                            </button>
                        </form>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={showMenu} placement={'end'} onHide={handleCloseMenu}>
                <Offcanvas.Body>
                    <Container className="h-100 d-flex flex-column justify-content-between">
                        <nav>
                            <ul className="list-unstyled fs-12">
                                <li className="mb-3">
                                    <Link to="/" className="">
                                        Каталог игр
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link to="/" className="">
                                        Избранное
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    {isAuth
                                        ? <Link to="/account/help">Помощь</Link>
                                        : <div
                                            onClick={() => swal('Пожалуйста, войдите или зарегистрируйтесь', { buttons: ['Отмена', 'Хорошо'] })
                                                .then((o) => o && nav('/login'))}
                                            style={{ cursor: 'pointer' }}
                                        >Помощь</div>
                                    }
                                </li>
                                <li className="mb-3">
                                    <Link to="/" className="">
                                        Новости
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link to="/document/1" className="">
                                        Политика конфиденциальности
                                    </Link>
                                </li>
                                <li className="mb-3">
                                    <Link to="/document/2" className="">
                                        Политика cookie
                                    </Link>
                                </li>
                                <li>
                                    <div className={'d-flex gap-2'}>
                                        <div className={'bg-white d-flex justify-content-center align-items-center'} style={{width:'30px', height:'30px', borderRadius:'25px'}}>
                                            <SlSocialVkontakte color={'blue'} size={20} />
                                        </div>
                                        <div className={'bg-white d-flex justify-content-center align-items-center'} style={{width:'30px', height:'30px', borderRadius:'25px'}}>
                                            <BsTelegram color={'#32A8E2'} size={20} />
                                        </div>
                                        <div className={'bg-white d-flex justify-content-center align-items-center'} style={{width:'30px', height:'30px', borderRadius:'25px'}}>
                                            <AiFillYoutube color={'red'} size={20} />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="d-flex flex-column align-items-end mt-5">
                            <Sign />
                            <Plaix />
                        </div>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Footer
