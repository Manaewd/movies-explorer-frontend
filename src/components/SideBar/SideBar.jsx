import React from "react";
import { Link } from "react-router-dom";

import "./SideBar.css";
import closeButton from "../images/icon-close-menu.svg";

export default function SideBar({ isOpened, menuClosed }) {
  return (
    <>
      <div className={isOpened ? "sidebar" : "sidebar_hidden"}>
        <div className="sidebar__container">
          <div className="sidebar__shadow"></div>
          <nav className="sidebar__nav-container">
            <button
              className="sidebar__close-button"
              type="button"
              area-label="Закрыть меню"
              onClick={menuClosed}
            >
              <img src={closeButton} alt="closeButton" />
            </button>
            <ul className="sidebar__elements">
              <li className="sidebar__element" onClick={menuClosed}>
                <Link to="/" className="sidebar__link">
                  Главная
                </Link>
              </li>
              <li className="sidebar__element" onClick={menuClosed}>
                <Link to="/movies" className="sidebar__link">
                  Фильмы
                </Link>
              </li>
              <li className="sidebar__element" onClick={menuClosed}>
                <Link to="/saved-movies" className="sidebar__link">
                  Сохраненные фильмы
                </Link>
              </li>
            </ul>
            <div className="sidebar__account-element" onClick={menuClosed}>
              <Link to="/profile" className="sidebar__link">
                Аккаунт
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}