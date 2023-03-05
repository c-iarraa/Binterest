// constants to avoid debugging typos
export const LOAD_BOARDS = "pinboards/GETALLBOARDS";
export const LOAD_SPECIFIC_BOARD = "pinboards/GETONEBOARD";
export const UPDATE_BOARD = "pinboards/UPDATEBOARD";
export const CREATE_BOARD = "pinboards/CREATEBOARD";
export const REMOVE_BOARD = "pinboards/REMOVEBOARD";


// regular action creators

const remove = (board) => ({
    type: REMOVE_BOARD,
    board
});

const create = (board) => ({
    type: CREATE_BOARD,
    payload: board
})

const update = (board) => ({
    type: UPDATE_BOARD,
    board
})

const loadSpecificBoard = (oneBoard) => ({
    type: LOAD_SPECIFIC_BOARD,
    oneBoard
})

const load = (boardList) => ({
    type: LOAD_BOARDS,
    boardList
})


// - [ DONE ] Create and Export the Thunk action creator (this is to fetch and parse your data from your backend database)
// Create the action creator to delete a board
// thunk action creator
export const deleteBoard = (boardId) => async dispatch => {
  console.log('inside of delete thunk')
    const response = await fetch(`/api/pinboards/${boardId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(boardId),
      })
    if (response.ok){
     // Constant variable to specify the action type (pinboards/deleteBoard”)
      const board = await response.json()
      console.log(board)
      dispatch(remove(board))
    }
  }


// Create the action creator to create a board
// thunk action creator
export const createBoard = (newBoard, id) => async (dispatch) => {
    // console.log('in the create thunk')
    // console.log('ownerid', id)
    const response = await fetch(`/api/pinboards/${id}/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newBoard),
      })
      // console.log('after the fetch')
    if (response.ok){
     // Constant variable to specify the action type (“pinboards/createBoard”)
      const createdBoard = await response.json()
      // console.log('createdBoard', createdBoard)
      dispatch(create(createdBoard))
      // console.log('dispatched thunk')
      return createdBoard;
    }

    else {
      console.log("add board failed here")
    }
  }


// Create the action creator to update a board
// thunk action creator
export const updateBoard = (board, boardId) => async dispatch => {
  console.log('board info from update thunk', board)
  console.log('board id from update thunk', boardId)
    const response = await fetch(`/api/pinboards/${boardId}/update`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(board),
      })
      console.log('inside of update thunk', boardId)
    if (response.ok){
     // Constant variable to specify the action type (“pinboards/updateBoard”)
      const board = await response.json()
      console.log('board form update thunk', board)
      dispatch(update(board))
      return board
    }
  }


// Create the action creator for one board
// thunk action creator
export const oneBoard = (boardId) => async dispatch => {
    const response = await fetch(`/api/pinboards/${boardId}/details`)
    console.log('board id inside of thunk', boardId)

    if (response.ok){
     // Constant variable to specify the action type (“pinboards/getOneBoard”)
      const board = await response.json()
      dispatch(loadSpecificBoard(board))
      return board
    }
  }


// Create the action creator for all boards
// thunk action creator
export const getBoards = (userId) => async dispatch => {
    const response = await fetch(`/api/pinboards/${userId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(),
      })


    if (response.ok){
     // Constant variable to specify the action type (“pinboards/getAllBoards”)
      const board = await response.json()
      dispatch(load(board))
      return board
    }
  }


// state object
const initialState = { allBoards: {}, oneBoard: {} };

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
      // Create a case in your reducer to handle the data returned from fetch/parse
    case LOAD_BOARDS:{
      const newState = { allBoards: {}, oneBoard: {} };
      // console.log('new state reducer', newState)
      // console.log('boardlist from reducer', action.boardList)
            action.boardList.boards.forEach(board => newState.allBoards[board.id] = board);
            // console.log('in reducer', action.boardList)
            return newState;
        }

      case LOAD_SPECIFIC_BOARD: {
        const newState = { ...state, oneBoard: {} };
            newState.oneBoard = action.oneBoard.boards[0]
            // console.log('new state in reducer', newState)
            // console.log('action in reducer', action.oneBoard)
            return newState
        }

      case CREATE_BOARD: {
        const newState = {...state, allBoards: {...state.allBoards}};
            // console.log('new state in reducer', newState)
        if (Array.isArray (action.payload)) {
            action.payload.forEach(board => {
                newState.allBoards[board.id] = board
            })
            console.log('action in reducer', action.payload)
        } else {
            newState.allBoards[action.payload.id] = action.payload
          }
          console.log(newState, '12345')
          return newState
      }

      case UPDATE_BOARD: {
        console.log('inside of update reducer')
        const newState = { ...state, allBoards: { ...state.allBoards}}
        console.log('new state in update reducer', newState)
        // console.log('inside update board reducer', newState)
        newState.allBoards[action.board.id] = action.board;
        return newState
      }

      case REMOVE_BOARD: {
        const newState = {...state, allBoards: { ...state.allBoards}}
        delete newState.allBoards[action.id]
        return newState
      }

    default:
      return state;
  }
};

export default boardReducer;
