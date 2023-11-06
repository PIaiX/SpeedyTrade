import React, { useLayoutEffect } from "react";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Meta from "../../components/Meta";
import Loader from "../../components/utils/Loader";
import { authActivate } from "../../services/auth";
import { useState } from "react";

const Activate = () => {
  const { key } = useParams();
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  useLayoutEffect(() => {
    if (auth.isAuth) {
      navigate("/account");
    } else {
      authActivate(key)
        .then(() => {
          setStatus(true);
          setLoading(false);
        })
        .catch(() => {
          setStatus(false);
          setLoading(false);
        });
    }
  }, [auth.isAuth]);

  if (loading) {
    return <Loader full />;
  }

  return (
    <main>
      <Meta title="Подтверждение почты" />
      <Container>
        <section className="hv-100 sec-login d-flex flex-column align-items-center justify-content-center">
          <h1 className="h2 text-center">
            {status
              ? "Вы успешно подтвердили почту"
              : "Ошибка при подтверждении почты"}
          </h1>
          <Link to="/login" className="btn btn-primary">
            Войти в профиль
          </Link>
        </section>
      </Container>
    </main>
  );
};

export default Activate;
