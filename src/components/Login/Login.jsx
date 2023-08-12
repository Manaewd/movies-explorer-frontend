import React from "react";
import logo from "../images/logo.svg"
import { Link } from "react-router-dom";

function Login() {

  return (
    <section className="login">
        <img className="form__logo" src={logo} alt="Логотип"></img>
        <h2 className="form__title">Рады видеть!</h2>
      <form className="form" >
        <input
          // id="email"
        //   onChange={handleEmailChange}
          type="email"
          name="email"
          autoComplete="email"
          placeholder=""
          className="form__input"
          required
        //   value={email || ""}
        ></input>
        <span id="email-error" className="form__error"/>
        <input
          // id="password"
        //   onChange={handlePasswordChange}
          autoComplete="new-password"
          required
          type="password"
          name="password"
          placeholder=""
          className="form__input"
        //   value={password || ""}
        ></input>
        <button type="submit" className="form__button" aria-label="Логин">
            Войти
        </button>
      </form>
      <div className="form_container">
            <p className="form__text"></p>
            <Link to="/signup" classname="form__link">Регистрация</Link>
        </div>
      </section>
  );
}

export default Login;