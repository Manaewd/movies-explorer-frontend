import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer__container page__section page__section_size_small">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__down">
          <p className="footer__year">&copy; {currentYear}</p>
          <ul className="footerlink">
            <li className="footerlink__buttons">
              <a
                href="https://practicum.yandex.ru/"
                className="footerlink__button footerlink__button_praktikum"
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footerlink__buttons">
              <a
                href="https://github.com/Manaewd"
                className="footerlink__button footerlink__button_github"
                target="_blank" rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;