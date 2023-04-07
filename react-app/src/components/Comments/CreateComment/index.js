import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../store/comment";
import { getPins } from "../../../store/pin";
import './CreateComment.css'

const CreateComment = ({ post, showComments, setShowComments }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const userComment = {
            comment: newComment
        }
        const data = await dispatch(createComment(userComment, post.id))
        setErrors([])
        await dispatch(getPins(data))
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setNewComment('')
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            onSubmit(e)
        }
    }

    return (
        <>
            {/* <div className="post-card-buttons-container">
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="create-comment-button-container">
                    <span className="create-commment-text">Comments</span>
                </button>
            </div> */}
            <p className='comments-header'>Comments</p>
            <div className="create-comment-container">
                {showComments && (
                    <div className="comment-form-container">
                        <form className="comment-form" onSubmit={onSubmit}>
                            <div>
                                <div className="error-messages">
                                    {Object.values(errors).map((error, ind) => (
                                        <div key={ind}>
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="comment-container">
                                <textarea
                                    placeholder="Add a comment"
                                    type='textarea'
                                    className="new-comment-textarea"
                                    value={newComment}
                                    onChange={(e) => {
                                        setNewComment(e.target.value)
                                        if (e.target.value.length <= 155) {
                                            setErrors([])
                                        }
                                    }}
                                    onKeyDown={handleKeyDown}
                                ></textarea>
                            </div>

                        </form>
                    </div>
                )}
            </div >
        </>
    )
}

export default CreateComment
