import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

// import NavTab from "../Main/NavTab/NavTab";
// import SideBar from "../Navigation/Navigation";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Validation from '../../hooks/useFormAndValidation';

import "./Profile.css";

function Profile({ onSignOut, onUpdateUser }) {

    // const [user, setUser] = React.useState({
    //     name: 'Виталий',
    //     email: 'pochta@yandex.ru',
    // });

    // // const handleChange = (e) => {
    // //     setUser(prevVal => ({
    // //         ...prevVal,
    // //         [e.target.name]: e.target.value
    // //     }));

    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, errors, handleChange, setValues } = Validation();
    const [disabled, setDisabled] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
  
    useEffect(() => {
      setIsChanged(values.name !== currentUser.name || values.email !== currentUser.email);
    }, [values, currentUser]);
  
    useEffect(() => {
      setValues({ name: currentUser.name, email: currentUser.email });
    }, [currentUser]);
  
  
    function handleInputsChange(evt) {
      handleChange(evt);
    }
  
    function handleSubmitProfile(evt) {
      evt.preventDefault();
  
      onUpdateUser({ name: values.name, email: values.email,
      });
  
      setTimeout(() => { setDisabled(false);
      }, 2000);
    }

    const handleRequiredCondition =
    !isValid ||
    (currentUser.name === values.name && currentUser.email === values.email);

  return (
    <main>
    <section className="profile">
      {/* <NavTab setIsOpened={setMenuOpened} /> */}
      <div className="profile__content">
        <h1 className="profile__title">{`Привет, ${currentUser.name || ''}!`}</h1>
        <form
          className="profile__form"
          id='submit'
          name='profile'
          onSubmit={handleSubmitProfile}
        >
        <div
          className='profile__inputs'
        >
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
              required
            />
          </label>
          <span className='profile__input-error profile__input-error_name'>{errors.name}</span>
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
          <span className='profile__input-error profile__input-error_email'>{errors.email}</span>
        </div>
        <div className="profile__btn-container">
          <button
            type='submit'
            disabled={handleRequiredCondition} className="profile__btn"
          >
            Редактировать
          </button>
          <Link to="/" className="profile__btn profile__btn_red" onClick={onSignOut}>Выйти из аккаунта</Link>
        </div>
        {/* <SideBar isOpened={menuOpened} menuClosed={menuClosed} /> */}
        </form>
      </div>
    </section>
    </main>
  );
}

export default Profile;