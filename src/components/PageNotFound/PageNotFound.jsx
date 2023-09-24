import React from "react";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./PageNotFound.css";

function PageNotFound() {

    const navigate = useNavigate()

    function handleMoveBack() {
        navigate(-1)
      }

    return (
        <main className="error">
            <section className="error__container">
                <h1 className="error__title">404</h1>
                <p className="error__subtitle">Страница не найдена</p>
                <Link to={'/'} className="error__link" onClick={handleMoveBack}>Назад</Link>
            </section>
        </main>
    )
}

export default PageNotFound;