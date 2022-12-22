import React, {useCallback, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {getImageURL} from '../helpers/image'
import Moment from 'react-moment'
import {convertToLocaleDate} from '../helpers/convertToLocaleDate'
import ImageViewer from 'react-simple-image-viewer'

const ChatBox = ({arr, keyArr}) => {
    const user = useSelector((state) => state?.auth?.user)
    const newDate = convertToLocaleDate(keyArr, true)
    const convertedDate = new Date(newDate)

    const [currentImage, setCurrentImage] = useState(null)
    const [isViewerOpen, setIsViewerOpen] = useState(false)
    const [images, setImages] = useState([])

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index)
        setIsViewerOpen(true)
    }, [])

    useEffect(() => {
        setImages(
            arr
                ?.map((i) => i.medias?.map((k) => getImageURL(k.media)))
                .flat()
                .reverse()
        )
    }, [arr])

    const closeImageViewer = () => {
        setCurrentImage(0)
        setIsViewerOpen(false)
    }

    return (
        <>
            <Moment locale="ru" format="DD MMMM" date={convertedDate} />
            {arr &&
                arr.map((i) => (
                    <div className={`chat-box${user?.id === i?.userId ? '-reverse' : ''}`} key={i?.id}>
                        <div className={`chat-box${user?.id === i?.userId ? '-reverse' : ''}-user`}>
                            <img src={getImageURL(i?.user?.avatar)} alt="Vonuchka" />
                        </div>

                        <div className={`chat-box${user?.id === i?.userId ? '-reverse' : ''}-messages`}>
                            <div key={i?.id} className="bubble">
                                <p>{i?.text}</p>
                                <div className="images-message">
                                    {i.medias?.length > 0
                                        ? i.medias.map((k, index) => (
                                              <div
                                                  key={k.id}
                                                  className="images-box"
                                                  onClick={() => {
                                                      openImageViewer(index)
                                                  }}
                                              >
                                                  <img src={getImageURL(k.media)} height={'100%'} width={'100%'} />
                                              </div>
                                          ))
                                        : ''}
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

export default ChatBox
