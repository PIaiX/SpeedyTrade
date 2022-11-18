import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import {IoEllipsisHorizontal} from 'react-icons/io5'
import {BiTrash, BiEdit} from 'react-icons/bi'
import InputRating from './utils/InputRating'

const AdsTr3 = () => {
    return (
        <tr>
            <td>24.08.2022</td>
            <td>#CTWVZGG6</td>
            <td>ProjectEssence.net Season 3, l8k, Прочее, Без ранга, 150 шт., Avatar</td>
            <td>@JamesMonro26</td>
            <td>Закрыт</td>
            <td>3000&nbsp;руб.</td>
            <td>
                <Dropdown align="end">
                    <Dropdown.Toggle variant="simple">
                        <IoEllipsisHorizontal />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as="div">
                            <InputRating />
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <BiEdit />
                            <span>Редактировать</span>
                        </Dropdown.Item>
                        <Dropdown.Item as="button">
                            <BiTrash />
                            <span>Удалить запись</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}

export default AdsTr3
