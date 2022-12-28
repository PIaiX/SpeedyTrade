import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {HiBookmark} from 'react-icons/hi'
import {IoArrowUpCircleOutline, IoCloseCircleOutline} from 'react-icons/io5'
import {useDeleteFavoriteMutation, useGetFavoritesQuery} from '../services/RTK/favoritesApi'
import {useSelector} from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import {getImageURL} from '../helpers/image'

function Favorites() {
    const [showFav, setShowFav] = useState(false)
    const userId = useSelector((state) => state?.auth?.user?.id)
    const theme = useSelector((state) => state?.theme?.mode)
    const {data, isLoading} = useGetFavoritesQuery(userId, {skip: !userId})
    const [deleteFavorite] = useDeleteFavoriteMutation()

    const deleteFav = async (gameId) => {
        if (gameId) {
            await deleteFavorite({userId, gameId})
        }
    }

    return (
        <>
            <button type="button" className="fav-btn" onClick={() => setShowFav(!showFav)}>
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
                            ) : (
                                <Skeleton
                                    baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                                    highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                                    height={'100%'}
                                    width={'15em'}
                                />
                            )}
                        </ul>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default Favorites
