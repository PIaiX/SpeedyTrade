import React from 'react'

const AdsTr3 = (props) => {
    return (
        <tr>
            <td>{props?.createdAt}</td>
            <td>{props?.lotId}</td>
            <td>{props?.description}</td>
            <td>{props?.lotId}</td>
            <td>{props?.status}</td>
            <td>{props?.price} руб.</td>
        </tr>
    )
}

export default AdsTr3
