import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react"
import { updatePin } from "../../store/pin";
import './UpdatePin.css'


function UpdatePin() {
    const history = useHistory()
    // const { pinId } = useParams()
    const dispatch = useDispatch()
    const ownerId = useSelector(state=> state.pins.onePin.owner_id);
    const pinSelector = useSelector(state => state.pins.onePin.pin);
    const pinId = useSelector(state => state.pins.onePin.pin.id);

    const [title, setTitle] = useState(pinSelector.title)
    const [description, setDescription] = useState(pinSelector.description)
    const [destinationLink, setDestinationLink] = useState(pinSelector.destinationLink)
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState([]);

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateDestinationLink = (e) => setDestinationLink(e.target.value);

    const handleSubmit  = async (e) => {
        e.preventDefault();

      setErrors([])

      const updatedInfo = {
        id: pinId,
        owner_id: ownerId,
        title,
        description,
        destinationLink
      }


    const updatedPin = await dispatch((updatePin(updatedInfo, pinId)))

        .then (() => history.push(`/pins/${pinId}`))
        .catch(
            async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            }
        )
    }



    return (
        <section className="update-form-holder centered middled">
            <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="edit-pin-container">
                <h1 className='edit-pin-header'>Edit this Pin</h1>
                <div className='all-edit-inputs'>
                    <label className='update-pin-inputss'>
                        Title
                        <input className='update-pin-inputs'
                        type="text"
                        placeholder='Add your title'
                        value={title}
                        // onChange={(e) => setTitle(e.target.value)}
                        onChange={updateTitle}
                        required
                        />
                    </label>
                    <label className='update-pin-inputss'>
                        Description
                        <input className='update-pin-inputs'
                        type="text"
                        placeholder='Tell everyone what your pin is about'
                        value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        onChange={updateDescription}
                        required
                        />
                    </label>
                    <label className='update-pin-inputss'>
                        Website
                        <input className='update-pin-inputs'
                        type="link"
                        placeholder='Add a destination link'
                        value={destinationLink}
                        // onChange={(e) => setDestinationLink(e.target.value)}
                        onChange={updateDestinationLink}
                        />
                    </label>
                <div className='button-div'>
                    <button className='update-pin-button' type="submit">Save</button>
                </div>
                </div>
            </div>
        </form>
    </section>
    )
}

export default UpdatePin;
