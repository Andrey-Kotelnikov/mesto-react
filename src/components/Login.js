import React from "react";
import { useNavigate } from "react-router-dom";
import * as auth from '../utils/auth.js';


function Login(props) {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return
    }
    console.log(formValue)
    auth.login(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          console.log(data.token)
          setFormValue({email: '', password: ''});
          props.handleLogin(true);
          navigate('/main', {replace: true});
        }
    })
  }

  return (
    <form className="login__form" name="login-form" onSubmit={handleSubmit}>
      <h3 className="login__title">Вход</h3>
      <input className="login__input" id="email" name="email" value={formValue.email} placeholder="Email" type="email" onChange={handleChange} />
      <input className="login__input" id="password" name="password" value={formValue.password} placeholder="Пароль" type="password" onChange={handleChange} />
      <button className="login__save-button">Войти</button>
    </form>
  )
}

export default Login;