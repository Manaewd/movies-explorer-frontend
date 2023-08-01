import React from "react";
import "./Footer.css";

function Footer() {
    return (
      <footer className="footer">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__container">
            <p className="footer__copiright">&copy; 2023</p>
            <nav className="footer__nav">
                <ul className="footer__nav_items">
                    <li className="footer__nav_item">
                        <a className="footer__nav-link" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__nav_item">
                        <a className="footer__nav-link" href="https://github.com/Manaewd">Github</a>
                    </li>
                </ul>
            </nav>
        </div>
      </footer>
    );
  }
  
  export default Footer;