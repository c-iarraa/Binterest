import { useEffect, useState } from "react";
import { Link, useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { oneBoard, deleteBoard } from "../../../store/pinBoard";
import { getJointable, deleteJointable } from "../../../store/jointable";



function PinBoardDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const [validationErrors, setValidationErrors] = useState([])
    const boardSelector = useSelector(state => state.boards.oneBoard);
    console.log('board selector in component', boardSelector)
    const sessionUserId = useSelector(state => state.session.user.id);
    const ownerId = useSelector(state => state?.boards.oneBoard.owner_id)
    // console.log('owner id', ownerId)
    const boardpinSelector = useSelector(state => state?.jointable?.jointable[0]);
    const sessionUser = useSelector(state => state.session.user);
    // console.log('board id', boardId)


    useEffect(() => {
        dispatch(oneBoard(boardId))
        dispatch(getJointable(boardId))
    }, [boardId, dispatch])


    if(!boardpinSelector) return null;
    if (!ownerId) return null;

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


    return   (
        <nav className='board-details-container'>

                <div className='upper-board-layout'>
                    <div className='board-name-div'>
                        <h1 className='board-name'>{boardSelector.name}</h1>
                    </div>
                    <div className='board-update-delete-div'>
                        {(ownerId === sessionUserId) &&
                        <div>
                                <div className='board-delete-div'>
                                    <i class="fa-regular fa-trash-can"></i>
                                    <button className='board-delete-text' onClick={deleteSpecificBoard}>Delete Board</button>
                                </div>
                                <div className='board-update-div'>
                                    <i class="fa-regular fa-pen-to-square"></i>
                                    <NavLink className='board-update-text' to={`/pinboards/${boardSelector.id}/update`}>Update Board</NavLink>
                                </div>
                        </div>
                        }
                    </div>
                </div>
                <h1>ADD SOMETHING HERE TO COUNT THE AMOUNT OF PINS IN BOARD</h1>
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
