import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { EMAIL } from '../../utils/constants'
import './Login.css';
import Logo from '../images/logo.svg';
import Validation from '../../hooks/useFormAndValidation';

export default function Login({ onLogin }) {
    const { values, errors, isValid, handleChange } = Validation();
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage,] = useState('');

    function handleInputChange(evt) {
        handleChange(evt);
        cleanErrorMessage();
      }
    
      function cleanErrorMessage() {
        setErrorMessage('');
      }
  
    function handleSubmit(evt) {
        evt.preventDefault()
      onLogin({ email: values.email, password: values.password,
      })
      setTimeout(() => { setDisabled(false);
      }, 2000);
    }

    return (
        <main className='login form'>
            <section className='form__container'>
                <Link to='/'>
                    <img className='form__logo interactive-button' src={Logo} alt='Логотип'/>
                </Link>
                <h1 className='form__title'>Рады видеть!</h1>
                <form className='form__content' onSubmit={handleSubmit}>
                    <ul className='form__sections'>
                        <li className='form__section'>
                            <label className='form__input-title' htmlFor='email-login-input'>E-mail</label>
                            <input
                                onChange={handleInputChange}
                                className='form__input form__input_type_email'
                                id='email-login-input'
                                type='email'
                                name='email'
                                minLength='2'
                                maxLength='40'
                                placeholder="Электронная почта"
                                pattern={EMAIL}
                                value={values.email || ''}
                                disabled={disabled}
                                required
                            />
                            <span className='form__input-error'>
                                {errors.email}
                            </span>
                        </li>
                        <li className='form__section'>
                            <label className='form__input-title' htmlFor='password-login-input'>Пароль</label>
                            <input
                                onChange={handleInputChange}
                                className='form__input form__input_type_password'
                                id='password-login-input'
                                type='password'
                                name='password'
                                minLength='5'
                                maxLength='40'
                                placeholder="Пароль"
                                disabled={disabled}
                                required
                            />
                            <span className='form__input-error'>
                                {errors.password}
                            </span>
                            <p className={`auth__error-message ${errorMessage && 'auth__error-message_visible'}`}>{errorMessage}</p>
                        </li>
                    </ul>
                    <button className={`login__enter ${!isValid && 'form__enter interactive-button'}`} type='submit' aria-label='Войти в свой аккаунт'>
                        Войти
                    </button>
                </form>
                <p className='form__footnote'>
                    Ещё не зарегистрированы?
                    <Link to='/signup' className='form__footnote-link interactive-link'>Регистрация</Link>
                </p>
            </section>
        </main>
    );
}