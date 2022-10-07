import React from 'react';
import Container from 'react-bootstrap/Container';
import ThemeToggler from './ThemeToggler';
import { FiSearch, FiMessageCircle } from "react-icons/fi";
import { HiBookmark } from "react-icons/hi";
import { VscListSelection } from "react-icons/vsc";

function Header(props) {
    return (
        <header>
            <Container>
                <div className='d-flex align-items-center'>
                    <a href='/' className='me-4'><img src='imgs/logo.svg' alt='Games.ru'/></a>
                    <form className='form-search'>
                        <input type='search' placeholder='Поиск по играм'/>
                        <button type='submit'>
                            <FiSearch />
                        </button>
                    </form>
                    <hr className='vertical d-none d-lg-block mx-3 mx-xl-4' />
                    <a href='/' className='d-none d-lg-block fs-17 accent'>
                        <HiBookmark/>
                    </a>
                </div>
                <div className='d-none d-md-flex align-items-center'>
                    <button type='button'>Помощь</button>
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
                    <button type='button' className='menu d-block d-md-none ms-5'>
                        <VscListSelection />
                    </button>
                </div>
            </Container>
            
        </header>
    );
}

export default Header;