import { useEffect, useState } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deletePin, onePin } from "../../store/pin";
import { addJointable, getJointable } from "../../store/jointable";
import CommentBar from './comments';
import AddToBoard from './addtoboard';
import './PinDetails.css'


function PinDetails() {
    const { pinId } = useParams();
    console.log('pin id in component', pinId)
    const dispatch = useDispatch();
    const history = useHistory();
    const pinSelector = useSelector(state => state.pins.onePin.pin);
    const jointableSelector = useSelector(state => state.jointable.jointable);
    console.log('join table selector', jointableSelector);
    const sessionUserId = useSelector(state => state.session.user?.id) //session user id
    const sessionUser = useSelector(state => state.session.user);
    const [validationErrors, setValidationErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(onePin(pinId))
        dispatch(getJointable(pinId))
    }, [pinId, dispatch])


    if (!pinSelector) return null;

    const handleJointable = async () => {
        if (!sessionUser) {
            history.push('/login')
        }

        const payload = {
            id: pinId,
            user_id: sessionUserId
        }

        dispatch(addJointable(payload, pinId))
    }


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
                {/* <div className='pin-div'> */}
                <div className='left-side-card'>
                    <div className='pin-image-container'>
                        <div className='single-pin-image'>
                            <img className='single-pin-image' src={pinSelector.imageUrl}></img>
                        </div>
                    </div>
                </div>
                <div className='right-side-card'>
                    <div className='update-delete-div'>
                        {(pinSelector.owner_id === sessionUserId) &&
                            <div className='update-delete-buttons'>
                                <div>
                                    <button className='delete-text' onClick={deleteSpecificPin}>Delete Pin</button>
                                </div>
                                <div className='update-div'>
                                    <NavLink className='update-text' to={`/pins/${pinSelector.id}/update`}>Update Pin</NavLink>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="add-to-board"><AddToBoard /></div>
                    <div className='add-to-pinboard-container'>

                    </div>
                    <div className='pin-info'>
                        <a className='pin-destination-link' href={pinSelector.destinationLink}>{pinSelector.destinationLink}</a>
                        <h1 className='pin-title'>{pinSelector.title}</h1>
                        <p className='pin-description'>{pinSelector.description}</p>
                    </div>
                    <CommentBar />
                </div>
            </div>
        </nav>
    )
}

export default PinDetails;
