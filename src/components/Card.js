function Card({card, onCardClick}) {
  function handleClick() {
    onCardClick(card)
  }

  return (
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <button className="element__trash" type="button" aria-label="удалить карточку"></button>
      <div className="element__items">
        <h3 className="element__title">{card.name}</h3>
        <div className="element__like-container">
          <button className="element__like" type="button" aria-label="понравилось"></button>
          <p className="element__like-counter">{0 || card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;