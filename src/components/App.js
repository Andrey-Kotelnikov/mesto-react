import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from './CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIssAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLikeCard(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if (!isLiked) {
      api.like(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {console.log(err)})
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {console.log(err)})
    }
  }

  function handleCardDelete(card) {
    console.log(card)
    api.deleteItem(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id));
      })
      .catch((err) => {console.log(err)})
  }

  function handleUpdateUser(data) {
    api.editProfile(data)
      .then(() => {
        setCurrentUser({...currentUser, name: data.name, about: data.about});
        console.log(currentUser)
        closeAllPopups();
      })
      .catch((err) => {console.log(err)})
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
      .then(() => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch((err) => {console.log(err)})
  }

  function handleAddPlaceSubmit(data) {
    api.createItem(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
        console.log(newCard)
      })
      .catch((err) => {console.log(err)})
  }

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
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
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