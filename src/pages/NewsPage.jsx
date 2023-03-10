import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import News from '../components/News'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import useGetAllNews from '../hooks/axios/getAllNews'
import { useGetOneNewsQuery } from '../services/RTK/newsApi'
import { useParams } from 'react-router-dom'
import { getImageURL } from '../helpers/image'

const NewsPage = () => {
  const theme = useSelector((state) => state?.theme?.mode)
  const { news } = useGetAllNews()

  const { newsId } = useParams()
  const [slug, setSlug] = useState({ slug: '', skip: true })
  const { data, isFetching } = useGetOneNewsQuery(slug.slug, { skip: slug.skip })

  useEffect(() => {
    newsId && setSlug({ slug: newsId, skip: false })
  }, [newsId])

  return (
    <main>
      <Container>
        <section className='news-page pt-4 pt-md-0 mb-5'>
          <figure className='news-page-top'>
            <img src={getImageURL(data?.body?.image)} alt={data?.body?.title} />
            <figcaption><h1>{data?.body?.title}</h1></figcaption>
          </figure>
          <Row className='gx-4 gx-xl-5'>
            <Col xs={12} lg={7} xxl={8}>
              <h3>{data?.body?.suptitle}</h3>
              {data?.body?.description}
            </Col>
            <Col xs={12} lg={5} xxl={4} className='mt-5 mt-lg-0'>
              <div className="box">
                <h2>Популярное</h2>
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
                ) : (
                  <Skeleton
                    count={5}
                    baseColor={theme === 'dark' ? `#322054` : '#f05d66'}
                    highlightColor={theme === 'dark' ? `#5736db` : '#eb3349'}
                    width={'100%'}
                    height={'50px'}
                  />
                )}
              </div>
            </Col>
          </Row>
        </section>
      </Container>
    </main>
  );
};

export default NewsPage;