import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import cards from '../../utils/Data';

function Movies() {
    return (
      <div className="movies">
        <SearchForm />
        <MoviesCardList
          cards={cards}
          buttonMore={true} />
      </div>
    );
  }
  
  export default Movies;