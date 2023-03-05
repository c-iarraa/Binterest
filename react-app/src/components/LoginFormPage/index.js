import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import logo from '../Photo/logo.png'
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = () => {
    setEmail('demo@aa.io')
    setPassword('password')
    return dispatch(login(email, password));
  }

  return (
    <nav className='login-container'>
      <div className='login-page'>
          <div className='logo-login'>
              <NavLink to='/' ><img className="logo-img" src={logo}></img></NavLink>
          </div>
          <h1 className='login-header'>Welcome to Binterest</h1>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
              <label>
                Email
                <input className='login-inputs'
                  type="text"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label>
                Password
                <input className='login-inputs'
                  type="password"
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <p className='forgot-password'>Forgot your password?</p>
              <button className='login-page-button' type="submit">Log In</button>
              <p className='or'>OR</p>
              <div className='demo-user-button-div'>
                <button className='demo-user-login' onClick={demoLogin} type='submit'>Continue with Demo User</button>
              </div>
          </form>
      </div>
    </nav>
  );
}

export default LoginFormPage;
