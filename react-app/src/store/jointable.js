// constants to avoid debugging typos
export const LOAD_JOINTABLE = "pinandboard/GETALLJOINTABLE";
export const ADD_JOINTABLE = "pinandboard/ADDJOINTABLE";
export const REMOVE_JOINTABLE = "pinandboard/REMOVEJOINTABLE";


// regular action creators

const remove = (jointable) => ({
    type: REMOVE_JOINTABLE,
    jointable
});

const add = (jointable) => ({
    type: ADD_JOINTABLE,
    payload: jointable
})

const load = (jointableList) => ({
    type: LOAD_JOINTABLE,
    jointableList
})


// - [ DONE ] Create and Export the Thunk action creator (this is to fetch and parse your data from your backend database)
// Create the action creator to delete a board
// thunk action creator
export const deleteJointable = (boardId) => async dispatch => {
  console.log('inside of delete jointable thunk')
  console.log('board id inside of delete thunk', boardId)
    const response = await fetch(`/api/pinboards/${boardId}/pinandboard`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(boardId),
      })
    if (response.ok){
     // Constant variable to specify the action type (pinandboard/deleteJointable”)
      const boardpin = await response.json()
      dispatch(remove(boardpin))
    }
  }


// Create the action creator to add a jointable
// thunk action creator
export const addJointable = (payload, id) => async (dispatch) => {
  console.log('inside of add thunk')
    const response = await fetch(`/api/pinboards/${id}/pinandboard`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })

    if (response.ok){
     // Constant variable to specify the action type (pinandboard/createJointable”)
      const newBoardpin = await response.json()
      newBoardpin['pins'] = newBoardpin.pins
      dispatch(add(newBoardpin))
      return newBoardpin;
    }
  }


// Create the action creator for all boards
// thunk action creator
export const getJointable = (id) => async dispatch => {
    const response = await fetch(`/api/pinboards/${id}/pinandboard`)

    if (response.ok){
     // Constant variable to specify the action type (pinandboard/getJointable”)
      const boardpins = await response.json()
      dispatch(load(boardpins))
      return boardpins
    }
    return response
  }


// state object
const initialState = { jointable: {} };

const jointableReducer = (state = initialState, action) => {
  switch (action.type) {
      // Create a case in your reducer to handle the data returned from fetch/parse
      case LOAD_JOINTABLE: {

        const newState = { ...state }
        newState.jointable = action.jointableList.board_pins
        // console.log('in reducer', action.jointableList.board_pins)
       return newState
      }

      case ADD_JOINTABLE: {
          const newState = {...state}
          const updated_boardpins = {}
          updated_boardpins['totalBoardPins'] = action.like.likes
          newState.jointable = updated_boardpins
          return newState
        }

      case REMOVE_JOINTABLE: {
        const newState = {...state}
        console.log('inside delete reducer w/ newstate', newState)
        delete newState.jointable[action.id]
        return newState
      }

      default:
        return state

  }
};

export default jointableReducer;
