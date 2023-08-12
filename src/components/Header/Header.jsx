import React from 'react';
import { Link, NavLink } from "react-router-dom";
import logo from '../../components/images/logo.svg';
import profile from '../../components/images/icon-profile.svg';
import './Header.css';

function Header({ loggedIn }) {
    const setNavLinkClass = ({ isActive }) =>
    isActive ? "header__nav-link header__nav-link_active" : "header__nav-link";

    return (
        <header className="header">
            {!loggedIn &&
                <>
                    <img className="header__logo" src={logo} alt="Логотип" />
                    <nav className="header__nav">
                        <Link className="header__link" to="/signup" >Регистрация</Link>
                        <Link className="header__link" to="/signin">Войти</Link>
                    </nav>
                </>
            }
            {loggedIn &&
                <>
                    <input type="checkbox" id="check" />
                    <Link className="header__logo-link" to="/">
                        <img className="header__logo" src={logo} alt="Логотип" />
                    </Link>
                    <div className="header__overlay" />
                    <nav className="header__menu">
                        <div className="header__links-container">
                            <NavLink className={setNavLinkClass} to="/" id="home-link">Главная</NavLink>
                            <NavLink className={setNavLinkClass} to="/movies">Фильмы</NavLink>
                            <NavLink className={setNavLinkClass} to="/saved-movies">Сохранённые фильмы</NavLink>
                        </div>
                        <Link className="header__link_profile" to="/profile">
                            <img className="header__link_profile-img" src={profile} alt="Аккаунт" />
                            <p className="header__link_profile-text">Аккаунт</p>
                        </Link>
                    </nav>
                </>
            }
        </header>
    );
};

export default Header;