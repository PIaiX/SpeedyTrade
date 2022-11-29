import React from 'react'
import StarRating from './utils/StarRating'
import {Link} from 'react-router-dom'

const LotPreview = () => {
    return (
        <tr className="lot-preview">
            <td>Android</td>
            <td>
                <Link to="lot">
                    ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar
                </Link>
            </td>
            <td>
                <Link to="/user" className="lot-preview-user">
                    <div className="img">
                        <img src="images/user2.png" alt="Колесникова Ирина" />
                        <div className="indicator online"></div>
                    </div>
                    <div>
                        <h5 className="achromat-2 mb-1">Колесникова Ирина</h5>
                        <div className="achromat-3 mb-1">@Irishka1911</div>
                        <StarRating rate={5} className="justify-content-start fs-08" />
                        <div>На&nbsp;сайте с&nbsp;сентября 2019&nbsp;г.</div>
                    </div>
                </Link>
            </td>
            <td>
                <div className="color-1 fw-7">3000&nbsp;руб.</div>
            </td>
        </tr>
    )
}

export default LotPreview
