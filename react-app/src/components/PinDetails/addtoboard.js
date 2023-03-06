import { useHistory, NavLink, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJointable, getJointable } from "../../store/jointable";
import { getBoards } from '../../store/pinBoard';
import { onePin } from '../../store/pin'



function AddToBoard() {
    const dispatch = useDispatch();
    const { pinId } = useParams();
    const history = useHistory();
    const sessionUserId = useSelector(state => state?.session?.user?.id);
    const sessionUser = useSelector(state => state?.session?.user);



    useEffect(() => {
        dispatch(getBoards(sessionUserId))
        dispatch(onePin(pinId))
        dispatch(getJointable(pinId))
    }, [dispatch])


    const sessionBoard = useSelector(state => {return state?.boards.allBoards});
    const boardArray = Object.values(sessionBoard);


    if (!sessionUserId) return null;
    if (!sessionUser) return null;



    const handlePin = async (boardId) => {
        if (!sessionUser) {
            return history.push('/login')
        }
        const payload = {
            'board_id': boardId,
            'pin_id': pinId
        }
        dispatch(addJointable(payload, pinId))
    }
    return (

        <div className='save-to-board-link'>
            <div className='save-pin-button'>
            </div>
            <div id='pins-to-board-container'>
                <div class="dropdown">
                    <button class="dropbtn">Save</button>
                    <div class="dropdown-content">
                        {boardArray.map(board => (
                            <NavLink onClick={() => handlePin(board.id)} to={`/`}>{board.name}</NavLink>
                        ))}
                        <p><NavLink className="create-new-board-link" exact to="/pinboards/new"><i class="fa-solid fa-plus"></i> Create Board</NavLink></p>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddToBoard;
