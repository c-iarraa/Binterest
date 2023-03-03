import { useEffect, useState } from "react";
import { Link, useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deletePin, onePin } from "../../store/pin";
import CommentBar from './comments'
import './PinDetails.css'


function PinDetails() {
    const { pinId } = useParams();
    console.log('pin id in component', pinId)
    const dispatch = useDispatch();
    const history = useHistory();
    const pinSelector = useSelector(state => state.pins.onePin.pin);
    const sessionUserId = useSelector(state => state.session.user?.id) //session user id
    const [validationErrors, setValidationErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(onePin(pinId))
    }, [pinId, dispatch])


    if (!pinSelector) return null;

    // const ownerId = useSelector(state => state?.pins.onePin.pin.owner_id)

    // if (!ownerId) return null;

    const deleteSpecificPin = async (e) => {
        e.preventDefault()
        dispatch(deletePin(pinId))
        history.push('/')
    }

    return (

        <nav className='one-pin-container'>
            {/* <ul className="errors">
                {validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul> */}
            <div className='pin-details-container'>
                <div className='pin-div'>
                    <div className='pin-image-container'>
                        <div className='single-pin-image'>
                            <img className='single-pin-image' src={pinSelector.imageUrl}></img>
                        </div>
                    </div>
                    <div className='left-side-card'>
                    </div>
                    <div className='right-side-card'>
                        <div className='update-delete-div'>
                            {(pinSelector.owner_id === sessionUserId) &&
                            <div>
                                    <button className='delete-text' onClick={deleteSpecificPin}>Delete Pin</button>
                                    <NavLink className='update-text' to={`/pins/${pinSelector.id}/update`}>Update Pin</NavLink>
                            </div>
                             }
                        </div>
                        <a className='pin-destination-link'href={pinSelector.destinationLink}>{pinSelector.destinationLink}</a>
                        <h1 className='pin-title'>{pinSelector.title}</h1>
                        <h3 className='pin-description'>{pinSelector.description}</h3>
                        <CommentBar/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default PinDetails;
