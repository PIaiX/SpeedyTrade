import React from 'react';

function ChatBox(props) {
    return (
        <div className='chat-box'>
            <div className='chat-box-user'>
                <img src='imgs/avatar.jpg' alt='user-picture'/>
            </div>
            <div className='chat-box-messages'>
                <div className='bubble'>
                    <div className='d-flex justify-content-between'>
                        <span className='name'>Vonuchka</span>
                        <time>13:54:12</time>
                    </div>
                    <p>В чате продажа запрещена…</p>
                </div>
                <div className='bubble'>
                    <p>Почитайте правила</p>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;