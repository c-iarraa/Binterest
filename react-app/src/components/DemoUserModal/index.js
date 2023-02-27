import React, { useState } from 'react';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DemoUserModal.css';

function DemoUserModal () {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("Demo-lition");
    const [password, setPassword] = useState('password');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
          .then(closeModal)
          .catch(
            async (res) => {
              const data = await res.json();
              if (data && data.errors) setErrors(data.errors);
            }
          );
      };


    return (
        <>
        <h1 className='login-form-title'>Log In</h1>
        <form onSubmit={handleSubmit}>
        <h2 style={{ fontFamily: 'Helvetica' }}>Welcome to Binterest</h2>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            Email
            <input className = 'login-inputs'
              type="text"
              placeholder='Username or Email'
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input className = 'login-inputs'
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <h2 className='forgot-password'>Forgot your password?</h2>
          <button className='login-button' type="submit">Log in</button>
        </form>
        </>
      );
}

export default DemoUserModal;
