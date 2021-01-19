import { combineReducers } from "redux"
import { SET_CHILD } from "./actionTypes"

const defaultState = {
  child: null,
}

function childReducer(prevState = defaultState.child, action) {
  switch (action.type) {
    case SET_CHILD:
      console.log("Set child: ", action.payload)

      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  child: childReducer,
})

export default rootReducer
