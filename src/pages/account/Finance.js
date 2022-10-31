import React, {useState} from 'react'
import Table from 'react-bootstrap/Table'

const Finance = () => {
    const [tab, setTab] = useState(0)
    const [sum, setSum] = useState(0)
    const [card, setCard] = useState()
    const [showAdd, setShowAdd] = useState(false)
    
    return (
        <div className='main'>
            <h4 className='color-1'>Финансы</h4>
            <div className='tabs-group mb-5'>
                <button type="button" className={(tab===0)?'active':''} onClick={()=>setTab(0)}>Пополнить баланс</button>
                <button type="button" className={(tab===1)?'active':''} onClick={()=>setTab(1)}>История списаний и пополнений</button>
            </div>

            {
                (tab === 0)
                ?<form>
                    <fieldset>
                        <legend>Сумма пополнения:</legend>
                        <div className='d-flex align-items-center'>
                            <div className='me-4'>Пополнить на сумму:</div>
                            <input type='number' placeholder='0' value={sum} onChange={(e)=>setSum(e.target.value)}/>
                            <div className='ms-3'>руб.</div>
                        </div>
                        <div className='d-flex mt-4 mb-5'>
                            <button type='button' onClick={()=>setSum(500)} className='btn-6 py-2 me-3'>500</button>
                            <button type='button' onClick={()=>setSum(1000)} className='btn-6 py-2 me-3'>1 000</button>
                            <button type='button' onClick={()=>setSum(1500)} className='btn-6 py-2 me-3'>1 500</button>
                            <button type='button' onClick={()=>setSum(2000)} className='btn-6 py-2 me-3'>2 000</button>
                            <button type='button' onClick={()=>setSum(3000)} className='btn-6 py-2 me-3'>3 000</button>
                            <button type='button' onClick={()=>setSum(5000)} className='btn-6 py-2 me-3'>5 000</button>
                            <button type='button' onClick={()=>setSum(10000)} className='btn-6 py-2 me-3'>10 000</button>
                            <button type='button' onClick={()=>setSum(15000)} className='btn-6 py-2 me-3'>15 000</button>
                            <button type='button' onClick={()=>setSum(20000)} className='btn-6 py-2 me-3'>20 000</button>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Способ оплаты:</legend>
                        <div className='d-flex'>
                            <div className={(card===0)?'bank-card active':'bank-card'} onClick={() => setCard(0)}>
                                <img src='imgs/bank/тинькофф.png' alt='тинькофф' className='bank-img'/>
                                <div className='info'>
                                    <img src='imgs/bank/mastercard.png' alt='mastercard' className='bank-type'/>
                                    <div className='number'>** 8765</div>
                                </div>
                            </div>
                            <div className={(card===1)?'bank-card active':'bank-card'} onClick={() => setCard(1)}>
                                <img src='imgs/bank/sber.png' alt='sber' className='bank-img'/>
                                <div className='info'>
                                    <img src='imgs/bank/visa.png' alt='visa' className='bank-type'/>
                                    <div className='number'>** 8765</div>
                                </div>
                            </div>
                            <div className='add-card' onClick={()=>setShowAdd((showAdd)?false:true)}>
                                <img src='imgs/bank/card-replacement.png' alt='card'/>
                                <div>Добавить новую карту</div>
                            </div>
                        </div>
                        {
                            (showAdd) && 
                            <div className='card-imitation'>
                                <div className='front'>
                                    <div className='mb-2'>Номер карты:</div>
                                    <input type='number' placeholder='0000 0000 0000 0000' className='w-100 mb-4'/>
                                    <div className='mb-2'>Действует до:</div>
                                    <div className='d-flex align-items-center'>
                                        <input type='number' placeholder='ММ'/>
                                        <span className='mx-2'>/</span>
                                        <input type='number' placeholder='ГГ'/>
                                    </div>
                                    <img src='imgs/bank/visa.png' alt='visa' className='bank-type'/>
                                </div>
                                <div className='back'>
                                    <div className='mb-2'>CVV/CVC:</div>
                                    <input type='number' placeholder='000'/>
                                    <div className='fs-08 mt-1'>три цифры с обратной стороны карты</div>
                                </div>
                            </div>
                        }
                    </fieldset>

                    <label className='mt-5'>
                        <input type='checkbox'/>
                        <span>Запомнить карту. Сохраняя карту, вы соглашаетесь с <a href='/' className='color-4 text-decoration-underline'>условиями привязки карты</a></span>
                    </label>
                    <button type='button' disabled={true} className='btn-5 mt-5'>Оплатить {sum} руб.</button>
                </form>
                : <div>
                    <h6>Ваши списания и пополнения:</h6>
                    <Table striped borderless className='my-4'>
                        <tbody>
                            <tr>
                                <td>Списание 28.09.2022 г.</td>
                                <td className='text-end fw-7'>- 345 руб.</td>
                            </tr>
                            <tr>
                                <td>Списание 28.09.2022 г.</td>
                                <td className='text-end fw-7'>- 345 руб.</td>
                            </tr>
                            <tr>
                                <td>Пополнение 12.09.2022 г.</td>
                                <td className='text-end fw-7'>+ 2 000 руб.</td>
                            </tr>
                            <tr>
                                <td>Списание 28.09.2022 г.</td>
                                <td className='text-end fw-7'>- 345 руб.</td>
                            </tr>
                            <tr>
                                <td>Списание 28.09.2022 г.</td>
                                <td className='text-end fw-7'>- 345 руб.</td>
                            </tr>
                            <tr>
                                <td>Пополнение 12.09.2022 г.</td>
                                <td className='text-end fw-7'>+ 2 000 руб.</td>
                            </tr>
                            <tr>
                                <td>Списание 28.09.2022 г.</td>
                                <td className='text-end fw-7'>- 345 руб.</td>
                            </tr>
                            <tr>
                                <td>Списание 28.09.2022 г.</td>
                                <td className='text-end fw-7'>- 345 руб.</td>
                            </tr>
                            <tr>
                                <td>Пополнение 12.09.2022 г.</td>
                                <td className='text-end fw-7'>+ 2 000 руб.</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            }
            
        </div>
    );
};

export default Finance;