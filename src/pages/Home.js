import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination, Navigation, EffectFade, Autoplay, Mousewheel } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/mousewheel';

import GameMini from '../components/GameMini';
import GameMidi from '../components/GameMidi';
import GameLarge from '../components/GameLarge';
import Sort from '../components/Sort';
import ChatWindow from '../components/ChatWindow';

import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import News from '../components/News';

export default function Home(props) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <main>
            <Container fluid="md" className='px-mobile-0'>
                <section className='main-slider mb-6'>
                    <Swiper
                        loop={false}
                        effect={"fade"}
                        spaceBetween={20}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[EffectFade, Thumbs, Pagination, Navigation, Autoplay]}
                        pagination={{ 
                            el: '.swiper-pagination',
                            type: 'progressbar',
                            clickable: true,
                            
                         }}
                        navigation={{
                            nextEl: ".swiper-button-next",
                            prevEl: ".swiper-button-prev",
                        }}
                        className="mainslides"
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                pagination: false
                            },
                        }}
                    >
                        <SwiperSlide>
                            <GameLarge title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} description={'Игра абсолютно бесплатная и вас никто не ограничивает по времени пребывания в этом мире. Во-вторых, абсолютно все предметы, необходимые для ваших героев, можно добыть стандартным путём'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Tanks: Blitz'} imgLink={'imgs/slider-main/wot.jpg'} description={'Игра абсолютно бесплатная и вас никто не ограничивает по времени пребывания в этом мире. Во-вторых, абсолютно все предметы, необходимые для ваших героев, можно добыть стандартным путём'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Warcraft: Shadowlands'} imgLink={'imgs/slider-main/wow.jpg'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Warcraft: WotLK Classic'} imgLink={'imgs/slider-main/wow2.jpg'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Warcraft'} imgLink={'imgs/slider-main/wow3.jpg'} description={'Игра абсолютно бесплатная и вас никто не ограничивает по времени пребывания в этом мире. Во-вторых, абсолютно все предметы, необходимые для ваших героев, можно добыть стандартным путём'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} description={'Игра абсолютно бесплатная и вас никто не ограничивает по времени пребывания в этом мире. Во-вторых, абсолютно все предметы, необходимые для ваших героев, можно добыть стандартным путём'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Tanks: Blitz'} imgLink={'imgs/slider-main/wot.jpg'} description={'Игра абсолютно бесплатная и вас никто не ограничивает по времени пребывания в этом мире. Во-вторых, абсолютно все предметы, необходимые для ваших героев, можно добыть стандартным путём'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Warcraft: Shadowlands'} imgLink={'imgs/slider-main/wow.jpg'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Warcraft: WotLK Classic'} imgLink={'imgs/slider-main/wow2.jpg'} description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameLarge title={'World of Warcraft'} imgLink={'imgs/slider-main/wow3.jpg'} description={'Игра абсолютно бесплатная и вас никто не ограничивает по времени пребывания в этом мире. Во-вторых, абсолютно все предметы, необходимые для ваших героев, можно добыть стандартным путём'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </SwiperSlide>
                        <div className="swiper-button-prev">
                            <HiArrowNarrowLeft />
                        </div>
                        <div className="swiper-button-next">
                            <HiArrowNarrowRight />
                        </div>
                    </Swiper>
                    <Swiper
                        direction="vertical"
                        loop={false}
                        spaceBetween={20}
                        slidesPerView={5}
                        watchSlidesProgress={true}
                        modules={[Thumbs, Autoplay, Mousewheel]}
                        mousewheel={true}
                        className="thumbslides"
                        onSwiper={setThumbsSwiper}
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                        }}
                    >
                        <SwiperSlide>
                            <GameMini title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Tanks: Blitz'} imgLink={'imgs/slider-main/wot.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Warcraft: Shadowlands'} imgLink={'imgs/slider-main/wow.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Warcraft: WotLK Classic'} imgLink={'imgs/slider-main/wow2.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Warcraft'} imgLink={'imgs/slider-main/wow3.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Tanks: Blitz'} imgLink={'imgs/slider-main/wot.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Warcraft: Shadowlands'} imgLink={'imgs/slider-main/wow.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Warcraft: WotLK Classic'} imgLink={'imgs/slider-main/wow2.jpg'}/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <GameMini title={'World of Warcraft'} imgLink={'imgs/slider-main/wow3.jpg'}/>
                        </SwiperSlide>
                    </Swiper>
                </section>
            </Container>

            <Container>
                <h1>Каталог игр</h1>
                <Sort />

                <section className='mt-6 mb-6'>
                    <div className='d-flex align-items-center mb-4 mb-sm-5'>
                        <h3>Топ</h3>
                        <hr className='horizontal flex-1 ms-4'/>
                    </div>
                    <Row xs={2} md={3} lg={4} className='gy-4 gy-sm-5 gx-2 gx-sm-4 gx-xl-5'>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                    </Row>
                </section>

                <section className='mb-6'>
                    <div className='d-flex align-items-center mb-4 mb-sm-5'>
                        <h3>0–9</h3>
                        <hr className='horizontal flex-1 ms-4'/>
                    </div>
                    <Row xs={2} md={3} lg={4} className='gy-5 gx-4 gx-xl-5'>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                    </Row>
                </section>

                <section className='mb-6'>
                    <div className='d-flex align-items-center mb-4 mb-sm-5'>
                        <h3>Aa</h3>
                        <hr className='horizontal flex-1 ms-4'/>
                    </div>
                    <Row xs={2} md={3} lg={4} className='gy-5 gx-4 gx-xl-5'>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                        <Col>
                            <GameMidi title={'Genshin Impact'} imgLink={'imgs/slider-main/genshin.jpg'} subLinksArr={[
                                {link: '/', anchor: 'Золото'},
                                {link: '/', anchor: 'Серебро'},
                                {link: '/', anchor: 'Аккаунты'},
                                {link: '/', anchor: 'Прокачка'},
                                {link: '/', anchor: 'Наборы'},
                                {link: '/', anchor: 'Донат'},
                                {link: '/', anchor: 'Обучение'},
                            ]}/>
                        </Col>
                    </Row>
                </section>

                <hr className='horizontal mb-5'/>

                <section className='mb-6'>
                    <Row>
                        <Col md={8} className='pe-md-5'>
                            <ChatWindow />
                        </Col>
                        <Col md={4} className='d-none d-md-block'>
                            <div className='d-flex justify-content-between align-items-baseline'>
                                <h2 className='mb-0'>Новости</h2>
                                <div>24 сентября</div>
                                <a href='/'>все новости</a>
                            </div>
                            <News />
                            <News />
                            <News />
                            <News />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
}