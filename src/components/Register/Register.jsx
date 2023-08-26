import React, { useState } from "react";
import { Link, Route } from 'react-router-dom';

import Logo from '../images/logo.svg';

export default function Register({ loggedIn, onRegister }) {

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
        <main className='register form'>
            <section className='form__container'>
                <Link to='/'>
                    <img className='form__logo interactive-button' src={Logo} alt='Логотип'/>
                </Link>
                <h1 className='form__title'>Добро пожаловать!</h1>
                <form className='form__content' onSubmit={handleSubmit}>
                    <ul className='form__sections'>
                        <li className='form__section'>
                            <label className='form__input-title' htmlFor='name-register-input'>Имя</label>
                            <input
                                type='text'
                                className='form__input form__input_type_name'
                                id='name-register-input'
                                name='name'
                                minLength='2'
                                maxLength="40"
                                placeholder="Имя пользователя"
                                required
                            />
                            <p className='form__input-error'/>
                        </li>
                        <li className='form__section'>
                            <label className='form__input-title' htmlFor='email-register-input'>E-mail</label>
                            <input
                                onChange={handleEmailChange}
                                type='email'
                                className='form__input form__input_types_email'
                                id='email-register-input'
                                name='email'
                                minLength='2'
                                placeholder="Электронная почта"
                                required
                            />
                            <p className='form__input-error'/>
                        </li>
                        <li className='form__section'>
                            <label className='form__input-title' htmlFor='password-register-input'>Пароль</label>
                            <input
                                onChange={handlePasswordChange}
                                className='form__input form__input_type_password'
                                id='password-register-input'
                                type='password'
                                name='password'
                                minLength='8'
                                maxLength="40"
                                placeholder="Пароль"
                                required
                            />
                            <p className='form__input-error'>Что-то пошло не так...</p>
                        </li>
                    </ul>
                    <button className='register__enter form__enter interactive-button' type='submit' aria-label='Зарегистрировать аккаунт'>Зарегистрироваться</button>
                </form>
                <p className='form__footnote'>
                    Уже зарегистрированы?
                    <Link to='/signin' className='form__footnote-link interactive-link'>Войти</Link>
                </p>
            </section>
        </main>
    );
}