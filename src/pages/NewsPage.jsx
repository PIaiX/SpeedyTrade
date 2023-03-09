import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import News from '../components/News'
import Skeleton from 'react-loading-skeleton'
import {useSelector} from 'react-redux'
import useGetAllNews from '../hooks/axios/getAllNews'

const NewsPage = () => {
  const theme = useSelector((state) => state?.theme?.mode);
  const {news} = useGetAllNews();

  return (
    <main>
      <Container>
        <section className='news-page pt-4 pt-md-0 mb-5'>
          <figure className='news-page-top'>
            <img src="/images/avatar.jpg" alt="Название новости" />
            <figcaption><h1>Название новости</h1></figcaption>
          </figure>
          <Row className='gx-4 gx-xl-5'>
            <Col xs={12} lg={7} xxl={8}>
              <h3>Lorem ipsum dolor sit</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. </p>
              <p>Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.</p>
              <img src="/images/avatar.jpg" alt="Lorem ipsum dolor sit" className='img-fluid mb-4'/>
              <h3>Lorem ipsum dolor sit</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. </p>
              <p>Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci, ac laoreet turpis ligula. Phasellus faucibus vulputate ultrices feugiat pellentesque fringilla urna. Faucibus amet viverra mattis amet, odio tellus arcu, id ultrices.</p>
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