import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import logo from "../images/logo.svg"

function Register({ loggedIn, onRegister }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (loggedIn) {
    return <Route to="/" />;
  }

  function handleEmailChange(e){
    setEmail(e.target.value)
  }

  function handlePasswordChange(e){
    setPassword(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onRegister({email, password})
  }

  return (
    <section className="register">
    <img className="form__logo" src={logo} alt="Логотип"></img>
    <h2 className="form__title">Добро пожаловать!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label>
          <input
            // id="email"
            onChange={handleEmailChange}
            type="email"
            name="email"
            autoComplete="email"
            placeholder=""
            className="form__input"
            required
            value={email || ""}
          ></input>
        </label>
        <label>
          <input
            // id="password"
            onChange={handlePasswordChange}
            autoComplete="new-password"
            required
            type="password"
            name="password"
            placeholder=""
            className="form__input"
            value={password || ""}
          ></input>
        </label>
        <button type="submit" className="form__button" aria-label="Зарегистрироваться">
          Зарегистрироваться
        </button>
      </form>
      <div className="form__container">
        <p className="form__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="form__link">
            Войти
        </Link>
      </div>
      </section>
  );
}

export default Register;