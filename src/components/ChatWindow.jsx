import React, {useEffect} from 'react'
import {FiSend} from 'react-icons/fi'

function ChatWindow(props) {
    useEffect(() => {
        const chatBody = document.getElementById('chatBody')
        return () => {
            chatBody.scrollTop = chatBody.scrollHeight
        }
    })

    return (
        <section className="chat">
            <div className="chat-title">
                <h2 className="mb-0">Онлайн-чат</h2>
                <p className="d-none d-sm-block ms-4">Продажа в чате запрещена</p>
            </div>
            <div className="chat-window">
                <div className="chat-space" id="chatBody">
                    {/* chat */}
                </div>
                <form>
                    <input placeholder="Начните общаться" />
                    <hr className="vertical mx-2 mx-sm-3" />
                    <button type="submit">
                        <FiSend />
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ChatWindow
