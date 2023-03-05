import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import logo from '../Photo/logo.png'
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [first_name, setFirst_name] = useState('');
	const [last_name, setLast_name] = useState('');
	const [age, setAge] = useState('')
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
        const data = await dispatch(signUp(username, email, password, first_name, last_name, age));
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <nav className='signup-container'>
      <div className='signup-page'>
          <div className='logo-signup'>
                  <NavLink to='/' ><img className="logo-img" src={logo}></img></NavLink>
          </div>
          <div className='header-group'>
              <h1 className='signup-header'>Welcome to Binterest</h1>
              <p className='new-ideas'>Find new ideas to try</p>
          </div>
          <form className='input-form' onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='inputsss'>
              Email
              <input className='signup-inputs'
                type="text"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className='inputsss'>
              Password
              <input className='signup-inputs'
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label className='inputsss'>
              Confirm Password
              <input className='signup-inputs'
                type="password"
                value={confirmPassword}
                placeholder='Confirm Password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <label className='inputsss'>
              First Name
              <input className='signup-inputs'
                type="test"
                value={first_name}
                placeholder='First Name'
                onChange={(e) => setFirst_name(e.target.value)}
                required
              />
            </label>
            <label className='inputsss'>
              Last Name
              <input className='signup-inputs'
                type="test"
                value={last_name}
                placeholder='Last Name'
                onChange={(e) => setLast_name(e.target.value)}
                required
              />
            </label>
            <label className='inputsss'>
              Age
              <input className='signup-inputs'
                type="number"
                value={age}
                placeholder='Age'
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </label>
            <button className="signup-page-button" type='submit'>Continue</button>
          </form>
      </div>
    </nav>
  );
}

export default SignupFormPage;
