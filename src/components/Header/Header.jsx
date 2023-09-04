import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import NavTab from '../NavTab/NavTab';
import Logo from '../../components/images/logo.svg'
import './Header.css'

export default function Header({ isLoggedIn, isOpen, onClose, onMenuOpen }) {

  return (
    <Routes>
      <Route path='/' element={isLoggedIn ? (
        <header className="header">
            <NavTab
              isOpen={isOpen}
              onClose={onClose}
              onMenuOpen={onMenuOpen}
            />
        </header>
      ) : (
        <header className="header">
          <div className='header__main'>
          <Link to='/'> <img src={Logo} alt="Логотип" className="header__logo" /></Link>
          <nav className="header__menu">
              <Link to='/signup' href="" className="header__register"> Регистрация</Link>
              <Link to='/signin' className="header__login"> Войти</Link>
          </nav>
          </div>
        </header>)
      } />

      <Route path='/movies' element={
        <header className="header">
            <NavTab
              isOpen={isOpen}
              onClose={onClose}
              onMenuOpen={onMenuOpen}
            />
        </header>
      } />

      <Route path='/saved-movies' element={
        <header className="header">
            <NavTab
              isOpen={isOpen}
              onMenuOpen={onMenuOpen}
              onClose={onClose}
            />
        </header>
      } />

      <Route path='/profile' element={
        <header className="header">
            <NavTab
              isOpen={isOpen}
              onMenuOpen={onMenuOpen}
              onClose={onClose}
            />
        </header>
      } />
    </Routes >
  );
};