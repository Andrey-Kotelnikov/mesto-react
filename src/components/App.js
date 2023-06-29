import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIssAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
    <div className="page">
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <label className="popup__input-container">
          <input id="name-input" className="popup__text popup__text_type_name" type="text" name="name" placeholder="Ваше имя" minlength="2" maxlength="40" required/>
          <span className="name-input-error popup__text-error"></span>
        </label>
        <label className="popup__input-container">
          <input id="status-input" className="popup__text popup__text_type_status" type="text" name="about" placeholder="О себе" minlength="2" maxlength="200" required/>
          <span className="status-input-error popup__text-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm name="add-card" title="Новое место" buttonText="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <label className="popup__input-container">
          <input id="location-input" className="popup__text popup__text_type_location" type="text" name="name" placeholder="Название" minlength="2" maxlength="30" required/>
          <span className="location-input-error popup__text-error"></span>
        </label>
        <label className="popup__input-container">
          <input id="image-link-input" className="popup__text popup__text_type_image-link" type="url" name="link" placeholder="Ссылка на картинку" required/>
          <span className="image-link-input-error popup__text-error"></span>
        </label>
      </PopupWithForm>

      <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <label className="popup__input-container">
          <input id="avatar-link-input" className="popup__text popup__text_type_image-link" type="url" name="avatar" placeholder="Ссылка на картинку" required/>
          <span className="avatar-link-input-error popup__text-error"></span>
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
    </div>
  );
}

export default App;
