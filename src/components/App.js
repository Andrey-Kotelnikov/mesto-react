import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from './CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIssAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  //------------------

  const [currentUser, setCurrentUser] = React.useState({})

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getProfile(),
      api.getItems()
    ])
      .then(([userInfo, initialCards]) => { 
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => {console.log(err)})
  }, []);


  function handleLikeCard(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if (!isLiked) {
      api.like(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }
  }

  function handleCardDelete(card) {
    console.log(card)
    api.deleteItem(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then(() => {
        setCurrentUser({...currentUser, name: data.name, about: data.about});
        console.log(currentUser)
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then(() => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
  }



  //------------------

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIssAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIssAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({})
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleLikeCard}
        onCardDelete={handleCardDelete}
      />
      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <label className="popup__input-container">
          <input id="location-input" className="popup__text popup__text_type_location" type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
          <span className="location-input-error popup__text-error"></span>
        </label>
        <label className="popup__input-container">
          <input id="image-link-input" className="popup__text popup__text_type_image-link" type="url" name="link" placeholder="Ссылка на картинку" required/>
          <span className="image-link-input-error popup__text-error"></span>
        </label>
      </PopupWithForm>

      

      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <template className="template">
        <article className="element">
          <img className="element__image" src="#" alt="#"/>
          <button className="element__trash" type="button" aria-label="удалить карточку"></button>
          <div className="element__items">
            <h3 className="element__title"></h3>
            <div className="element__like-container">
              <button className="element__like" type="button" aria-label="понравилось"></button>
              <p className="element__like-counter"></p>
            </div>
          </div>
        </article>
      </template>
    </CurrentUserContext.Provider>
  );
}

export default App;