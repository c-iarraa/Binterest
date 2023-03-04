import {useHistory, NavLink } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addJointable, getJointable } from "../../store/jointable";
import { getBoards } from '../../store/pinBoard';


function AddToBoard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const ulRef = useRef();
    const ownerId = useSelector(state => state.session.user.id);
    const sessionUserId = useSelector(state => state.session.user.id);
    const sessionUser = useSelector(state => state.session.user);
    // const boardSelector = useSelector(state => state.boards.oneBoard);

    const [name, setName] = useState('');
    const [showMenu, setShowMenu] = useState(false);


    useEffect(() => {
        dispatch(getBoards(sessionUserId))
    }, [dispatch])

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

      const ulClassName = "board-dropdown" + (showMenu ? "" : " hidden");



    if (!openMenu) return null;

    // const sessionBoard = useSelector(state => {
    //     return state.boards.allBoards
    // });




    return (

        <div className='save-to-board-link'>
                <div className='save-pin-button'>
                    
					<button onClick={openMenu} className='save-to-board-button'>Save</button>
                </div>
				<ul className={ulClassName} ref={ulRef}>
					<ul>
						{sessionUser &&
						<div className='create-board-dropdown'>
							<p><NavLink className="create-new-board-link" exact to="/pinboards/new"><i class="fa-solid fa-plus"></i> Create Board</NavLink></p>
						</div>
						}
					</ul>
				</ul>
				</div>
    )
}

export default AddToBoard;
