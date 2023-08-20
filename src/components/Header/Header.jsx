import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/images/logo.svg'
import './Header.css'

export default function Header() {
  return (
   <header className='header'>
            <Link to='/'>
                <img className='header__logo' src={Logo} alt='логотип'></img>
            </Link>
            <nav className='header__menu'>
                <Link className='header__register animation-link' to='/signup'>Регистрация</Link>
                <Link className='header__login animation-btn' to='/signin'>Войти</Link>
            </nav>
   </header>
  )
}