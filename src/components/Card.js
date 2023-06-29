function Card(props) {
  function handleClick() {
    props.onCardClick(props.card)
  }

  return (
    <article className="element" key={props._id}>
      <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
      <button className="element__trash" type="button" aria-label="удалить карточку"></button>
      <div className="element__items">
        <h3 className="element__title">{props.name}</h3>
        <div className="element__like-container">
          <button className="element__like" type="button" aria-label="понравилось"></button>
          <p className="element__like-counter">{0 || props.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;