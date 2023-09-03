import { useState } from "react";
import { Link } from 'react-router-dom';
import Validation from '../../hooks/useFormAndValidation';
import { NAME, EMAIL } from '../../utils/constants'
import Logo from '../images/logo.svg';

export default function Register({ onRegister }) {
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
      onRegister({ name: values.name, email: values.email, password: values.password,
      })
      setTimeout(() => { setDisabled(false);
      }, 2000);
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
                                maxLength='40'
                                placeholder="Имя пользователя"
                                value={values.name || ''}
                                onChange={handleInputChange}
                                pattern={NAME}
                                required
                                disabled={disabled}
                            />
                            <p className='form__input-error'>{errors.name}</p>
                        </li>
                        <li className='form__section'>
                            <label className='form__input-title' htmlFor='email-register-input'>E-mail</label>
                            <input
                                onChange={handleInputChange}
                                type='email'
                                className='form__input form__input_types_email'
                                id='email-register-input'
                                name='email'
                                minLength='2'
                                maxLength='40'
                                value={values.email || ''}
                                placeholder="Электронная почта"
                                pattern={EMAIL}
                                required
                                disabled={disabled}
                            />
                            <p className='form__input-error'>{errors.email}</p>
                        </li>
                        <li className='form__section'>
                            <label className='form__input-title' htmlFor='password-register-input'>Пароль</label>
                            <input
                                onChange={handleInputChange}
                                className='form__input form__input_type_password'
                                id='password-register-input'
                                type='password'
                                name='password'
                                minLength='5'
                                maxLength='40'
                                value={values.password || ''}
                                placeholder="Пароль"
                                required
                                disabled={disabled}
                            />
                            <span className='form__input-error'>
                                {errors.password}
                            </span>
                            <p className={`auth__error-message ${errorMessage && 'auth__error-message_visible'}`}>{errorMessage}</p>
                        </li>
                    </ul>
                    <button className={`register__enter ${!isValid && 'form__enter interactive-button'}`} type='submit' aria-label='Зарегистрировать аккаунт'>
                        Зарегистрироваться
                    </button>
                </form>
                <p className='form__footnote'>
                    Уже зарегистрированы?
                    <Link to='/signin' className='form__footnote-link interactive-link'>Войти</Link>
                </p>
            </section>
        </main>
    );
}