import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Validation from "../../hooks/useFormAndValidation";

import "./Profile.css";

function Profile({ onSignOut, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, isValid, errors, handleChange, setValues } = Validation();
  const [disabled, setDisabled] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setIsChanged(
      values.name !== currentUser.name || values.email !== currentUser.email
    );
  }, [values, currentUser]);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  function handleInputsChange(evt) {
    handleChange(evt);
  }

  if (isSubmit) {
    return;
  }

  function handleSubmitProfile(evt) {
    evt.preventDefault();

    setIsSubmit(true);

    onUpdateUser({ name: values.name, email: values.email });

    setTimeout(() => {
      setIsSubmit(false);
    }, 2000);
  }

  const handleRequiredCondition =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <main>
      <section className="profile">
        <div className="profile__content">
          <h1 className="profile__title">{`Привет, ${
            currentUser.name || ""
          }!`}</h1>
          <form
            className="profile__form"
            id="submit"
            name="profile"
            onSubmit={handleSubmitProfile}
          >
            <div className="profile__inputs">
              <label className="profile__input-label">
                Имя
                <input
                  type="text"
                  className="profile__input"
                  name="name"
                  placeholder="Введите имя"
                  minLength={2}
                  maxLength={30}
                  value={values.name || ""}
                  onChange={handleInputsChange}
                  disabled={disabled}
                  required
                />
              </label>
              <span className="profile__input-error profile__input-error_name">
                {errors.name}
              </span>
              <label className="profile__input-label">
                E-mail
                <input
                  type="email"
                  placeholder="Введите email"
                  minLength={2}
                  maxLength={30}
                  className="profile__input"
                  name="email"
                  value={values.email || ""}
                  onChange={handleInputsChange}
                  required
                  disabled={disabled}
                />
              </label>
              <span className="profile__input-error profile__input-error_email">
                {errors.email}
              </span>
            </div>
            <div className="profile__btn-container">
              <button
                type="submit"
                disabled={handleRequiredCondition}
                className="profile__btn"
              >
                Редактировать
              </button>
              <Link
                to="/"
                className="profile__btn profile__btn_red"
                onClick={onSignOut}
              >
                Выйти из аккаунта
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Profile;
