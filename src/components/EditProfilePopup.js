import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "./CurrentUserContext";

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log('submit')
    props.onUpdateUser({
      name,
      about: description
    })
  }

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <label className="popup__input-container">
          <input id="name-input" className="popup__text popup__text_type_name" type="text" name="name" placeholder="Ваше имя" minLength="2" maxLength="40" required onChange={handleChangeName} value={name}/>
          <span className="name-input-error popup__text-error"></span>
        </label>
        <label className="popup__input-container">
          <input id="status-input" className="popup__text popup__text_type_status" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required onChange={handleChangeDescription} value={description} />
          <span className="status-input-error popup__text-error"></span>
        </label>
      </PopupWithForm>
  )
}

export default EditProfilePopup;