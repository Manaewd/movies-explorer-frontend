import React from "react";

import "./Promo.css"
import landingLogo from "../../images/landing-logo.svg"

function Promo() {
    return (
        <section className="promo">
        <img className="promo__logo" alt="Логотип" src={landingLogo}/>
            <div>
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a className="promo__link" href="#about-project">Узнать больше</a>
            </div>
        </section>
    )
}

export default Promo;