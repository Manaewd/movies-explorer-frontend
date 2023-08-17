import React from "react";
import { Link } from 'react-router-dom';
import "./PageNotFound.css";

function PageNotFound() {
    return (
        <section className="error">
            <h2 className="error__title">404</h2>
            <p className="error__subtitle">Страница не найдена</p>
            <Link to={'/'} className="error__link">Назад</Link>
        </section>
    )
}

export default PageNotFound;