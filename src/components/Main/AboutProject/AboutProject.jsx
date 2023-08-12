import "./AboutProject.css";

export default function AboutProject() {
    return (
        <section className="about" id="about">
            <h2 className="about__title">О проекте</h2>
            <div className="about__container">
                <div className="about__item">
                    <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="about__description">
                        Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about__item">
                    <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="about__description">
                        У каждого этапа был мягкий и жёсткий дедлайн,
                        которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
                <div className="about__stats">
                    <div className="about__stats-time">
                        <h4 className="about__stats-lenght">1 неделя</h4>
                        <p className="about__stats-name">Back-end</p>
                    </div>
                    <div className="about__stats">
                        <h4 className="about__stats-lenght">4 недели</h4>
                        <p className="about__stats-name">Front-end</p>
                    </div>
                </div>
            </div>
        </section>
    );
};