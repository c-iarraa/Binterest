import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { createPin } from "../../store/pin";
import './CreatePin.css'

function CreatePin() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [destinationLink, setDestinationLink] = useState('')
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([]);
    const ownerId = useSelector(state=> state.session.user?.id);


    const handleSubmit = async (e) => {
        e.preventDefault();

      setErrors([])

        const payload = {
            title,
            description,
            imageUrl,
            destinationLink
        }

        return dispatch(createPin(payload, ownerId))
        .then (() => history.push('/'))
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
        <nav class="create-pin-container">
            <form onSubmit={handleSubmit}>
                <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
                </ul>
                <label>
                    <input className='input-details'
                    type="text"
                    placeholder='Add your title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </label>
                <label>
                    <input className='input-details'
                    type="text"
                    placeholder='Tell everyone what your pin is about'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    />
                </label>
                <label>
                    <input className='input-details'
                    type="url"
                    placeholder='Add an image to your pin'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    />
                </label>
                <label>
                    <input className='input-details'
                    type="link"
                    placeholder='Add a destination link'
                    value={destinationLink}
                    onChange={(e) => setDestinationLink(e.target.value)}
                    required
                    />
                </label>
                <button className='submit-button' type="submit">Save</button>
            </form>

        </nav>
    )
}

export default CreatePin;
