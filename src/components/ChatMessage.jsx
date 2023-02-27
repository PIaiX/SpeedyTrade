import React, { useState, useEffect, memo, useCallback } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import 'moment/locale/ru'
import { convertToLocaleDate } from '../helpers/convertToLocaleDate'
import ImageViewer from 'react-simple-image-viewer'
import { getImageURL } from '../helpers/image'

const SingleMessage = ({ msg }) => {
    const user = useSelector((state) => state.auth.user)
    const [currentImage, setCurrentImage] = useState(null)
    const [isViewerOpen, setIsViewerOpen] = useState(false)
    const [image, setImage] = useState(['/images/no-photo.jpg'])

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index)
        setIsViewerOpen(true)
    }, [])

    const closeImageViewer = () => {
        setCurrentImage(0)
        setIsViewerOpen(false)
    }

    useEffect(() => {
        // console.log(msg)
        const loadImage = async (url) => {
            return new Promise((res, rej) => {
                let img = new Image()
                img.onload = () => {
                    res(img.src)
                }
                img.onerror = (e) => {
                    setTimeout(() => {
                        loadImage(url).then((i) => res(i))
                    }, 1000)
                }
                img.src = url
            })
        }
        if (Array.isArray(msg.attachedfile)) {
            msg.attachedfile.length > 0 &&
                loadImage(getImageURL(msg.attachedfile[0].media))
                    .then((img) => setImage([img]))
                    .catch((e) => console.log(e))
        } else {
            msg.attachedfile &&
                loadImage(getImageURL(msg.attachedfile))
                    .then((img) => setImage([img]))
                    .catch((e) => console.log(e))
        }
    }, [msg])

    return (
        <div className={`chat-box${user?.id === msg?.userId ? '-reverse' : ''}`}>
            <div className={`chat-box${user?.id === msg?.userId ? '-reverse' : ''}-user`}>
                <img src={getImageURL(msg?.userAvatar)} alt="avatar" />
                <span className="chat-user-name">{msg?.userName}</span>
            </div>

            <div className={`chat-box${user?.id === msg?.userId ? '-reverse' : ''}-messages`}>
                <div className="bubble" style={!msg.isViewed ? { border: 'thin solid var(--bg-2)' } : undefined}>
                    {msg.lot
                        && <p>
                            <NavLink to={`/lot/${msg.lotId}`}>
                                <div style={{ borderLeft: "thin solid var(--bg-2)", padding: "5px" }} >
                                    <div className={"opacity-50"}>
                                        <div>
                                            описание: {msg.lot.description}
                                        </div>
                                        <div>
                                            цена: {msg.lot.priceCommission}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </p>}
                    <p>{msg?.text}</p>
                    <div className="images-message">
                        {msg.attachedfile ? (
                            <div
                                className="images-box"
                                onClick={() => {
                                    openImageViewer(0)
                                }}
                            >
                                {image.length !== 0 && <img src={image} height={'100%'} width={'100%'} />}
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                    {isViewerOpen && (
                        <ImageViewer
                            src={image}
                            currentIndex={currentImage}
                            onClose={closeImageViewer}
                            disableScroll={false}
                            backgroundStyle={{
                                backgroundColor: 'rgba(0,0,0,0.9)',
                            }}
                            closeOnClickOutside={true}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

const ChatMessage = ({ keyArr, arr }) => {
    const newDate = keyArr && convertToLocaleDate(keyArr, true)
    const convertedDate = new Date(newDate)

    return (
        <>
            <Moment locale="ru" format="DD MMMM" date={convertedDate} />
            {arr && arr.map((i) => <SingleMessage msg={i} key={`chat${i.id}`} />)}
        </>
    )
}

export default memo(ChatMessage)
