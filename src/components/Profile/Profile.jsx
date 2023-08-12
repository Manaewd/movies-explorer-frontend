import React from "react";
import "./Profile.css";
import {Link} from 'react-router-dom';

function Profile() {
    return (
        <section className="profile">
            <h2 className="profile__greeting">Привет, Виталий!</h2>
            <form className="profile__form">
            <label className="profile__label">
                Имя
                <input
                    disabled
                    className="profile__input"
                    type="text"
                    defaultValue="Виталий"
                />
            </label>
            <label className="profile__label">
                E-mail
                <input
                    disabled
                    className="profile__input"
                    type="text"
                    defaultValue="pochta@yandex.ru"
                />
            </label>
                <Link to="/profile" className="profile__button">Редактировать</Link>
                <Link to="/" className="profile__link">Выйти из аккаунта</Link>
            </form>
        </section>
    )
}

export default Profile;