import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment, getComments } from '../../../store/comment'
import './DeleteComment.css'

const DeleteComment = ({ comment, closeMenu, post }) => {
    const dispatch = useDispatch()
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getComments(post.id))
            .then(() => setIsLoaded(true))
    }, [dispatch, hasSubmitted]) // refetching comments everytime hasSubmitted changes state to true

    const deleteComment = async (e) => {
        e.preventDefault()
        await dispatch(deleteComment(comment.id))
        setHasSubmitted(!hasSubmitted)
        closeMenu()
    }

    return (
        <>
            <div onClick={(e) => deleteComment(e, comment.id)} className="delete-comment">
                Delete
            </div>
        </>
    )
}

export default DeleteComment;
