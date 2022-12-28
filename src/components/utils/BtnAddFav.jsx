import React, {useEffect, useState} from 'react'
import {HiBookmark} from 'react-icons/hi'
import {useAddNewFavoriteMutation, useDeleteFavoriteMutation} from '../../services/RTK/favoritesApi'
import {dispatchAlert} from '../../helpers/alert'

const BtnAddFav = ({favoriteStatus, gameId, userId}) => {
    const [fav, setFav] = useState(null)
    const [addFavorite, state] = useAddNewFavoriteMutation()
    const [deleteFavorite, state2] = useDeleteFavoriteMutation()

    useEffect(() => {
        favoriteStatus && setFav(favoriteStatus)
    }, [favoriteStatus])

    const createNewFavorite = () => {
        if (gameId && userId) {
            addFavorite({gameId, userId})
        }
        if (state.isError) {
            dispatchAlert('danger', 'Произошла ошибка')
        }
    }

    const deleteFav = () => {
        if (gameId && userId) {
            deleteFavorite({gameId, userId})
        }

        if (state2.isError) {
            dispatchAlert('danger', 'Произошла ошибка')
        }
    }

    return (
        <button
            type="button"
            onClick={() => {
                setFav(!fav)
                fav ? deleteFav() : createNewFavorite()
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
