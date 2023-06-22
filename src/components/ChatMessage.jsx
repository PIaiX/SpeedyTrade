import React, {memo, useCallback, useEffect, useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Moment from 'react-moment'
import 'moment/locale/ru'
import {convertToLocaleDate} from '../helpers/convertToLocaleDate'
import ImageViewer from 'react-simple-image-viewer'
import {getImageURL} from '../helpers/image'
import {emitMessageBanned} from "../services/sockets/messages";
import {RiErrorWarningLine} from "react-icons/ri";

const SingleMessage = ({msg, blockMessage}) => {
    const user = useSelector((state) => state.auth.user)
    const [currentImage, setCurrentImage] = useState(null)
    const [isViewerOpen, setIsViewerOpen] = useState(false)
    const [image, setImage] = useState([])

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
                // img.onerror = (e) => {
                //     setTimeout(() => {
                //         loadImage(url).then((i) => res(i))
                //     }, 1000)
                // }
                img.src = url
            })
        }

        const loadAllImages = async (imgArray) => {
            return await Promise.all(
                imgArray.map(img => loadImage(getImageURL(img.media)))
            )
        }

        if (Array.isArray(msg.medias)) {
            msg.medias.length > 0 &&
            loadAllImages(msg.medias).then(imgArr => setImage(imgArr))
        } else {
            msg.attachedfile &&
            loadImage(getImageURL(msg.attachedfile))
                .then(img => setImage([img]))
        }
    }, [])

    return (
        <div className={`chat-box${user?.id === msg?.userId ? '-reverse' : ''}`}>
            <Link to={user?.id === msg?.userId ? `/account/profile` : `/user/${msg?.userId}`}
                  className={`chat-box${user?.id === msg?.userId ? '-reverse' : ''}-user`}>
                <img src={getImageURL(msg?.userAvatar)} alt="avatar"/>
                <span className="chat-user-name">{msg?.userName}</span>
            </Link>

            <div className={`chat-box${user?.id === msg?.userId ? '-reverse' : ''}-messages`}>
                <div className="bubble" style={!msg.isViewed ? {border: 'thin solid var(--bg-2)'} : undefined}>
                    {msg.lot
                        && <p>
                            <NavLink to={`/lot/${msg.lotId}`}>
                                <div style={{borderLeft: "thin solid var(--bg-2)", padding: "5px"}}>
                                    <div className={"opacity-50"}>
                                        {msg.lot.description && <div>
                                            описание: {msg.lot.description}
                                        </div>}
                                        <div>
                                            цена: {msg.lot.priceCommission}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </p>}
                    <p>{msg?.text}</p>
                    <div className="images-message">
                        {msg.medias &&
                            <div
                                className="images-box"
                                onClick={() => {
                                    openImageViewer(0)
                                }}
                            >
                                {image.length !== 0 && image.map(img =>
                                    <img key={msg.id + '-' + img} src={img}/>
                                )}

                            </div>}

                        {msg.attachedfile &&
                            <div
                                className="images-box"
                                onClick={() => {
                                    openImageViewer(0)
                                }}
                            >
                                {image.length !== 0 &&
                                    <img src={image[0]} width={'100%'} height={'100%'}/>}
                            </div>}
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
                {blockMessage && <div
                    title={'Заблокировать'}
                    onClick={() => emitMessageBanned(msg?.id).then(res => {
                        if (user?.roleId >= 0 && user?.roleId <= 4)
                            blockMessage(res?.body)
                    })}
                >
                    <RiErrorWarningLine/>
                </div>
                }

            </div>
        </div>
    )
}

const ChatMessage = ({keyArr, arr, blockMessage}) => {
    const newDate = keyArr && convertToLocaleDate(keyArr, true)
    const convertedDate = new Date(newDate)

    return (
        <>
            <Moment locale="ru" format="DD MMMM" date={convertedDate}/>
            {arr && arr.map((i) => <SingleMessage color={'red'} blockMessage={blockMessage} msg={i} key={`chat${i.id}`}/>)}
        </>
    )
}

export default memo(ChatMessage)
