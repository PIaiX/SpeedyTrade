import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom'
import { FiBell } from 'react-icons/fi'
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { clearNotifications } from '../store/reducers/notificationMenuSlice'

const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false)
  const handleCloseNotifications = () => setShowNotifications(false)
  const handleShowNotifications = () => setShowNotifications(true)

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notificationMenu)
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="notifications">
      <button type='button' onClick={(showNotifications) ? handleCloseNotifications : handleShowNotifications} className='notifications-btn'>
        <FiBell />
        {notification.count > 0 && <span className="unread-notifications-count">{notification.count}</span>}
      </button>
      <Offcanvas className="notifications-box" show={showNotifications} onHide={handleCloseNotifications} placement='top'>
        <Container>
          <Offcanvas.Body>
            <div className='d-flex justify-content-between'>
              <h4 className='mb-2'>Уведомления</h4>
              <button type='button' onClick={() => dispatch(clearNotifications())}>Очистить</button>
            </div>
            <ul>
              {notification.messages.slice(0, showAll ? 1000 : 5).map((message, index) =>
                <li key={'notification-menu-' + index}>
                  <Link to={message.link}>
                    <div>{message.text}</div>
                    <BsFillCaretRightFill />
                  </Link>
                </li>
              )}
            </ul>
            {notification.messages.length > 5 &&
              <button type='button' className='more' onClick={() => setShowAll(!showAll)}>
                <span>{showAll ? 'Скрыть' : 'Показать все'}</span>
                <BsFillCaretDownFill />
              </button>}
          </Offcanvas.Body>
        </Container>
      </Offcanvas>
    </div>
  )
}

export default Notifications