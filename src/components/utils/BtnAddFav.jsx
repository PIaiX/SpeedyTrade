import React, { useEffect, useState } from 'react'
import { HiBookmark } from 'react-icons/hi'
import { useAddNewFavoriteMutation, useDeleteFavoriteMutation } from '../../services/RTK/favoritesApi'
import { dispatchAlert } from '../../helpers/alert'
import { useSelector } from 'react-redux'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const BtnAddFav = ({ favoriteStatus, gameId, userId }) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const nav = useNavigate()
    const [fav, setFav] = useState(null)
    const [addFavorite, state] = useAddNewFavoriteMutation()
    const [deleteFavorite, state2] = useDeleteFavoriteMutation()

    useEffect(() => {
        favoriteStatus && setFav(favoriteStatus)
    }, [favoriteStatus])

    const createNewFavorite = () => {
        if (gameId && userId) {
            addFavorite({ gameId, userId })
        }
        if (state.isError) {
            dispatchAlert('danger', 'Произошла ошибка')
        }
    }

    const deleteFav = () => {
        if (gameId && userId) {
            deleteFavorite({ gameId, userId })
        }

        if (state2.isError) {
            dispatchAlert('danger', 'Произошла ошибка')
        }
    }

    return (
        <button
            type="button"
            onClick={() => {
                if (isAuth) {
                    setFav(!fav)
                    fav ? deleteFav() : createNewFavorite()
                } else {
                    swal('Пожалуйста, войдите или зарегистрируйтесь', { buttons: ['Отмена', 'Хорошо'] })
                        .then((o) => o && nav('/login'))
                }
            }}
            className={fav ? 'add-fav active' : 'add-fav'}
        >
            {fav ? (
                <span className="me-1">Добавлено&nbsp;в&nbsp;избранное</span>
            ) : (
                <span className="me-1">Добавить&nbsp;в&nbsp;избранное</span>
            )}
            <HiBookmark className="fs-13" />
        </button>
    )
}

export default BtnAddFav
