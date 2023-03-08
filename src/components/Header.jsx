import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import ThemeToggler from './ThemeToggler'
import { FiMessageCircle, FiSearch, FiX } from 'react-icons/fi'
import Favorites from './Favorites'
import { useSelector } from 'react-redux'
import { getImageURL } from '../helpers/image'
import { searchGames } from '../services/games'
import GameMidiSearch from '../components/GameMidiSearch'
import { useRef } from 'react'

const Header = () => {
    const auth = useSelector((state) => state?.auth)
    const unreadCount = useSelector((state) => state?.notification?.unreadCount)
    const theme = useSelector((state) => state?.theme?.mode)
    const [search, setSearch] = useState('')
    const [searchResults, setsearchResults] = useState(undefined)
    const inputRef = useRef()

    useEffect(() => {
        search ?
            searchGames(search)
                .then(res => setsearchResults(res))
                .catch(error => console.log(error))
            :
            setsearchResults(undefined)
    }, [search])

    return (
        <header>
            <Container>
                <div className="d-flex align-items-center">
                    <Link to="/" className="me-4" style={{ height: '40px' }}>
                        <img src={theme === 'dark' ? "/images/dark.svg" : "/images/light.svg"} alt="Games.ru" className='h-100' />
                    </Link>
                    <form className="form-search d-none d-md-flex">
                        <input type="text" placeholder="Поиск по играм" onChange={(e) => setSearch(e.target.value)} ref={inputRef} />
                        {searchResults && <button type="button" onClick={() => {
                            inputRef.current.value = ''
                            setSearch(undefined)
                        }}>
                            <FiX />
                        </button>}
                        <div>
                            <FiSearch />
                        </div>
                    </form>
                    <hr className="vertical d-none d-md-block mx-3 mx-xl-4" />
                    <Favorites />
                </div>
                <div className="d-none d-md-flex align-items-center">
                    {auth?.isAuth && (
                        <>
                            <NavLink to="/account/help">Помощь</NavLink>
                            <button type="button" className="ms-5 d-none d-lg-flex align-items-center">
                                <FiMessageCircle className="fs-12 me-1" />
                                <span>
                                    <Link to="/account/messages">Онлайн-чат</Link>
                                </span>
                                {unreadCount && <span className="unread-header-conversations-count">{unreadCount}</span>}
                            </button>
                        </>
                    )}
                </div>
                <div className="d-flex align-items-center">
                    <ThemeToggler />
                    <hr className="vertical d-none d-xl-block mx-3 mx-xl-4" />
                    {auth?.isAuth ? (
                        <Link to="/account" className="user ms-4">
                            <img
                                className="user__avatar"
                                src={getImageURL(auth?.user?.avatar)}
                                alt={auth?.user?.nickname}
                            />
                            <span className="user__nickname">{auth?.user?.nickname}</span>
                        </Link>
                    ) : (
                        <>
                            <Link to="/registration" className="d-none d-xl-block">
                                Регистрация
                            </Link>
                            <Link to="/login" className="d-none d-md-block btn-1 ms-4">
                                Войти
                            </Link>
                        </>
                    )}
                </div>
            </Container>
            {searchResults &&

                <Container className='search-results-container'>
                    <div>
                        {searchResults.length > 0
                            ?
                            searchResults.map(game =>
                                <GameMidiSearch
                                    title={game.name}
                                    slug={game.slug}
                                    imgLink={getImageURL(game.logo)}
                                    subLinksArr={game?.categories}
                                    regions={game?.regions}
                                    key={game.id}
                                />
                            )
                            :
                            <div>Игр не найдено</div>
                        }
                    </div>

                </Container>
            }
        </header >
    )
}

export default Header
