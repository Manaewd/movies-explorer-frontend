import React from "react";

import "./Promo.css"
import Logo from "../../images/landing-logo.svg"

function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className="promo__link" href="#about-me">Узнать больше</a>
            </div>
            <img className="promo__logo" alt="Логотип" src={Logo}/>
        </section>
    )
}

export default Promo;