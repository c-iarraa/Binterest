// constants to avoid debugging typos
export const LOAD_PINS = "pins/GETALLPINS";
export const LOAD_SPECIFIC_PIN = "pins/GETONEPIN";
export const UPDATE_PIN = "pins/UPDATEPIN";
export const CREATE_PIN = "pins/CREATEPIN";
export const REMOVE_PIN = "pins/REMOVEPIN";


// ------------------------ search pins thunk ------------------------------------

export const SEARCH_PINS = "pins/searchedPins";

// regular action creators
const search = (pins) => ({
    type: SEARCH_PINS,
    pins
});


// Create the action creator for searching all pins
// thunk action creator
export const search_pins = (keyword) => async (dispatch) =>{
    const response = await fetch(`/api/pins/search/${keyword}`)

    if (response.ok){
     // Constant variable to specify the action type ('pins/searchedPins”)
      const data = await response.json()
      console.log('data from backend', data)
      dispatch(search(data))
      return data
    }
  }

// ------------------------ search pins thunk ------------------------------------


// regular action creators

const remove = (pin) => ({
    type: REMOVE_PIN,
    pin
});

const create = (pin) => ({
    type: CREATE_PIN,
    payload: pin
})

const update = (pin) => ({
    type: UPDATE_PIN,
    pin
})

const loadSpecificPin = (onePin) => ({
    type: LOAD_SPECIFIC_PIN,
    onePin
})

const load = (pinList) => ({
    type: LOAD_PINS,
    pinList
})


// - [ DONE ] Create and Export the Thunk action creator (this is to fetch and parse your data from your backend database)
// Create the action creator to delete a pin
// thunk action creator
export const deletePin = (pinId) => async dispatch => {
  console.log(pinId)
    const response = await fetch(`/api/pins/${pinId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pinId),
      })
    if (response.ok){
     // Constant variable to specify the action type (“pins/deletePin”)
      const pin = await response.json()
      console.log(pin)
      dispatch(remove(pin))
    }
  }


// Create the action creator to create a pin
// thunk action creator
export const createPin = (newPin, id) => async (dispatch) => {
    // console.log('in the thunk')
    // console.log('ownerid', id)
    const response = await fetch(`/api/pins/${id}/create`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newPin),
      })
      // console.log('after the fetch')
      // console.log('fetched response', response)
    if (response.ok){
     // Constant variable to specify the action type (“pins/createPin”)
      const createdPin = await response.json()
      // console.log('createdPin', createdPin)
      dispatch(create(createdPin))
      // console.log('dispatched thunk')
      return createdPin;
    }

    else {
      console.log("add pin failed here")
    }
  }


// Create the action creator to update a pin
// thunk action creator
export const updatePin = (pin, pinId) => async dispatch => {
  // console.log('pin info from thunk', pin)
  // console.log('pin id form thunk', pinId)
    const response = await fetch(`/api/pins/${pinId}/update`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(pin),
      })
      // console.log('inside of thunk', pinId)
    if (response.ok){
     // Constant variable to specify the action type (“pins/updatePin”)
      const pin = await response.json()
      dispatch(update(pin))
      return pin
    }
  }


// Create the action creator for one pin
// thunk action creator
export const onePin = (pinId) => async dispatch => {
  console.log("9837897489", pinId)
    const response = await fetch(`/api/pins/${pinId}`)

    if (response.ok){
     // Constant variable to specify the action type (“pins/getOnePin”)
      const pin = await response.json()
      dispatch(loadSpecificPin(pin))
      return pin
    }
  }


// Create the action creator for all pins
// thunk action creator
export const getPins = () => async dispatch => {
    const response = await fetch(`/api/pins`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(),
      })

    if (response.ok){
     // Constant variable to specify the action type (“pins/getAllPins”)
      const pin = await response.json()
      dispatch(load(pin))
      return pin
    }
  }


// state object
const initialState = { allPins: {}, onePin: {} };

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
      // Create a case in your reducer to handle the data returned from fetch/parse
    case LOAD_PINS:{
      const newState = { allPins: {}, onePin: {} };
      // console.log('new state reducer', newState)
      // console.log('pinlist from reducer', action.pinList)
            action.pinList.pins.forEach(pin => newState.allPins[pin.id] = pin);
            return newState;
        }

      case LOAD_SPECIFIC_PIN: {
        const newState = { ...state, onePin: {} };
        // console.log(action.onePin)
            newState.onePin = action.onePin
            return newState
        }

      case CREATE_PIN: {
        const newState = {...state, allPins: {...state.allPins}};
        if (Array.isArray (action.payload)) {
            action.payload.forEach(pin => {
                newState.allPins[pin.id] = pin
            })
        } else {
            newState.allPins[action.payload.id] = action.payload
          }
          return newState
      }

      case UPDATE_PIN: {
        const newState = { ...state, allPins: { ...state.allPins}}
        // console.log('inside update pin reducer', newState)
        newState.allPins[action.pin.id] = action.pin;
        return newState
      }

      case REMOVE_PIN: {
        const newState = {...state, allPins: { ...state.allPins}}
        delete newState.allPins[action.id]
        return newState
      }

      case SEARCH_PINS:
            console.log('state from reducer', state)
            const newState = { ...state, searchedPins: {} };
            action.pins.Pins.forEach((pin) => {
                newState.searchedPins[pin.id] = pin;
            });
            console.log('MEOW@@#',newState)
            return newState;

    default:
      return state;
  }
};

export default pinReducer;
