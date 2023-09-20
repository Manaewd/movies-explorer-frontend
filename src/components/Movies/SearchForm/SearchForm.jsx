import { useState, useEffect, useCallback } from "react";
import './SearchForm.css';
import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';

function SearchForm(props) {
    const [request, setRequest] = useState('');
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        setRequest(value);
        setError('Нужно ввести ключевое слово');
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
        (newError = '', newIsValid = false) => {
            setError(newError);
            setIsValid(newIsValid);
        },
        [setError, setIsValid]
    );
    
    const handleSubmit = (e) => {
        e.preventDefault();
        isValid ? props.onSearch(request) : setError('Нужно ввести ключевое слово');
    }

    useEffect(() => {
        if (!props.isSavedMovies && localStorage.getItem('movieSearch')) {
            const localRequest = localStorage.getItem('movieSearch');
            setRequest(localRequest);
            resetForm();
        }
    }, [props.isSavedMovies]);

return (
    <section className="search">
      <form
        className="search__container"
        onSubmit={handleSubmit}
      >
        {!isValid && <span className='search-form__notfound'>{error}</span>}
        <div className="search__main">
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            onChange={handleChange}
            value={request || ""}
            name="request"
            id="request"
            required
            formNoValidate
          />
          <label className='search-form__label'>
          <button
            type="submit"
            className="search__button"
            disabled={!isValid}
          >
            Найти
          </button>
          </label>
        </div>
        <FilterCheckbox
          checkboxName="Короткометражки"
          onFilterShorts={props.onFilterShorts}
          isSavedMovies={props.isSavedMovies}
          isShorts={props.isShorts}
        />
      </form>
    </section>
  );
}

export default SearchForm;