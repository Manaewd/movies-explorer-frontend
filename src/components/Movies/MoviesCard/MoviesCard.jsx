// import { useContext } from 'react';

function MoviesCard({ onCardClick, card, onCardLike }) {

//   const isOwn = card.owner._id === currentUser._id;
//   const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleCardClick() {
    onCardClick(card);
  }

//   function handleDeleteClick() {
//     onCardDelete(card);
//   }

  function handleLikeClick() {
    onCardLike(card)
  }

  return (
    <div className="card">
      {/* {isOwn &&
        <button
          type={"button"}
          className="card__trash-button"
          onClick={handleDeleteClick}>
        </button>} */}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="card__container">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__container-like">
          <button
            type="button"
            className='card__button_type_active'
            aria-label="like"
            onClick={handleLikeClick}
          ></button>
        </div>
      </div>
      <p className="card__duration">{card.duration}</p>
    </div>
  );
}

export default MoviesCard;