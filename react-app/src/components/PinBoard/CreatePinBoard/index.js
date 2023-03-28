import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { createBoard } from "../../../store/pinBoard";
import './CreatePinBoard.css'


function CreatePinBoard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const ownerId = useSelector(state => state?.session?.user?.id);
    const sessionUser = useSelector(state => state?.session?.user)

    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            name
        }


        return dispatch(createBoard(payload, ownerId))
        .then (() => history.push('/pinboards'))
        .catch(
            async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            }
        )
    }


    return (
        <nav className='create-board-container'>
            <div className='create-board-div'>
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                    <div className='create-header-div'>
                        <p className='create-board-header'>Create board</p>
                    </div>
                    <label className='create-input-div'>
                    Name
                    <input className='board-inputs'
                        type="text"
                        placeholder='Like "Places to Go" or "Recipes to Make"'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                    </label>
                    <div className='created-button-div'>
                        {sessionUser &&
                            <button className='create-board-button' type='submit'>Create</button>
                        }
                    </div>
                </form>
            </div>
        </nav>
    )
}

export default CreatePinBoard;
