import { Link } from "react-router-dom";
import Validation from "../../hooks/useFormAndValidation";
import { NAME, EMAIL } from "../../utils/constants";
import Logo from "../images/logo.svg";

export default function Register({ onRegister, errorMessage }) {
  const { values, handleChange, isValid, errors, resetForm } = Validation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (isValid) {
      const { name, email, password } = values;
      onRegister(name, email, password);
    }
    resetForm();
  };

  return (
    <main className="register form">
      <section className="form__container">
        <Link to="/">
          <img
            className="form__logo interactive-button"
            src={Logo}
            alt="Логотип"
          />
        </Link>
        <h1 className="form__title">Добро пожаловать!</h1>
        <form className="form__content" isValid={isValid} onSubmit={handleSubmit} errorMessage={errorMessage}>
          <ul className="form__sections">
            <li className="form__section">
              <label
                className="form__input-title"
                htmlFor="name-register-input"
              >
                Имя
              </label>
              <input
                type="text"
                className="form__input form__input_type_name"
                id="name-register-input"
                name="name"
                minLength="2"
                maxLength="40"
                placeholder="Имя пользователя"
                value={values.name || ""}
                onChange={handleChange}
                pattern={NAME}
                required
              />
              <p className="form__input-error">{errors.name}</p>
            </li>
            <li className="form__section">
              <label
                className="form__input-title"
                htmlFor="email-register-input"
              >
                E-mail
              </label>
              <input
                onChange={handleChange}
                type="email"
                className="form__input form__input_types_email"
                id="email-register-input"
                name="email"
                minLength="2"
                maxLength="40"
                value={values.email || ""}
                placeholder="Электронная почта"
                pattern={EMAIL}
                required
              />
              <p className="form__input-error">{errors.email}</p>
            </li>
            <li className="form__section">
              <label
                className="form__input-title"
                htmlFor="password-register-input"
              >
                Пароль
              </label>
              <input
                onChange={handleChange}
                className="form__input form__input_type_password"
                id="password-register-input"
                type="password"
                name="password"
                minLength="5"
                maxLength="40"
                value={values.password || ""}
                placeholder="Пароль"
                required
              />
              <span className="form__input-error">{errors.password}</span>
              <p
                className={`auth__error-message ${
                  errorMessage && "auth__error-message_visible"
                }`}
              >
                {errorMessage}
              </p>
            </li>
          </ul>
          <button
            className={`register__enter form__enter ${
              !isValid && "form__enter_disabled"
            }`}
            type="submit"
            aria-label="Зарегистрировать аккаунт"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="form__footnote">
          Уже зарегистрированы?
          <Link to="/signin" className="form__footnote-link interactive-link">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}