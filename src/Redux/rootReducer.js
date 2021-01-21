import { combineReducers } from "redux"
import {
  ADD_JOURNAL,
  ALL_JOURNALS,
  ALL_REPORTS,
  DELETE_JOURNAL,
  LOGOUT,
  SET_CHILD,
  SET_JOURNAL,
} from "./actionTypes"

const defaultState = {
  child: null,
  journal: null,
  allJournals: [],
  allReports: [],
}

function childReducer(prevState = defaultState.child, action) {
  switch (action.type) {
    case SET_CHILD:
      console.log("Set child: ", action.payload)

      return action.payload
    case LOGOUT:
      return null
    default:
      return prevState
  }
}

function journalReducer(prevState = defaultState.journal, action) {
  switch (action.type) {
    case SET_JOURNAL:
      console.log("Journal in reducer: ", action.payload)
      return action.payload
    default:
      return prevState
  }
}

function journalArrayReducer(prevState = defaultState.allJournals, action) {
  switch (action.type) {
    case ALL_JOURNALS:
      console.log("All journals in reducer: ", action.payload)
      return action.payload
    case ADD_JOURNAL:
      console.log("Added journal in reducer: ", action.payload)
      return prevState.concat(action.payload)
    case DELETE_JOURNAL:
      let filteredArray = prevState.filter(
        (journal) => journal.id !== action.payload.id
      )
      console.log("all journals after deleted: ", filteredArray)
      return filteredArray
    default:
      return prevState
  }
}
function reportArrayReducer(prevState = defaultState.allReports, action) {
  switch (action.type) {
    case ALL_REPORTS:
      console.log("All reports in reducer: ", action.payload)
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  child: childReducer,
  journal: journalReducer,
  allJournals: journalArrayReducer,
  allReports: reportArrayReducer,
})

export default rootReducer
