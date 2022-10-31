import React from 'react'
import MessagePreview from '../../components/MessagePreview'

const Messages = () => {
    return (
        <div className='main p-0 py-4'>
            <h4 className='color-1 ms-5'>Сообщения</h4>

            <ul className='messages-list'>
                <MessagePreview />
                <MessagePreview />
                <MessagePreview />
                <MessagePreview />
            </ul>
        </div>
    );
};

export default Messages;