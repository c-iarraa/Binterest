import { useEffect, useState } from "react";
import { useHistory, useParams, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { deletePin, onePin } from "../../store/pin";
import { addJointable, getJointable } from "../../store/jointable";
import { getAllComments, postAComment, deleteAComment } from '../../store/comment'
import AddToBoard from './addtoboard';
import './PinDetails.css'


function PinDetails() {
    const { pinId } = useParams();
    const comments = useSelector(state => state.comments.comments)
    const commentData = Object.values(comments)
    // console.log('pin id in component', pinId)
    const dispatch = useDispatch();
    const history = useHistory();
    const pinSelector = useSelector(state => state.pins.onePin.pin);
    const jointableSelector = useSelector(state => state.jointable.jointable);
    // console.log('join table selector', jointableSelector);
    const sessionUserId = useSelector(state => state.session.user?.id) //session user id
    const sessionUser = useSelector(state => state.session.user);
    const [validationErrors, setValidationErrors] = useState([]);
    const [users, setUsers] = useState([])
    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            'pin_id': Number(pinId),
            'user_id': sessionUserId,
            'comment': newComment
        }
        const postedComment = await dispatch(postAComment(pinId, payload))
            .catch(
                async (res) => {
                    const data = await res.json()
                    if (data && data.errors) setErrors(data.errors)

                }
            )
        if (postedComment) {
            (history.push(`/pins/:pinId`))
        }
        setNewComment('')
    }


    useEffect(() => {
        dispatch(onePin(pinId))
        dispatch(getJointable(pinId))
        dispatch(getAllComments(pinId))

        if (!users.length) {

            async function fetchData() {
                const response = await fetch('/api/users/')
                const responseData = await response.json()
                setUsers(responseData.users)
            }
            fetchData()
        }

    }, [pinId, dispatch])


    if (!pinSelector) return null;


    let message = ''

    const handleDeletion = async (commentId) => {
        const response = await dispatch(deleteAComment(commentId))
        console.log('message', message)
        if (response) {
            message = response.message
        }
    }


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
            <div className='pin-details-container'>
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
                        <p className='comments-header'>Comments</p>
                    </div>
                    <div className='comments-container'>

                        {commentData.map(comment => (
                            <div className='comments-div'>
                                <div className='comment-details-div'>
                                    <div className='comment-message-details'>
                                        <p className='username-comment'>{users.find(user => user?.id === comment?.user_id)?.first_name}: {comment.comment}</p>


                                        {comment?.user_id === sessionUserId &&

                                            <div><button className='delete-comment' onClick={() => handleDeletion(comment.id)}><b><i class="fa-regular fa-trash-can"></i></b></button></div>
                                        }
                                    </div>
                                </div>



                            </div>


                        ))}
                        <div className='pin-comment-container'>
                        <form onSubmit={handleSubmit} className="comment-bar-form">
                            <div className='comment-user-icon'>
                                <i class="fa-solid fa-user"></i>
                            </div>
                            <div>
                                <input
                                    className='comment-input-values'
                                    type='text' required
                                    onChange={(e) => setNewComment(e.target.value)}
                                    value={newComment}
                                    placeholder='Add a Comment'
                                    maxLength='155'>
                                </input>
                                {sessionUser &&
                                <button
                                    className='post-comment-button'
                                    onClick={handleSubmit}
                                ><i class="fa-regular fa-paper-plane"></i>
                                </button>
                                }
                            </div>
                            </form>
                        </div>



                    </div>
                </div>
            </div>
        </nav>
    )
}

export default PinDetails;
