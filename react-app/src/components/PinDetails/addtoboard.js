import {useHistory, NavLink, useParams } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJointable, getJointable } from "../../store/jointable";
import { getBoards } from '../../store/pinBoard';
import { onePin, getPins } from '../../store/pin'



function AddToBoard() {
    const dispatch = useDispatch();
    const { pinId } = useParams();
    const history = useHistory();
    const ulRef = useRef();
    // const ownerId = useSelector(state => state.session.user.id);
    const sessionUserId = useSelector(state => state?.session?.user?.id);
    const sessionUser = useSelector(state => state?.session?.user);
    // const boardSelector = useSelector(state => state.boards.oneBoard);
    // const oneBoardId = useSelector(state => state.boards.oneBoard.id);
    // const pinSelector = useSelector(state=> state.pins.onePin.pin);
    // const jointable = useSelector(state => state.jointable.jointable);

    const [name, setName] = useState('');
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(getBoards(sessionUserId))
        dispatch(onePin(pinId))
        dispatch(getJointable(pinId))
        // dispatch(addJointable(pinSelector))     dispatch this in a onclick
    }, [dispatch])


    const sessionBoard = useSelector(state => {
        return state.boards.allBoards
    });

    const boardArray = Object.values(sessionBoard);


    const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	  };

	  useEffect(() => {
		// if (!showMenu) return;

		// const closeMenu = (e) => {
        //    e.preventDefault();
		//   if (!ulRef.current.contains(e.target)) {
		// 	setShowMenu(false);
		//   }
		// };

        // if (!ulRef.current.contains) return null;
        // if (!closeMenu) return null;

		// document.addEventListener("click", closeMenu);

		// return () => document.removeEventListener("click", closeMenu);
	  }, [showMenu]);

      const ulClassName = "board-dropdown" + (showMenu ? "" : " hidden");

    if (!openMenu) return null;


    const handlePin = async (boardId) => {
        if(!sessionUser){
         return  history.push('/login')
        }
        const payload = {
          'board_id': boardId,
          'pin_id': pinId
        }
         dispatch(addJointable(payload, pinId))
      }

    if (!sessionUserId) return null;

    if (!sessionUser) return null;

    return (

        <div className='save-to-board-link'>
                <div className='save-pin-button'>

					<button onClick={openMenu} className='save-to-board-button'>Save</button>
                </div>

				<ul className={ulClassName} ref={ulRef}>
                        <div id = 'pins-to-board-container'>
                            {boardArray.map(board => (
                                // {(sessionUserId === boardSelector.owner_id) &&
                                    <div>
                                        <ul>
                                            <div id='boardCard2' key={board.id}>
                                                <NavLink onClick={() => handlePin(board.id)} to={`/pinboards/${board.id}/details`}>{board.name}</NavLink>
                                            </div>
                                        </ul>
                                    </div>
                                // }
                            ))}
                        </div>
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
