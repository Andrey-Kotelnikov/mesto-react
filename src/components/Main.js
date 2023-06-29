import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main (props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getItems()
    ])
      .then(([info, initialCards]) => { 
        //console.log(info);
        //console.log(initialCards);
        setUserName(info.name);
        setUserDescription(info.about);
        setUserAvatar(info.avatar);
        setCards(initialCards);
      })
      .catch((err) => {console.log(err)})
  }, []);

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="profile__edit-button" type="button" aria-label="редактировать профиль" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" aria-label="добавить фото" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((element) => (
          <Card 
            link={element.link}
            name={element.name}
            likes={element.likes}
            key={element._id}
            card={element}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;