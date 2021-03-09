import { combineReducers } from 'redux'
import {
  ADD_REPORT,
  ADD_VIDEO,
  ALL_REPORTS,
  ALL_VIDEOS,
  DELETE_VIDEO,
  LOGOUT,
  MODAL_OPEN,
  PARENTS_REPORTS,
  PARENT_MODAL_OPEN,
  SET_CHILD,
  SET_ERROR,
  SET_PARENT,
} from './actionTypes'

const defaultState = {
  child: null,
  parent: null,
  allReports: [],
  allVideos: [],
  error: null,
  parentsReports: [],
  modalOpen: false,
  parentModalOpen: false,
}

function modalReducer(prevState = defaultState.modalOpen, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return action.payload
    default:
      return prevState
  }
}

function parentModalReducer(prevState = defaultState.parentModalOpen, action) {
  switch (action.type) {
    case PARENT_MODAL_OPEN:
      return action.payload
    default:
      return prevState
  }
}

function childReducer(prevState = defaultState.child, action) {
  switch (action.type) {
    case SET_CHILD:
      return action.payload
    case LOGOUT:
      return null
    default:
      return prevState
  }
}

function parentReducer(prevState = defaultState.parent, action) {
  switch (action.type) {
    case SET_PARENT:
      return action.payload
    case LOGOUT:
      return null
    default:
      return prevState
  }
}

function videoArrayReducer(prevState = defaultState.allVideos, action) {
  switch (action.type) {
    case ALL_VIDEOS:
      return action.payload
    case ADD_VIDEO:
      return prevState.concat(action.payload)
    case DELETE_VIDEO:
      let filteredArray = prevState.filter(
        (journal) => journal.id !== action.payload.id
      )
      return filteredArray
    default:
      return prevState
  }
}

function reportArrayReducer(prevState = defaultState.allReports, action) {
  switch (action.type) {
    case ALL_REPORTS:
      return action.payload
    case ADD_REPORT:
      let reportsWithAddition = [...prevState, action.payload]
      return reportsWithAddition
    default:
      return prevState
  }
}

function parentReportReducer(prevState = defaultState.parentsReports, action) {
  switch (action.type) {
    case PARENTS_REPORTS:
      return action.payload
    default:
      return prevState
  }
}

function errorReducer(prevState = defaultState.error, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  child: childReducer,
  parent: parentReducer,
  allReports: reportArrayReducer,
  allVideos: videoArrayReducer,
  parentsReports: parentReportReducer,
  error: errorReducer,
  modalOpen: modalReducer,
  parentModalOpen: parentModalReducer,
})

export default rootReducer
