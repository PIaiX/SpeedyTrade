import React from 'react'
import MessagePreview from '../../components/MessagePreview'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

const Messages = () => {
    return (
        <div className="main p-0 py-3 py-sm-4">
            <div className="d-flex align-items-center mb-3 mb-sm-4 ms-3 ms-sm-4 ms-lg-5">
                <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                    <FiArrowLeft className="fs-15" />
                </Link>
                <h4 className="color-1 mb-0">Сообщения</h4>
            </div>

            <ul className="messages-list">
                <MessagePreview />
                <MessagePreview />
                <MessagePreview />
                <MessagePreview />
            </ul>
        </div>
    )
}

export default Messages
