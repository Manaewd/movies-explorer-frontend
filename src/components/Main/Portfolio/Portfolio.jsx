import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <nav className="portfolio__nav">
                <ul className='portfolio__list'>
                    <li className='portfolio__list-item'>
                        <Link className='portfolio__link' to='https://github.com/Manaewd'>Статичный сайт</Link>
                        {/* <button className="portfolio__link-icon" type="button" aria-label="Открыть ссылку">↗</button> */}
                    </li>
                    <li className='portfolio__list-item'>
                        <Link className='portfolio__link' to='https://github.com/Manaewd'>Адаптивный сайт</Link>
                        {/* <button className="portfolio__link-icon" type="button" aria-label="Открыть ссылку">↗</button> */}
                    </li>
                    <li className='portfolio__list-item'>
                        <Link className='portfolio__link' to='https://github.com/Manaewd'>Одностраничное приложение</Link>
                        {/* <button className="portfolio__link-icon" type="button" aria-label="Открыть ссылку">↗</button> */}
                    </li>
                </ul>
            </nav>
        </section>
    );
};

export default Portfolio;