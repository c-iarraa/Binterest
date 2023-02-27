import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useHistory, useParams } from "react-router-dom";

function CommentBar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { params } = useParams()
    const [keyword, setKeyword] = useState("");


    const handleComment = async (e) => {
      e.preventDefault();
      if (keyword.trim().length === 0) {
        return;
      }

    };

    return (
            <div className="pin-comment">
              <div className="pin-comment-container">
                <form onSubmit={handleComment} className="comment-bar-form">
                  <input className='comment-input-values'
                    placeholder="Comments coming soon!"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    maxLength="100"
                  />
                </form>
              </div>
            </div>
          );

}

export default CommentBar
