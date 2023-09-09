import { useNavigate } from 'react-router-dom';
import "./PageNotFound.css";

function PageNotFound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    return (
        <main className="error">
            <section className="error__container">
                <h1 className="error__title">404</h1>
                <p className="error__subtitle">Страница не найдена</p>
                <button to={'/'} className="error__link" onClick={handleClick}>Назад</button>
            </section>
        </main>
    )
}

export default PageNotFound;