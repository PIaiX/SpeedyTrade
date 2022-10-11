import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { HiArrowNarrowRight } from "react-icons/hi";
import { VscChromeClose } from "react-icons/vsc";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/mousewheel';
import 'swiper/css/free-mode';

import { Link } from "react-scroll";

function Sort(props) {
    const [showSort, setShowSort] = useState(false)
    const handleCloseSort = () => setShowSort(false)
    const handleShowSort = () => setShowSort(true)

    const offsetT = -80;

    const Arr = [
        {text: 'Топ', to: 'sort-1'}, 
        {text: '0–9', to: 'sort-2'}, 
        {text: 'A', to: 'sort-3'}, 
        {text: 'B', to: 'sort-4'}, 
        {text: 'C', to: 'sort-5'}, 
        {text: 'D', to: 'sort-6'}, 
        {text: 'E', to: 'sort-7'}, 
        {text: 'F', to: 'sort-8'}, 
        {text: 'G', to: 'sort-9'}, 
        {text: 'H', to: 'sort-10'}, 
        {text: 'I', to: 'sort-11'}, 
        {text: 'J', to: 'sort-12'}, 
        {text: 'K', to: 'sort-13'}, 
        {text: 'L', to: 'sort-14'}, 
        {text: 'M', to: 'sort-15'}, 
        {text: 'N', to: 'sort-16'}, 
        {text: 'O', to: 'sort-17'}, 
        {text: 'P', to: 'sort-18'}, 
        {text: 'Q', to: 'sort-19'}, 
        {text: 'R', to: 'sort-20'}, 
        {text: 'S', to: 'sort-21'}, 
        {text: 'T', to: 'sort-22'}, 
        {text: 'U', to: 'sort-23'}, 
        {text: 'V', to: 'sort-24'}, 
        {text: 'W', to: 'sort-25'}, 
        {text: 'X', to: 'sort-26'}, 
        {text: 'Y', to: 'sort-27'}, 
        {text: 'Z', to: 'sort-28'}, 
        {text: 'А', to: 'sort-29'}, 
        {text: 'Б', to: 'sort-30'}, 
        {text: 'В', to: 'sort-31'}, 
        {text: 'Г', to: 'sort-32'},
        {text: 'Д', to: 'sort-33'},
        {text: 'Е', to: 'sort-34'},
        {text: 'Ж', to: 'sort-35'},
        {text: 'З', to: 'sort-36'},
        {text: 'И', to: 'sort-37'}, 
        {text: 'К', to: 'sort-38'},
        {text: 'Л', to: 'sort-39'}, 
        {text: 'М', to: 'sort-40'}, 
        {text: 'Н', to: 'sort-41'}, 
        {text: 'О', to: 'sort-42'}, 
        {text: 'П', to: 'sort-43'}, 
        {text: 'Р', to: 'sort-44'}, 
        {text: 'С', to: 'sort-45'}, 
        {text: 'Т', to: 'sort-46'}, 
        {text: 'У', to: 'sort-47'}, 
        {text: 'Ф', to: 'sort-48'}, 
        {text: 'Х', to: 'sort-49'}, 
        {text: 'Ц', to: 'sort-50'}, 
        {text: 'Ч', to: 'sort-51'}, 
        {text: 'Ш', to: 'sort-52'}, 
        {text: 'Щ', to: 'sort-53'},
        {text: 'Э', to: 'sort-54'},
        {text: 'Ю', to: 'sort-55'},
        {text: 'Я', to: 'sort-56'},
    ];

    const [sortSwiper, setSortSwiper] = useState(null);
    const updateSlider = (i) => {
        sortSwiper.slideTo(i)
    }


    return (
        <>
        <div className='sort'>
            <Swiper
                loop={false}
                spaceBetween={0}
                slidesPerView={'auto'}
                watchSlidesProgress={true}
                modules={[FreeMode, Mousewheel]}
                mousewheel={true}
                onSwiper={setSortSwiper}
            >
                {
                    Arr.map((obj, index) => {
                        return <SwiperSlide key={obj.to}>
                            <Link className='btn-3' activeClass="active" to={obj.to} spy={true} smooth={true} offset={offsetT} duration={500} onSetActive={() => updateSlider(index)}>{obj.text}</Link>
                        </SwiperSlide>
                    })
                }
            </Swiper>
            <hr className='vertical mx-3'/>
            <button type='button' className='sort-more' onClick={handleShowSort}>
                <HiArrowNarrowRight />
            </button>
        </div>
        <Offcanvas show={showSort} placement={'end'} onHide={handleCloseSort}>
            <Offcanvas.Body>
                <Container className='h-100 d-flex flex-column justify-content-between px-sm-5'>
                    <div className='d-flex align-itemc-center justify-content-between'>
                        <h3>Каталог</h3>
                        <button type='button' onClick={handleCloseSort} className='btn-4 px-3 py-2'>
                            <VscChromeClose/>
                        </button>
                    </div>
                    <div className='scrollable-area flex-1 mt-4' >
                        <Row xs={4} className='g-3 g-sm-4'>
                            {
                                Arr.map((obj, index) => {
                                    return <Col key={obj.to}>
                                        <Link className='btn-4 px-2 w-100' activeClass="active" to={obj.to} spy={true} smooth={true} offset={offsetT} duration={500} onClick={handleCloseSort} onSetActive={() => updateSlider(index)}>{obj.text}</Link>
                                    </Col>
                                })
                            }
                        </Row>
                    </div>
                </Container>
            </Offcanvas.Body>
        </Offcanvas>
        </>
    );
}

export default Sort;