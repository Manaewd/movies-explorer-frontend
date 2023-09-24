import React from "react";
import { NavLink } from "react-router-dom";

import "./BurgerMenu.css";
import closeButton from "../images/icon-close-menu.svg";

export default function BurgerMenu({ isOpen, onClose }) {
  return (
    <div className={isOpen ? "sidebar" : " sidebar sidebar_hidden"}>
      <div className="sidebar__container">
        <div className="sidebar__shadow"></div>
        <nav className="sidebar__nav-container">
          <button
            className="sidebar__close-button"
            type="button"
            onClick={onClose}
          >
            <img src={closeButton} alt="Кнопка закрытия" />
          </button>
          <ul className="sidebar__elements">
            <li className="sidebar__element" onClick={onClose}>
              <NavLink to="/" className="sidebar__link">
                Главная
              </NavLink>
            </li>
            <li className="sidebar__element" onClick={onClose}>
              <NavLink to="/movies" className="sidebar__link">
                Фильмы
              </NavLink>
            </li>
            <li className="sidebar__element" onClick={onClose}>
              <NavLink to="/saved-movies" className="sidebar__link">
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
          <div className="sidebar__account-element" onClick={onClose}>
            <NavLink to="/profile" className="sidebar__link">
              Аккаунт
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
