import React, {useState, useEffect, memo, useCallback} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Moment from 'react-moment'
import 'moment/locale/ru'
import {convertToLocaleDate} from '../helpers/convertToLocaleDate'
import ImageViewer from 'react-simple-image-viewer'
import {getImageURL} from '../helpers/image'

const ChatMessage = ({avatarUser, keyArr, arr}) => {
    const user = useSelector((state) => state.auth.user)

    const newDate = keyArr && convertToLocaleDate(keyArr, true)
    const convertedDate = new Date(newDate)
    const [currentImage, setCurrentImage] = useState(null)
    const [isViewerOpen, setIsViewerOpen] = useState(false)
    const [images, setImages] = useState([])

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index)
        setIsViewerOpen(true)
    }, [])

    const closeImageViewer = () => {
        setCurrentImage(0)
        setIsViewerOpen(false)
    }

    useEffect(() => {
        setImages(
            arr
                ?.map((i) => i.medias?.map((k) => getImageURL(k.media)))
                .flat()
                .reverse()
        )
    }, [arr])

    return (
        <>
            <Moment locale="ru" format="DD MMMM" date={convertedDate} />
            {arr &&
                arr.map((i) => (
                    <div className={`chat-box${user?.id === i?.userId ? '-reverse' : ''}`} key={i?.id}>
                        <div className={`chat-box${user?.id === i?.userId ? '-reverse' : ''}-user`}>
                            <img
                                src={getImageURL(user?.id === i?.userId ? user?.avatar : avatarUser)}
                                alt="avatar"
                            />
                        </div>

                        <div className={`chat-box${user?.id === i?.userId ? '-reverse' : ''}-messages`}>
                            <div
                                className="bubble"
                                style={!i.isViewed ? {border: 'thin solid var(--bg-2)'} : undefined}
                            >
                                <p>{i?.text}</p>
                                <div className="images-message">
                                    {i.attachedfile ? (
                                        <div
                                            className="images-box"
                                            onClick={() => {
                                                openImageViewer(0)
                                            }}
                                        >
                                            <img src={getImageURL(i.attachedfile)} height={'100%'} width={'100%'} />
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                {isViewerOpen && (
                                    <ImageViewer
                                        src={images}
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
                ))}
        </>
    )
}

export default memo(ChatMessage)
