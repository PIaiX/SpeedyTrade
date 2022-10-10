import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoGridOutline, IoSearchOutline, IoClose, IoCloseCircleOutline } from "react-icons/io5";
import { VscAccount, VscCommentDiscussion, VscChromeClose } from "react-icons/vsc";
import { FiSearch } from "react-icons/fi";
import Sign from './utils/Sign';
import Plaix from './utils/Plaix';

function Footer(props) {
    const currentYear = new Date().getFullYear();

    const [showMenu, setShowMenu] = useState(false)
    const handleCloseMenu = () => setShowMenu(false)
    const handleShowMenu = () => setShowMenu(true)

    const [showSearch, setShowSearch] = useState(false)
    const handleCloseSearch = () => setShowSearch(false)
    const handleShowSearch = () => setShowSearch(true)

    return (
        <>
            <footer>
                <Container className='d-none d-md-flex'>
                    <Link to='/'><img src='imgs/logo.svg' alt='Games.ru'/></Link>
                    <div className='d-flex flex-column flex-xl-row-reverse align-item-center justify-content-center'>
                        <ul className='list-unstyled d-flex'>
                            <li><a href='/'>Политика конфиденциальности</a></li>
                            <li><a href='/'>Политика cookie</a></li>
                            <li><a href='/'>Помощь</a></li>
                        </ul>
                        <Sign className='text-center fs-09 mt-3 mt-xl-0 me-xl-4' />
                    </div>
                    <Plaix />
                </Container>

                <Container className='d-md-none'>
                    <nav className='mobile w-100'>
                        <ul className='list-unstyled d-flex align-items-center justify-content-around'>
                            <li>
                                <Link to='/' className='active'><IoHomeOutline /></Link>
                            </li>
                            <li>
                                <button type='button' to='/' onClick={(showSearch) ? handleCloseSearch : handleShowSearch}>
                                    {
                                        (showSearch)
                                        ? <VscChromeClose />
                                        : <IoSearchOutline />
                                    }
                                </button>
                            </li>
                            <li>
                                <Link to='/'><VscAccount /></Link>
                            </li>
                            <li>
                                <Link to='/'><VscCommentDiscussion /></Link>
                            </li>
                            <li>
                                <button type='button' to='/' onClick={(showMenu) ? handleCloseMenu : handleShowMenu}>
                                    {
                                        (showMenu)
                                        ? <VscChromeClose />
                                        : <IoGridOutline />
                                    }
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
                        <form className='form-search w-100'>
                            <input type='search' placeholder='Поиск по играм'/>
                            <button type='submit'>
                                <FiSearch />
                            </button>
                        </form>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <Offcanvas show={showMenu} placement={'end'} onHide={handleCloseMenu}>
                <Offcanvas.Body>
                    <Container className='h-100 d-flex flex-column justify-content-between'>
                        <nav>
                            <ul className='list-unstyled fs-12'>
                                <li className='mb-3'>
                                    <Link to='/' className=''>Каталог игр</Link>
                                </li>
                                <li className='mb-3'>
                                    <Link to='/' className=''>Избранное</Link>
                                </li>
                                <li className='mb-3'>
                                    <Link to='/' className=''>Помощь</Link>
                                </li>
                                <li className='mb-3'>
                                    <Link to='/' className=''>Новости</Link>
                                </li>
                                <li className='mb-3'>
                                    <Link to='/' className=''>Политика конфиденциальности</Link>
                                </li>
                                <li className='mb-3'>
                                    <Link to='/' className=''>Политика cookie</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className='d-flex flex-column align-items-end mt-5'>
                            <Sign />
                            <Plaix />
                        </div>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Footer;