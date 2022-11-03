import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import ThemeToggler from './ThemeToggler'
import { FiSearch, FiMessageCircle } from "react-icons/fi"
import { IoCaretDown } from "react-icons/io5"
import Favorites from './Favorites'

function Header(props) {
    return (
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
                    <Link to='/registration' className='d-none d-xl-block'>Регистрация</Link>
                    <Link to='/account' className='d-none d-md-block btn-1 ms-4'>Войти</Link>
                </div>
            </Container>
        </header>
    );
}

export default Header;