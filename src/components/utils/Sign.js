import React from 'react';

function Sign(props) {
    const currentYear = new Date().getFullYear();
    return (
        <div className={props.className}>
            © {currentYear} «Games.ru» Все права защищены
        </div>
    );
}

export default Sign;