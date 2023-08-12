import { Link } from 'react-router-dom';
import "./AboutMe.css";

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__section-title">Студент</h2>
            <div className=''>
                <div className="">
                    <h3 className="about-me__title">Виталий</h3>
                    <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__description">
                        Я родился и живу в Саратове, закончил факультет экономики СГУ.
                        У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
                        Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                        После того, как прошёл курс по веб-разработке,
                        начал заниматься фриланс-заказами и ушёл с постоянной работы.
                    </p>
                    <Link className='about-me__link' to={'https://github.com/Manaewd'}>Github</Link>
                </div>
                <img className='about-me__photo' src='me' alt='Фотография студента'/>
            </div>
        </section>
    );
};

export default AboutMe;