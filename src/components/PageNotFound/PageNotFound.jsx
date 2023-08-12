import React from "react";
import { Link } from 'react-router-dom';
import "./PageNotFound.css";

function PageNotFound() {
    return (
        <section className="page-not-found__code">
            <h2 className="page-not-found__title">404</h2>
            <p className="">Страница не найдена</p>
            <Link to={'/'} className="page-not-found__button">Назад</Link>
        </section>
    )
}

export default PageNotFound;