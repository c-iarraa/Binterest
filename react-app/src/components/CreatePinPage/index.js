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
    const sessionUser = useSelector(state => state.session.user);


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
               <div className='create-pin-div'>
                    <div className='left-side-image'>
                        <p>possibly display something here to show preview of selected image url</p>
                        <label className='new-pin-img'>
                            <input className='img-input-details'
                            type="url"
                            placeholder='Add an image to your pin'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                    <div className='right-side-new-pin'>
                        <label className='title'>
                            <input className='input-title'
                            type="text"
                            placeholder='Add your title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            />
                        </label>

                        <div className='user-info-div'>
                            <div className='prof-button'>
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div className='user-info1'>
                                <p className='user-info2'>session user </p>
                            </div>
                        </div>

                        <label className='description'>
                            <input className='input-description'
                            type="text"
                            placeholder='Tell everyone what your pin is about'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            />
                        </label>
                        <label className='dest-link'>
                            <input className='input-dest-link'
                            type="link"
                            placeholder='Add a destination link'
                            value={destinationLink}
                            onChange={(e) => setDestinationLink(e.target.value)}
                            required
                            />
                        </label>
                    </div>
                </div>
                <button className='save-new-pin-button' type="submit">Save</button>
            </form>

        </nav>
    )
}

export default CreatePin;
