import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { HiBookmark } from 'react-icons/hi'
import { IoArrowUpCircleOutline, IoCloseCircleOutline } from 'react-icons/io5'
import { useDeleteFavoriteMutation, useGetFavoritesQuery } from '../services/RTK/favoritesApi'
import { useSelector } from 'react-redux'
import { getImageURL } from '../helpers/image'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

function Favorites() {
    const isAuth = useSelector(state => state.auth.isAuth)
    const nav = useNavigate()
    const [showFav, setShowFav] = useState(false)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const theme = useSelector((state) => state?.theme?.mode)
    const { data, isLoading } = useGetFavoritesQuery(userId, { skip: !userId })
    const [deleteFavorite] = useDeleteFavoriteMutation()

    const deleteFav = async (gameId) => {
        if (gameId) {
            await deleteFavorite({ userId, gameId })
        }
    }

    useEffect(() => {
        let header = document.querySelector('header')
        header && showFav
            ? header.classList.add('fav-visible')
            : header.removeAttribute('class')
    }, [showFav])

    return (
        <>
            <button type="button" className="fav-btn" onClick={() => {
                if (isAuth) {
                    setShowFav(!showFav)
                } else {
                    swal('Пожалуйста, войдите или зарегистрируйтесь', { buttons: ['Отмена', 'Хорошо'] })
                        .then((o) => o && nav('/login'))
                }
            }}>
                <HiBookmark />
            </button>
            <Offcanvas show={showFav} placement={'top'} onHide={() => setShowFav(!showFav)}>
                <Offcanvas.Body>
                    <Container className="fav-box">
                        <button type="button" className="d-flex me-4" onClick={() => setShowFav(!showFav)}>
                            <IoArrowUpCircleOutline />
                        </button>
                        <ul>
                            {!isLoading ? (
                                data?.body?.length > 0 ? (
                                    data?.body?.map((i) => (
                                        <li key={i.id}>
                                            <img src={getImageURL(i.logo)} alt={i.name} />
                                            <Link to={`/game/${i.slug}`}>{i.name}</Link>
                                            <button type="button" className="d-flex" onClick={() => deleteFav(i.id)}>
                                                <IoCloseCircleOutline />
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <h6>Список избранных пуст</h6>
                                )
                            ) : null}
                        </ul>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Favorites
