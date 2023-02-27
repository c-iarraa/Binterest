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
    const ownerId = useSelector(state=> state.session.user?.id);
    const pinSelector = useSelector(state => state.pins.onePin);
    const pinId = useSelector(state => state.pins.onePin.id);

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

      const payload = {
        id: pinSelector.id,
        owner_id:
        title,
        description,
        destinationLink
      }

        // return dispatch(updatePin(payload, ownerId))
        // .then (() => history.push(`/`))
        // .catch(
        //     async (res) => {
        //         if (!res.ok) {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         }
        //     }
        // )

    const updatedPin = await dispatch((updatePin(payload, pinId)))
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
                    <label>
                        Title:
                        <input className='update-inputs'
                        type="text"
                        placeholder='Add your title'
                        value={title}
                        // onChange={(e) => setTitle(e.target.value)}
                        onChange={updateTitle}
                        required
                        />
                    </label>
                    <label>
                        Description:
                        <input className='update-inputs'
                        type="text"
                        placeholder='Tell everyone what your pin is about'
                        value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        onChange={updateDescription}
                        required
                        />
                    </label>
                    <label>
                        Website:
                        <input className='input-inputs'
                        type="link"
                        placeholder='Add a destination link'
                        value={destinationLink}
                        // onChange={(e) => setDestinationLink(e.target.value)}
                        onChange={updateDestinationLink}
                        />
                    </label>
                </div>
                <div className='button-div'>
                    <button className='update-button' type="submit">Save</button>
                </div>
                </div>
        </form>
    </section>
    )
}

export default UpdatePin;
