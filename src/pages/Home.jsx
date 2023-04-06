import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Mousewheel, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'

import GameMini from '../components/GameMini'
import GameMidi from '../components/GameMidi'
import GameLarge from '../components/GameLarge'
import Sort from '../components/Sort'
import ChatWindow from '../components/ChatWindow'

import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import News from '../components/News'
import SortSection from '../components/SortSection'
import { getImageURL } from '../helpers/image'
import { useSelector } from 'react-redux'
import useGetBanner from '../hooks/axios/getBanner'
import useGetCatalogAllGame from '../hooks/axios/getCatalogAllGame'
import useGetAllNews from '../hooks/axios/getAllNews'

const Home = () => {
    const theme = useSelector((state) => state?.theme?.mode)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const { banner } = useGetBanner()
    const { allGames } = useGetCatalogAllGame()
    const { news } = useGetAllNews()

    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

    return (
        <main>
            <SortSection />
            <Container fluid="md" className="px-mobile-0">
                <section className="main-slider mb-6">
                    {/* Banner ------------------------------------------------------------------------------------- */}
                    <Swiper
                        loop={false}
                        effect={'fade'}
                        spaceBetween={20}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        modules={[EffectFade, Thumbs, Navigation, Autoplay]}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        className="mainslides"
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            768: {
                                pagination: false,
                            },
                        }}
                    >
                        {banner.isLoaded ? (
                            banner.items?.length > 0 ? (
                                banner.items?.map((i) => (
                                    <SwiperSlide key={i.id}>
                                        <GameLarge
                                            title={i.game?.name}
                                            slug={i.game?.slug}
                                            imgLink={getImageURL(i.image)}
                                            description={i.description}
                                            subLinksArr={i.game?.categories}
                                            regions={i.game?.regions}
                                        />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <h6>Игр нет</h6>
                            )
                        ) : null}
                        <div className="swiper-button-prev btn-2">
                            <HiArrowNarrowLeft />
                        </div>
                        <div className="swiper-button-next btn-2">
                            <HiArrowNarrowRight />
                        </div>
                    </Swiper>

                    {/* Game select for banner --------------------------------------------------------------------- */}
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
                        {banner.isLoaded ? (
                            banner.items?.length > 0 ? (
                                banner.items?.map((i) => (
                                    <SwiperSlide key={i.id}>
                                        <GameMini title={i.game?.name} imgLink={getImageURL(i.image)} />
                                    </SwiperSlide>
                                ))
                            ) : (
                                <h6>Игр нет</h6>
                            )
                        ) : null}
                    </Swiper>
                </section>
            </Container>

            <Container>
                <h1>Каталог игр</h1>
                <div id="sort">
                    <Sort />
                </div>

                {/* Top games -------------------------------------------------------------------------------------- */}
                {allGames?.items?.filter((i) => i.isTop === true)?.length > 0 && (
                    <section id="sort-1" className="mt-6 mb-6">
                        <div className="d-flex align-items-center mb-4 mb-sm-5">
                            <h3>Топ</h3>
                            <hr className="horizontal flex-1 ms-4" />
                        </div>
                        <Row xs={2} md={3} lg={4} className="gy-4 gy-sm-5 gx-2 gx-sm-4 gx-xl-5">
                            {allGames?.items
                                ?.filter((i) => i.isTop === true)
                                ?.map((i) => (
                                    <Col key={i.id}>
                                        <GameMidi
                                            title={i.name}
                                            slug={i.slug}
                                            imgLink={getImageURL(i.logo)}
                                            subLinksArr={i?.categories}
                                            regions={i?.regions}
                                        />
                                    </Col>
                                ))}
                        </Row>
                    </section>
                )}

                {/* Games starts with number ----------------------------------------------------------------------- */}
                {allGames?.items?.filter((i) =>
                    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']?.includes(i?.name?.toString()[0])
                )?.length > 0 && (
                        <section id="sort-2" className="mb-6">
                            <div className="d-flex align-items-center mb-4 mb-sm-5">
                                <h3>0–9</h3>
                                <hr className="horizontal flex-1 ms-4" />
                            </div>
                            <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                                {allGames?.items
                                    ?.filter((i) =>
                                        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']?.includes(
                                            i?.name?.toString()[0]
                                        )
                                    )
                                    ?.map((i) => (
                                        <Col key={i.id}>
                                            <GameMidi
                                                title={i.name}
                                                slug={i.slug}
                                                imgLink={getImageURL(i.logo)}
                                                subLinksArr={i?.categories}
                                                regions={i?.regions}
                                            />
                                        </Col>
                                    ))}
                            </Row>
                        </section>
                    )}

                {/* Games starts with letter ----------------------------------------------------------------------- */}
                {letters.map(
                    (letter, index) =>
                        allGames?.items?.filter((i) => i?.name?.toLowerCase().startsWith(letter))?.length > 0 && (
                            <section id={`sort-${index + 3}`} className="mb-6" key={`letter-${letter}`}>
                                <div className="d-flex align-items-center mb-4 mb-sm-5">
                                    <h3>{letter.toUpperCase()}</h3>
                                    <hr className="horizontal flex-1 ms-4" />
                                </div>
                                <Row xs={2} md={3} lg={4} className="gy-5 gx-4 gx-xl-5">
                                    {allGames?.items
                                        ?.filter((i) => i?.name?.toLowerCase().startsWith(letter))
                                        ?.map((i) => (
                                            <Col key={i.id}>
                                                <GameMidi
                                                    title={i.name}
                                                    slug={i.slug}
                                                    imgLink={getImageURL(i.logo)}
                                                    subLinksArr={i?.categories}
                                                    regions={i?.regions}
                                                />
                                            </Col>
                                        ))}
                                </Row>
                            </section>
                        )
                )}

                <hr className="horizontal mb-5" />

                {/* Chat and news ---------------------------------------------------------------------------------- */}
                <section className="mb-6">
                    <Row className="flex-lg-row-reverse">
                        {/* News column -------------------------------------------- */}
                        <Col lg={5} xxl={4} className="d-none d-md-block mb-5">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <h2 className="mb-0">Новости</h2>
                                <Link to="/news">все новости</Link>
                            </div>
                            {news?.isLoaded ? (
                                news?.meta?.total > 0 ? (
                                    news?.items?.map((i) => (
                                        <News
                                            createdAt={i.createdAt}
                                            suptitle={i.suptitle}
                                            slug={i.slug}
                                            image={i.image}
                                            title={i.title}
                                            key={i.id}
                                            readingTimeFrom={i.readingTimeFrom}
                                        />
                                    ))
                                ) : (
                                    <h6>Ничего нет</h6>
                                )
                            ) : null}
                        </Col>

                        {/* Chat column -------------------------------------------- */}
                        <Col lg={7} xxl={8} className="pe-xxl-5">
                            <ChatWindow />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Home
