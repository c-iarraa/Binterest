// // constants to avoid debugging typos
// export const LOAD_COMMENTS = "comments/GETALLCOMMENTS";
// export const UPDATE_COMMENTS = "comments/UPDATECOMMENT";
// export const CREATE_COMMENTS = "comments/CREATECOMMENT";
// export const REMOVE_COMMENTS = "comments/REMOVECOMMENT";


// // regular action creators

// const remove = (comment) => ({
//     type: REMOVE_COMMENTS,
//     comment
// });

// const create = (comment) => ({
//     type: CREATE_COMMENTS,
//     payload: comment
// })

// const update = (comment) => ({
//     type: UPDATE_COMMENTS,
//     comment
// })


// const load = (commentList) => ({
//     type: LOAD_COMMENTS,
//     commentList
// })


// // - [ DONE ] Create and Export the Thunk action creator (this is to fetch and parse your data from your backend database)
// // Create the action creator to delete a comment
// // thunk action creator
// export const deleteComment = (commentId) => async dispatch => {
//   console.log('inside of delete thunk')
//     const response = await fetch(`/api/comments/${commentId}`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(commentId),
//       })
//     if (response.ok){
//      // Constant variable to specify the action type (comments/deleteComment)
//       const comment = await response.json()
//       console.log(comment)
//       dispatch(remove(comment))

//     }  else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data.errors;
//         }
//     } else {
//         return ["An error occurred. Please try again."];
//     }
//   }


// // Create the action creator to create a comment
// // thunk action creator
// export const createComment = (newComment, pinId) => async (dispatch) => {
//     // console.log('in the create thunk')
//     // console.log('pinId', pinId)
//     const response = await fetch(`/api/comments/${pinId}`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(newComment),
//       })
//       // console.log('after the fetch')
//     if (response.ok){
//      // Constant variable to specify the action type (comments/createComment”)
//       const createdComment = await response.json()
//       // console.log('createdComment', createdComment)
//       dispatch(create(createdComment))
//       // console.log('dispatched thunk')
//       return createdComment;

//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     } else {
//         return ["An error occurred. Please try again."];
//     }
//   }


// // Create the action creator to update a comment
// // thunk action creator
// export const updateComment = (comment, commentId) => async dispatch => {
//   console.log('comment info from update thunk', comment)
//   console.log('comment id from update thunk', commentId)
//     const response = await fetch(`/api/comments/${commentId}`, {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(comment),
//       })
//       console.log('inside of update thunk', commentId)

//     if (response.ok){
//      // Constant variable to specify the action type (comments/updateComment”)
//       const comment = await response.json()
//       console.log('comment form update thunk', comment)
//       dispatch(update(comment))
//       return comment

//     } else if (response.status < 500) {
//         const data = await response.json();
//         if (data.errors) {
//             return data;
//         }
//     } else {
//         return ["An error occurred. Please try again."];
//     }
//   }

// // Create the action creator for all comments
// // thunk action creator
// export const getComments = (pinId) => async dispatch => {
//     const response = await fetch(`/api/comments/${pinId}`)
//     //     method: 'GET',
//     //     headers: {'Content-Type': 'application/json'},
//     //     body: JSON.stringify(),
//     //   })

//     if (response.ok){
//      // Constant variable to specify the action type (comments/getAllComments”)
//       const comment = await response.json()
//       dispatch(load(comment))
//       return comment
//     }
//   }


// // state object
// const initialState = { allComments: {} };

// const commentReducer = (state = initialState, action) => {
//   switch (action.type) {
//     //  switch (action.type) {
// //       // Create a case in your reducer to handle the data returned from fetch/parse
// //     case LOAD_COMMENTS:{
// //       const newState = { allBoards: {}, oneBoard: {} };
// //       // console.log('new state reducer', newState)
// //       // console.log('boardlist from reducer', action.boardList)
// //             action.boardList.boards.forEach(board => newState.allBoards[board.id] = board);
// //             // console.log('in reducer', action.boardList)
// //             return newState;
// //         }

// //       case LOAD_SPECIFIC_BOARD: {
// //         const newState = { ...state, oneBoard: {} };
// //             newState.oneBoard = action.oneBoard.boards[0]
// //             // console.log('new state in reducer', newState)
// //             // console.log('action in reducer', action.oneBoard)
// //             return newState
// //         }

// //       case CREATE_COMMENT: {
// //         const newState = {...state, allBoards: {...state.allBoards}};
// //             // console.log('new state in reducer', newState)
// //         if (Array.isArray (action.payload)) {
// //             action.payload.forEach(board => {
// //                 newState.allBoards[board.id] = board
// //             })
// //             console.log('action in reducer', action.payload)
// //         } else {
// //             newState.allBoards[action.payload.id] = action.payload
// //           }
// //           console.log(newState, '12345')
// //           return newState
// //       }

//     //   case UPDATE_COMMENT: {
//     //     console.log('inside of update reducer')
//     //     const newState = { ...state, allBoards: { ...state.allBoards}}
//     //     console.log('new state in update reducer', newState)
//     //     // console.log('inside update board reducer', newState)
//     //     newState.allBoards[action.board.id] = action.board;
//     //     return newState
//     //   }

//     //   case REMOVE_COMMENT: {
//     //     const newState = {...state, allBoards: { ...state.allBoards}}
//     //     delete newState.allBoards[action.id]
//     //     return newState
//     //   }

//     default:
//       return state;
//   }
// };

// export default commentReducer;




const GET_ALL_COMMENTS = 'comment/GET_ALL_COMMENTS'
const POST_COMMENT = 'comment/POST_COMMENT'
const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const getAll = (comments) => ({
    type: GET_ALL_COMMENTS,
    comments
})

const postComment = (comment) => ({
  type: POST_COMMENT,
  comment
})



const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
})

export const deleteAComment = (commentId) => async(dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE'
  })
  console.log('response', response)
  if (response.ok){
    const deletionResponse = await response.json()

    dispatch(deleteComment(commentId))
    return deletionResponse
  }
}

export const postAComment = (id, payload) => async(dispatch) => {
  const response = await fetch(`/api/comments/${id}/comments/new`, {

      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
  })

  if (response.ok){
    const newComment = await response.json()
    dispatch(postComment(newComment))
    return newComment
  }

}


export const getAllComments = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}/comments`);

    if (response.ok) {
      const comments = await response.json();

      dispatch(getAll(comments));
    }
    return response
  };

  const initialState = { comments: {} }

  const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COMMENTS: {

          const newState = { ...state }
          const newObject = {}
          action.comments.comments.forEach(comment => {
            newObject[comment.id] = comment
          })

         newState.comments = newObject
         return newState

        }
        case POST_COMMENT: {
          const newState = {...state}
          const newObject = {...state.comments}
          newObject[action.comment.id] = action.comment
          newState.comments = newObject
          return newState
        }
        case DELETE_COMMENT:{
          const newState = {...state}
          const newObject = {...state.comments}
          delete newObject[action.commentId]
          newState.comments = newObject
          return newState
        }

        default:
          return state
      }
}


export default commentsReducer
