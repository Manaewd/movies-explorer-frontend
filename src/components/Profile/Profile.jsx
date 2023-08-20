import React from "react";
import {Link} from 'react-router-dom';

import NavTab from "../Main/NavTab/NavTab";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({ setMenuOpened, menuOpened, menuClosed }) {

    const [user, setUser] = React.useState({
        name: 'Виталий',
        email: 'pochta@yandex.ru',
    });

    // const handleChange = (e) => {
    //     setUser(prevVal => ({
    //         ...prevVal,
    //         [e.target.name]: e.target.value
    //     }));

  return (
    <main>
    <section className="profile">
      <NavTab setIsOpened={setMenuOpened} />
      <div className="profile__content">
        <h1 className="profile__title">Привет, {user.name}!</h1>
        <div className="profile__inputs">
          <label className="profile__input-label">
            Имя
            <input
              type="text"
              className="profile__input"
              placeholder="Виталий"
              name="name"
              required
            />
          </label>
          <label className="profile__input-label">
            E-mail
            <input
              type="email"
              className="profile__input"
              placeholder="pochta@yandex.ru"
              name="email"
              required
            />
          </label>
        </div>
        <div className="profile__btn-container">
          <Link to="/profile" className="profile__btn">Редактировать</Link>
          <Link to="/" className="profile__btn profile__btn_red">Выйти из аккаунта</Link>
        </div>
        <SideBar isOpened={menuOpened} menuClosed={menuClosed} />
      </div>
    </section>
    </main>
  );
}

export default Profile;