import React from 'react';

const AdsTr2 = () => {
    return (
        <tr className='centered'>
            <td>
                <label className='switch'>
                    <input type='checkbox' />
                </label>
            </td>
            <td>(EU) Arcadian</td>
            <td>Восток</td>
            <td>
                <input type='number' />
            </td>
            <td>
                <input type='number' />
            </td>
            <td className='d-flex align-items-center'>
                <input type='number' />
                <span className='ms-3'>руб.</span>
            </td>
        </tr>
    );
};

export default AdsTr2;