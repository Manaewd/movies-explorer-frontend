import React from "react";
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
    <section className="profile">
      <NavTab setIsOpened={setMenuOpened} />
      <div className="profile__content">
        <h2 className="profile__title">Привет, {user.name}!</h2>
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
          <button
            className="profile__btn"
            type="submit"
            aria-label="Редактировать"
          >
            Редактировать
          </button>
          <button
            className="profile__btn profile__btn_red"
            type="submit"
            aria-label="Выйти"
          >
            Выйти из аккаунта
          </button>
        </div>
        <SideBar isOpened={menuOpened} menuClosed={menuClosed} />
      </div>
    </section>
  );
}

export default Profile;