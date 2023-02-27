import React, { useState, useEffect, useRef } from "react";
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import DemoUserModal from "../DemoUserModal";
import SearchBar from './searchbar';
import CreatePin from '../CreatePinPage';
import './Navigation.css';
// import logo from '../Photo'


function Navigation({ isLoaded }){
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const sessionUser = useSelector(state => state.session.user);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	  };

	  useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
		  if (!ulRef.current.contains(e.target)) {
			setShowMenu(false);
		  }
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	  }, [showMenu]);

	  const ulClassName = "create-dropdown" + (showMenu ? "" : " hidden");

	return (
		<nav className='navBar-container'>
			<div className='navigationBar'>

				<div className='nav-logo'>
					<div><NavLink to="/">Binterest</NavLink></div>
					{/* <img className="logo-img" src={logo}></img> */}
				</div>

				<div className='create-links'>
					<button onClick={openMenu} className='create-buttons'>Create <i class="fa-solid fa-circle-chevron-down"></i></button>
				<ul className={ulClassName} ref={ulRef}>
					<ul>
						{sessionUser &&
						<NavLink className="create-pin-link" exact to="/pins/new">Create Pin</NavLink>
						}
					</ul>
				</ul>
				</div>

				<SearchBar/>

			{(sessionUser === null) ?
			<div className='navBar-right'>
					<div className='signup-button-div'>
						<NavLink className='signup-button' exact to='/signup'>Sign Up</NavLink>
					</div>
					<div className='login-button-div'>
						<NavLink className='login-button' exact to='/login'>Log In</NavLink>
					</div>
			</div>
			:
			<div className='navBar-right'>
				{/* <div className='notifs'>
					<NotificationButton user={sessionUser}/>
				</div> */}
				<div className='user-profile'>
					<ProfileButton user={sessionUser} />
				</div>
			</div>
			}
		</div>
	</nav>
	);
}

export default Navigation;
