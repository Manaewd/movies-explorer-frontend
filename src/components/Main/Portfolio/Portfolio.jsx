import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <nav className="portfolio__nav">
                <ul className='portfolio__list'>
                    <li className='portfolio__list-item'>
                        <Link
                          className='portfolio__link'
                          to='https://github.com/Manaewd/how-to-learn'
                          target='_blank'
                        >
                          Статичный сайт
                        </Link>
                    </li>
                    <li className='portfolio__list-item'>
                        <Link
                          className='portfolio__link'
                          to='https://github.com/Manaewd/russian-travel'
                          target='_blank'
                        >
                          Адаптивный сайт
                        </Link>
                    </li>
                    <li className='portfolio__list-item'>
                        <Link
                          className='portfolio__link'
                          to='https://github.com/Manaewd/react-mesto-api-full-gha'
                          target='_blank'
                        >
                          Одностраничное приложение
                        </Link>
                    </li>
                </ul>
            </nav>
        </section>
    );
};

export default Portfolio;