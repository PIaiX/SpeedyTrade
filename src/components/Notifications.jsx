import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";

const Notifications = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const handleCloseNotifications = () => setShowNotifications(false);
  const handleShowNotifications = () => setShowNotifications(true);

  return (
    <div className="notifications">
      <button type='button' onClick={(showNotifications) ? handleCloseNotifications : handleShowNotifications} className='notifications-btn'>
        <FiBell/>
        <span>2 уведомления</span>
      </button>
      <Offcanvas className="notifications-box" show={showNotifications} onHide={handleCloseNotifications} placement='top'>
        <Container>
          <Offcanvas.Body>
            <h4 className='mb-2'>Уведомления</h4>
            <ul>
              <li>
                <Link to='/'>
                  <div>Новое сообщение от laprad</div>
                  <BsFillCaretRightFill/>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <div>Пользователь купил ваш лот 00000</div>
                  <BsFillCaretRightFill/>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <div>Новое сообщение от laprad</div>
                  <BsFillCaretRightFill/>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <div>Пользователь купил ваш лот 00000</div>
                  <BsFillCaretRightFill/>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <div>Новое сообщение от laprad</div>
                  <BsFillCaretRightFill/>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <div>Пользователь купил ваш лот 00000</div>
                  <BsFillCaretRightFill/>
                </Link>
              </li>
            </ul>
            <button type='button' className='more'>
              <span>Показать все</span>
              <BsFillCaretDownFill/>
            </button>
          </Offcanvas.Body>
        </Container>
      </Offcanvas>
    </div>
  );
};

export default Notifications;