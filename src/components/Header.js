import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ThemeToggler from './ThemeToggler';
import { FiSearch, FiMessageCircle } from "react-icons/fi";
import { IoCaretDown } from "react-icons/io5";
import Sort from './Sort';
import Favorites from './Favorites';

function Header(props) {
    const [sortVisible, setSortVisible] = useState(false)
    useEffect(() => {
        function updateSort() {
            let box = document.getElementById('sort').getBoundingClientRect()
            let offsetElem=box.top + window.pageYOffset
            let scrollTop = window.pageYOffset
            if (scrollTop > offsetElem) {
                setSortVisible(true)
            } else {
                setSortVisible(false)
            }
        }

        window.addEventListener('scroll', updateSort);
        updateSort();
        return () => window.removeEventListener('scroll', updateSort);
    }, [])

    return (
        <>
            <header>
                <Container>
                    <div className='d-flex align-items-center'>
                        <Link to='/' className='me-4'><img src='imgs/logo.svg' alt='Games.ru'/></Link>
                        <form className='form-search d-none d-md-flex'>
                            <input type='search' placeholder='Поиск по играм'/>
                            <button type='submit'>
                                <FiSearch />
                            </button>
                        </form>
                        <hr className='vertical d-none d-md-block mx-3 mx-xl-4' />
                        <Favorites />
                    </div>
                    <div className='d-none d-md-flex align-items-center'>
                        <button type='button'>Помощь <IoCaretDown className='fs-08'/></button>
                        <button type='button' className='ms-5 d-none d-lg-flex align-items-center'>
                            <FiMessageCircle className='fs-12 me-1'/>
                            <span>Онлайн-чат</span>
                        </button>
                    </div>
                    <div className='d-flex align-items-center'>
                        <ThemeToggler />
                        <hr className='vertical d-none d-xl-block mx-3 mx-xl-4' />
                        <a href='/' className='d-none d-xl-block'>Регистрация</a>
                        <a href='/' className='d-none d-md-block btn-1 ms-4'>Войти</a>
                    </div>
                </Container>
                
            </header>

            <section className={(sortVisible)?'fixed-sort show':'fixed-sort'}>
                <Container>
                    <Sort />
                </Container>
            </section>
        </>
    );
}

export default Header;