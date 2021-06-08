import { combineReducers } from 'redux'
import {
  ADD_REPORT,
  ADD_VIDEO,
  ALL_REPORTS,
  CLICKED_REPORT,
  DELETE_CHILD,
  DELETE_VIDEO,
  EMPTY_GALLERY_MODAL_OPEN,
  FILTERED_REPORTS,
  FORGOT_PASSWORD_MODAL_OPEN,
  LOGOUT,
  MODAL_OPEN,
  PARENTS_REPORTS,
  PARENT_PROFILE_MODAL_OPEN,
  PROFILE_MODAL_OPEN,
  SELECT_CHILD,
  SET_CHILD,
  SET_ERROR,
  SET_PARENT,
  SIGN_UP_MODAL_OPEN,
  VIDEO,
  VIDEO_ENTRIES,
} from './actionTypes'

const defaultState = {
  child: null,
  parent: null,
  allReports: [],
  videoEntries: [],
  error: null,
  parentsReports: [],
  filteredReports: [],
  modalOpen: false,
  signUpModalOpen: false,
  childSignupOpen: false,
  profileModalOpen: false,
  parentProfileModalOpen: false,
  emptyGalleryModalOpen: false,
  clickedReport: null,
  forgotPasswordModalOpen: false,
  videoCache: [],
  selectedChild: null,
}

function signUpModalReducer(prevState = defaultState.signUpModalOpen, action) {
  switch (action.type) {
    case SIGN_UP_MODAL_OPEN:
      return action.payload
    default:
      return prevState
  }
}

function forgotPasswordModalReducer(
  prevState = defaultState.forgotPasswordModalOpen,
  action
) {
  switch (action.type) {
    case FORGOT_PASSWORD_MODAL_OPEN:
      return action.payload
    default:
      return prevState
  }
}

function modalReducer(prevState = defaultState.modalOpen, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return action.payload
    default:
      return prevState
  }
}

function profileModalReducer(
  prevState = defaultState.profileModalOpen,
  action
) {
  switch (action.type) {
    case PROFILE_MODAL_OPEN:
      return action.payload
    default:
      return prevState
  }
}

function parentProfileModalReducer(
  prevState = defaultState.parentProfileModalOpen,
  action
) {
  switch (action.type) {
    case PARENT_PROFILE_MODAL_OPEN:
      return action.payload
    default:
      return prevState
  }
}

function emptyGalleryModalReducer(
  prevState = defaultState.emptyGalleryModalOpen,
  action
) {
  switch (action.type) {
    case EMPTY_GALLERY_MODAL_OPEN:
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
    case DELETE_CHILD:
      let filteredChilrenArray = prevState.children.filter(
        (child) => child.id !== action.payload.id
      )
      const newState = { ...prevState, children: filteredChilrenArray }
      return newState
    case LOGOUT:
      return null
    default:
      return prevState
  }
}

function videoEntriesReducer(prevState = defaultState.videoEntries, action) {
  // console.log("ACTION: ",action)
  switch (action.type) {
    case VIDEO_ENTRIES:
      return action.payload
    case ADD_VIDEO:
      return [action.payload,...prevState]
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

function clickedReportReducer(prevState = defaultState.clickedReport, action) {
  switch (action.type) {
    case CLICKED_REPORT:
      return action.payload
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

function filteredReportsReducer(
  prevState = defaultState.filteredReports,
  action
) {
  switch (action.type) {
    case FILTERED_REPORTS:
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

function videoCacheReducer(prevState = defaultState.videoCache, action) {
  switch (action.type) {
    case VIDEO:
      return [...prevState, action.payload]
    default:
      return prevState
  }
}
function selectedChildReducer(prevState = defaultState.selectedChild, action) {
  switch (action.type) {
    case SELECT_CHILD:
      return action.payload
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  child: childReducer,
  parent: parentReducer,
  allReports: reportArrayReducer,
  videoEntries: videoEntriesReducer,
  parentsReports: parentReportReducer,
  error: errorReducer,
  modalOpen: modalReducer,
  signUpModalOpen: signUpModalReducer,
  profileModalOpen: profileModalReducer,
  parentProfileModalOpen: parentProfileModalReducer,
  emptyGalleryModalOpen: emptyGalleryModalReducer,
  clickedReport: clickedReportReducer,
  filteredReports: filteredReportsReducer,
  forgotPasswordModalOpen: forgotPasswordModalReducer,
  videoCache: videoCacheReducer,
  selectedChild: selectedChildReducer,
})

export default rootReducer
