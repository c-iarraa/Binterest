import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { updateBoard, deleteBoard, oneBoard} from "../../../store/pinBoard";
// import './UpdatePinBoard.css'


function UpdatePinBoard() {

    const dispatch = useDispatch();
    const history = useHistory();
    const ownerId = useSelector(state => state.boards.oneBoard.owner_id);
    console.log('owner id from update component', ownerId)
    const boardId = useSelector(state => state.boards.oneBoard.id);
    console.log('board id in update component', boardId)
    const sessionUserId = useSelector(state => state.session.user.id);


    const [name, setName] = useState('');
    const [errors, setErrors] = useState('');

    const updatedName = (e) => setName(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([])


        const updatedInfo = {
            id: boardId,
            owner_id: ownerId,
            name
        }


        const updatedBoard = await dispatch((updateBoard(updatedInfo, boardId)))

        .then (() => history.push(`/pinboards/${boardId}/details`))
        .catch(
            async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            }
        )
    }

    useEffect(() => {
        dispatch(oneBoard(boardId))
    }, [boardId, dispatch])

    const deleteSpecificBoard = async (e) => {
        e.preventDefault()
        dispatch(deleteBoard(boardId))
        history.push('/pinboards')
    }



    return (
        <section className='update-board-form'>
            <form onSubmit={handleSubmit}>
            {/* <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul> */}

            <div className='edit-board-container'>
                <h1 className='edit-board-header'>Edit your board</h1>
                <div className='all-edit-board-inputs'>
                    <label>
                        Name:
                        <input className='update-board-inputs'
                        type="text"
                        placeholder='Add your name'
                        value={name}
                        // onChange={(e) => setName(e.target.value)}
                        onChange={updatedName}
                        required
                        />
                    </label>
                    <h1>POSSIBLY ADD SOMETHING HERE TO MAKE A DESCRIPTION</h1>
                    <div className='board-delete-div'>
                        {(ownerId === sessionUserId) &&
                        <div>
                                <div className='update-board-delete-div'>
                                    <h3 className='action-header'>Action</h3>
                                    <button className='update-board-delete-text' onClick={deleteSpecificBoard}>Delete Board</button>
                                    <h2 className='delete-caption'>Delete this board and all its Pins forever.</h2>
                                    <h2 className='delete-caption'>You can't undo this!</h2>
                                </div>
                        </div>
                        }
                    </div>
                </div>
                <div className='edit-board-button-div'>
                    <button className='update-board-button' type="submit">Done</button>
                </div>
            </div>
            </form>
        </section>
    )
}

export default UpdatePinBoard;
