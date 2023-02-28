import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import DemoUserModal from "../DemoUserModal";
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

  return (
    <>
      <h1 className='login-header'>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='login-page'>
          <label>
            Email
            <input className='login-inputs'
              type="text"
              value={email}
              placeholder='Enter email address'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input className='login-inputs'
              type="password"
              value={password}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className='login-page-button' type="submit">Log In</button>
        </div>
      </form>

      <div className='demo-user-button-div'>
            <DemoUserModal />
			</div>
    </>
  );
}

export default LoginFormPage;
