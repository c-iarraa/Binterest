import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { createBoard } from "../../../store/pinBoard";
// import './CreatePinBoard.css'


function CreatePinBoard() {
    const dispatch = useDispatch();
    const history = useHistory();
    const ownerId = useSelector(state => state.session.user.id);

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
                if (!res.ok) {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }
            }
        )
    }


    return (
        <nav className='create-board-container'>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                Name
                <input className='board-inputs'
                    type="text"
                    placeholder='Like "Places to Go" or "Recipes to Make"'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </label>
                <button className='create-board-button' type='submit'>Create</button>
            </form>
        </nav>
    )
}

export default CreatePinBoard;
