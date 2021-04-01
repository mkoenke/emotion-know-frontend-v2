import {
  ADD_REPORT,
  ADD_VIDEO,
  ALL_REPORTS,
  ALL_VIDEOS,
  CLICKED_REPORT,
  DELETE_VIDEO,
  LOGOUT,
  MODAL_OPEN,
  PARENTS_REPORTS,
  PARENT_MODAL_OPEN,
  PARENT_PROFILE_MODAL_OPEN,
  PROFILE_MODAL_OPEN,
  SET_CHILD,
  SET_ERROR,
  SET_PARENT,
  SIGN_UP_MODAL_OPEN,
} from './actionTypes'

///login/logout actions

export function login(child) {
  return (dispatch) => {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(child),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.error) {
          localStorage.setItem('token', data.jwt)

          dispatch(setChild(data.child))
          dispatch(setModal(false))
          dispatch(setError(null))
          dispatch(allVideos(data.child.video_entries))
          dispatch(allReports(data.child.video_entries))
        } else {
          dispatch(setError(data.error))
        }
      })
  }
}

export function loginParent(parent) {
  return (dispatch) => {
    return fetch('http://localhost:3000/parentLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(parent),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.error) {
          localStorage.setItem('token', data.jwt)

          dispatch(setParent(data.parent))
          dispatch(setChild(data.parent.child))
          dispatch(setParentModal(false))
          dispatch(setError(null))
          dispatch(parentsReports(data.parent.video_reports))
        } else {
          dispatch(setError(data.error))
        }
      })
  }
}

export function logout() {
  return { type: LOGOUT }
}

//child actions

export function setChild(child) {
  return { type: SET_CHILD, payload: child }
}

//parent actions

export function setParent(parent) {
  return { type: SET_PARENT, payload: parent }
}

//modal actions

export function setModal(value) {
  return { type: MODAL_OPEN, payload: value }
}

export function setParentModal(value) {
  return { type: PARENT_MODAL_OPEN, payload: value }
}

export function setSignUpModal(value) {
  return { type: SIGN_UP_MODAL_OPEN, payload: value }
}

export function setProfileModal(value) {
  return { type: PROFILE_MODAL_OPEN, payload: value }
}

export function setParentProfileModal(value) {
  return { type: PARENT_PROFILE_MODAL_OPEN, payload: value }
}

//error action

export function setError(error) {
  return { type: SET_ERROR, payload: error }
}

//Video journal actions

export function allVideos(arrayOfVideos) {
  return { type: ALL_VIDEOS, payload: arrayOfVideos }
}

export function addVideoToAllVideos(videoJournal) {
  return { type: ADD_VIDEO, payload: videoJournal }
}

export function deleteVideo(journal) {
  return (dispatch) => {
    return fetch(`http://localhost:3000/video_entries/${journal.id}`, {
      method: 'DELETE',
    })
      .then((resp) => resp.json())
      .then(() => {
        dispatch(removeVideo(journal))
      })
  }
}

function removeVideo(journal) {
  return { type: DELETE_VIDEO, payload: journal }
}

//Report actions

export function allReports(arrayOfVideos) {
  let arrayOfVideoReports = arrayOfVideos.map((video) => video.video_report)
  let sortedReports = arrayOfVideoReports.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at)
  })
  return { type: ALL_REPORTS, payload: sortedReports }
}

export function addReportToAllReports(report) {
  return { type: ADD_REPORT, payload: report }
}

export function setClickedReport(report) {
  return { type: CLICKED_REPORT, payload: report }
}

export function parentsReports(videoReports) {
  let sortedReports = videoReports.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at)
  })
  return { type: PARENTS_REPORTS, payload: sortedReports }
}
