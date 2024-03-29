import { useEffect, useState } from "react";
import { Link, useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { oneBoard, deleteBoard } from "../../../store/pinBoard";
import { getJointable, deleteJointable } from "../../../store/jointable";
import './PinBoardDetails.css'



function PinBoardDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const [validationErrors, setValidationErrors] = useState([])
    const boardSelector = useSelector(state => state.boards.oneBoard);
    const sessionUserId = useSelector(state => state?.session?.user?.id);
    const ownerId = useSelector(state => state?.boards?.oneBoard?.owner_id)
    const boardpinSelector = useSelector(state => state?.jointable?.jointable);
    const sessionUser = useSelector(state => state.session.user);


    useEffect(() => {
        dispatch(oneBoard(boardId))
        dispatch(getJointable(boardId))
    }, [boardId, dispatch])


    if(!boardpinSelector) return null;
    if (!ownerId) return null;
    if (!sessionUser) return null;

    const deleteSpecificBoard = async (e) => {
        e.preventDefault()
        dispatch(deleteBoard(boardId))
        history.push('/pinboards')
    }

    const handlePinDelete = async (pinId) => {
        if(!sessionUser){
            return  history.push('/login')
        }
        // const payload = {
            //   'board_id': boardId,
            //   'pin_id': pinId
            // }
            dispatch(deleteJointable(pinId, boardId))
        }

        if (!boardpinSelector.pin) return null;


        return boardpinSelector && boardpinSelector.pin &&  (
            <nav className='board-details-container'>

                <div className='upper-board-layout'>
                    <div className='board-name-div'>
                        <h1 className='board-name'>{boardSelector.name}</h1>
                    </div>
                    <div>
                        {(ownerId === sessionUserId) &&
                        <div className='board-update-delete-div'>
                                <div className='board-delete-div'>
                                    <button className='board-delete' onClick={deleteSpecificBoard}><i class="fa-regular fa-trash-can"></i></button>
                                    <p className='board-delete-text'>Delete board</p>
                                </div>
                                <div className='board-update-div'>
                                    <div className='update-board-div'>
                                        <NavLink className='board-update' to={`/pinboards/${boardSelector.id}/update`}><i class="fa-regular fa-pen-to-square"></i></NavLink>
                                    </div>
                                    <p className='board-update-text'>Update board</p>
                                </div>
                        </div>
                        }
                    </div>
                </div>
                <div className='pins-in-board'>
                {boardpinSelector.pin.map(pin => (
                <ul>
                    <div id='pinCard-in-board' key={pin.id}>
                        <NavLink to={`/pins/${pin.id}`}>
                            <img className='pinBoardImg' src={pin.imageUrl}></img>
                        </NavLink>
                        <NavLink className='delete-board-pin' to={`/pinboards`} onClick={() => handlePinDelete(pin.id)}> Delete</NavLink>
                    </div>
                </ul>
                ))}
                </div>
        </nav>
    )
}

export default PinBoardDetails;
