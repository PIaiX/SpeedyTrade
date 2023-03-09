import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import News from '../components/News';
import Skeleton from 'react-loading-skeleton';
import {useSelector} from 'react-redux';
import useGetAllNews from '../hooks/axios/getAllNews';
import NewsMidi from '../components/NewsMidi';
import Pagination from '../components/Pagination';

const AllNews = () => {
  const theme = useSelector((state) => state?.theme?.mode);
  const {news} = useGetAllNews();
  return (
    <main>
      <Container>
        <section className='news-all mb-5'>
          <h1>Новости</h1>
          <Row className='gx-4 gx-xl-5'>
            <Col xs={12} lg={7} xxl={8}>
              <div className="box">
                <h2>Последние новости</h2>
                <ul className='news-list mb-5'>
                  <li><NewsMidi/></li>
                  <li><NewsMidi/></li>
                  <li><NewsMidi/></li>
                  <li><NewsMidi/></li>
                </ul>
                <Pagination/>
              </div>
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

export default AllNews;