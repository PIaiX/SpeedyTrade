import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { IoHomeOutline, IoGridOutline } from "react-icons/io5";


function Footer(props) {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <Container className='d-none d-md-block'>
                <a href='/'><img src='imgs/logo.svg' alt='Games.ru'/></a>
                
                <div className='d-flex flex-column flex-xl-row-reverse align-item-center justify-content-center'>
                    <ul className='list-unstyled d-flex'>
                        <li><a href='/'>Политика конфиденциальности</a></li>
                        <li><a href='/'>Политика cookie</a></li>
                        <li><a href='/'>Помощь</a></li>
                    </ul>
                    <div className='text-center fs-09 mt-3 mt-xl-0 me-xl-4'>© {currentYear} «Games.ru» Все права защищены</div>
                </div>
                

                <a href='/' className='dev'>Создано в <span className='color'>PlaiX</span></a>
            </Container>

            <Container className='d-md-none'>
                <nav className='mobile w-100'>
                    <ul className='list-unstyled d-flex align-items-center justify-content-around'>
                        <li>
                            <Link to='/'><IoHomeOutline /></Link>
                        </li>
                        <li>
                            <Link to='/'><IoGridOutline /></Link>
                        </li>
                        <li>
                            <Link to='/'><IoGridOutline /></Link>
                        </li>
                        <li>
                            <Link to='/'><IoGridOutline /></Link>
                        </li>
                        <li>
                            <Link to='/'><IoGridOutline /></Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </footer>
    );
}

export default Footer;