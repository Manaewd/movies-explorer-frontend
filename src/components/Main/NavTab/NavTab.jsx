import './NavTab.css';

export default function NavTab(){
    return(
        <nav className='navtab'>
            <ul className="navtab__items">
                <li className="navtab__item">
                    <a className="navtab__item-link" href="#about">
                        О проекте
                    </a>
                </li>
                <li className="navtab__item">
                    <a className="navtab__item-link" href="#techs">
                        Технологии
                    </a>
                </li>
                <li className="navtab__item">
                    <a className="navtab__item-link" href="#about-me">
                        Студент
                    </a>
                </li>
            </ul>
        </nav>
    )
}