import { useEffect, useState } from "react";
import { Link, useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deletePin, onePin } from "../../store/pin";
import CommentBar from './comments'


function PinDetails() {
    const { pinId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const pinSelector = useSelector(state => state.pins.onePin);
    const ownerId = useSelector(state => state.pins.onePin.owner_id)
    const sessionUserId = useSelector(state => state.session.user?.id) //session user id
    const [validationErrors, setValidationErrors] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        dispatch(onePin(pinId))
    }, [pinId])

    // const pinArray = Object.values(pinSelector)
    // console.log('pin array', pinArray)
    // if (!pinArray) return null;

    const deleteSpecificPin = async (e) => {
        e.preventDefault()
        dispatch(deletePin(pinId))
        history.push('/')
    }

    return (
        <nav className='pin-details-container'>
            <ul className="errors">
                {validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <div className='pin-div'>
                <div className='pin-image-container'>
                    {/* {pinSelector.Pin.map((image) => (
                        <img className="specific-spot-img" key={image.id} src={image.imageUrl}/>
                    ))} */}
                    {pinSelector.imageUrl}
                    {/* <img className="pin-img">{pinSelector.imageUrl}</img> */}
                    </div>
                <div className='right-side-card'>
                    <div className='update-delete-div'>
                        {(ownerId === sessionUserId) &&
                        <div>
                                <button className='delete-text' onClick={deleteSpecificPin}>Delete Pin</button>
                                <NavLink className='update-text' to={`/pins/${pinSelector.id}/update`}>Update Pin</NavLink>
                        </div>
                        }
                    </div>
                    <a className='pin-destination-link'href={pinSelector.destinationLink}>{pinSelector.destinationLink}</a>
                    <h1 className='pin-title'>{pinSelector.title}</h1>
                    <h3 className='pin-description'>{pinSelector.description}</h3>
                </div>
                <CommentBar/>
            </div>
        </nav>
    )
}

export default PinDetails;
