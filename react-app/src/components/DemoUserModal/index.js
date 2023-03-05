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
        <h1 className='login-form-title' style={{ fontFamily: 'Helvetica' }}>Welcome to Binterest</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className='demo-login-page'>
            <label>
              Email
              <input className = 'demo-login-inputs'
                type="text"
                placeholder='Username or Email'
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
            <label>
              Password
              <input className = 'demo-login-inputs'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <h2 className='forgot-password'>Forgot your password?</h2>
          <button className='demo-login-button' type="submit">Log in</button>
        </form>
        </>
      );
}

export default DemoUserModal;
