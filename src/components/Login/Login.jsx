import './Login.css';
import Logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <main className='login form'>
            <Link to='/'>
                <img className='form__logo interactive-button' src={Logo} alt='Логотип'/>
            </Link>
            <h1 className='form__title'>Рады видеть!</h1>
            <form className='form__content'>
                <ul className='form__sections'>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='email-login-input'>E-mail</label>
                        <input className='form__input form__input_type_email' id='email-login-input' type='email' name='email' minLength='2' maxLength='40' required />
                        <p className='form__input-error'/>
                    </li>
                    <li className='form__section'>
                        <label className='form__input-title' htmlFor='password-login-input'>Пароль</label>
                        <input className='form__input form__input_type_password' id='password-login-input' type='password' name='password' minLength='8' required/>
                        <p className='form__input-error'/>
                    </li>
                </ul>
                <button className='login__enter form__enter interactive-button' type='submit' aria-label='Войти в свой аккаунт'>
                    Войти
                </button>
            </form>
            <p className='form__footnote'>
                Ещё не зарегистрированы?
                <Link to='/signup' className='form__footnote-link interactive-link'>Регистрация</Link>
            </p>
        </main>
    );
}