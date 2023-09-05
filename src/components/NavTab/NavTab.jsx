import { Link } from "react-router-dom";
import Sidebar from '../Sidebar/SideBar';

import "./NavTab.css";
import Logo from "../images/logo.svg";

function NavMenu({ isOpen, onClose, onMenuOpen }) {

  return (
    <nav className="navtab">
      <Link className="logo navtab__logo" to="/">
        <img src={Logo} alt="Логотип" />
      </Link>
      <div className="navtab__links">
        <Link className="navtab__link" to="/movies">Фильмы</Link>
        <Link className="navtab__link" to="/saved-movies">
          Сохранённые фильмы
        </Link>
      </div>
      <div className="navtab__profile">
        <Link className="navtab__profile-link animation-btn" to="/profile">Аккаунт</Link>
      </div>
      <button className="navtab__burger"
        onClick={onMenuOpen}
        type="button"
      ></button>
      <Sidebar
        isOpen={isOpen}
        onClose={onClose}
      />
    </nav>
  );
}

export default NavMenu;