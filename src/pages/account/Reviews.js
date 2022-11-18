import React, {useState} from 'react'
import StarRating from '../../components/utils/StarRating'
import Review from '../../components/Review'
import {Link} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

const Reviews = () => {
    const [tab, setTab] = useState(0)

    return (
        <div className="main">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                    <Link to="/account" className="btn-1 p-2 me-4 d-lg-none">
                        <FiArrowLeft className="fs-15" />
                    </Link>
                    <h4 className="color-1 mb-0">Отзывы</h4>
                </div>
                <div className="d-flex align-items-center mt-3 mt-sm-0">
                    <span className="me-4">Ваш рейтинг:</span>
                    <StarRating rate={3.7} />
                </div>
            </div>

            <div className="tabs-group">
                <button type="button" className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
                    Отзывы на меня
                </button>
                <button type="button" className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
                    Мои отзывы
                </button>
            </div>

            {tab === 0 ? (
                <div>
                    <Review
                        myReview={false}
                        text={
                            'Однозначно, базовые сценарии поведения пользователей, инициированные исключительно синтетически, заблокированы в рамках своих собственных рациональных ограничений. Являясь всего лишь частью общей картины, сторонники тоталитаризма в науке будут указаны как претенденты на роль ключевых факторов. Сложно сказать, почему многие известные личности освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.'
                        }
                    />
                    <Review
                        myReview={false}
                        text={
                            'Также как постоянный количественный рост и сфера нашей активности однозначно определяет каждого участника как способного принимать собственные решения касаемо благоприятных перспектив. '
                        }
                    />
                    <Review
                        myReview={false}
                        text={
                            'Вот вам яркий пример современных тенденций — постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обусловливает важность глубокомысленных рассуждений. Наше дело не так однозначно, как может показаться: разбавленное изрядной долей эмпатии, рациональное мышление не оставляет шанса для новых предложений. С другой стороны, внедрение современных методик, в своём классическом представлении, допускает внедрение поэтапного и последовательного развития общества. С учётом сложившейся международной обстановки, высокое качество позиционных исследований создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса анализа существующих паттернов поведения.'
                        }
                    />
                    <Review
                        myReview={false}
                        text={
                            'Также как постоянный количественный рост и сфера нашей активности однозначно определяет каждого участника как способного принимать собственные решения касаемо благоприятных перспектив. '
                        }
                    />
                </div>
            ) : (
                <div>
                    <Review
                        myReview={true}
                        text={
                            'Однозначно, базовые сценарии поведения пользователей, инициированные исключительно синтетически, заблокированы в рамках своих собственных рациональных ограничений. Являясь всего лишь частью общей картины, сторонники тоталитаризма в науке будут указаны как претенденты на роль ключевых факторов. Сложно сказать, почему многие известные личности освещают чрезвычайно интересные особенности картины в целом, однако конкретные выводы, разумеется, смешаны с не уникальными данными до степени совершенной неузнаваемости, из-за чего возрастает их статус бесполезности.'
                        }
                    />
                    <Review
                        myReview={true}
                        text={
                            'Также как постоянный количественный рост и сфера нашей активности однозначно определяет каждого участника как способного принимать собственные решения касаемо благоприятных перспектив. '
                        }
                    />
                    <Review
                        myReview={true}
                        text={
                            'Вот вам яркий пример современных тенденций — постоянное информационно-пропагандистское обеспечение нашей деятельности в значительной степени обусловливает важность глубокомысленных рассуждений. Наше дело не так однозначно, как может показаться: разбавленное изрядной долей эмпатии, рациональное мышление не оставляет шанса для новых предложений. С другой стороны, внедрение современных методик, в своём классическом представлении, допускает внедрение поэтапного и последовательного развития общества. С учётом сложившейся международной обстановки, высокое качество позиционных исследований создаёт необходимость включения в производственный план целого ряда внеочередных мероприятий с учётом комплекса анализа существующих паттернов поведения.'
                        }
                    />
                    <Review
                        myReview={true}
                        text={
                            'Также как постоянный количественный рост и сфера нашей активности однозначно определяет каждого участника как способного принимать собственные решения касаемо благоприятных перспектив. '
                        }
                    />
                </div>
            )}
        </div>
    )
}

export default Reviews
