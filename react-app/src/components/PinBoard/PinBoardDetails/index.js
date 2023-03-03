import { useEffect, useState } from "react";
import { Link, useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { oneBoard, deleteBoard } from "../../../store/pinBoard";
import { getJointable } from "../../../store/jointable";



function PinBoardDetails() {

    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams();
    const [validationErrors, setValidationErrors] = useState([])
    const boardSelector = useSelector(state => state.boards.oneBoard);
    console.log('board selector in component', boardSelector)
    const sessionUserId = useSelector(state => state.session.user.id);
    // Find data with useSelector in your component
    const ownerId = useSelector(state => state?.boards.oneBoard.owner_id)
    console.log('owner id', ownerId)
    const boardpinSelector = useSelector(state => state?.jointable?.jointable[0])

    useEffect(() => {
        dispatch(oneBoard(boardId))
        dispatch(getJointable(boardId))
    }, [boardId, dispatch])

    if(!boardpinSelector) return null
    if (!ownerId) return null;

    const deleteSpecificBoard = async (e) => {
        e.preventDefault()
        dispatch(deleteBoard(boardId))
        history.push('/pinboards')
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
                {boardpinSelector.pin.map(el => (
                <ul>
                    <div id='pinCard-in-board' key={el.id}>
                        <NavLink to={`/pins/${el.id}`}>
                            <img className='pinBoardImg' src={el.imageUrl}></img>
                        </NavLink>
                    </div>
                </ul>
                ))}
                </div>
        </nav>
    )
}

export default PinBoardDetails;
