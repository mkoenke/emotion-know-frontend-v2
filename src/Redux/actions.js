import {
  ADD_REPORT,
  ADD_VIDEO,
  ALL_REPORTS,
  ALL_VIDEOS,
  CLICKED_REPORT,
  DELETE_VIDEO,
  EMPTY_GALLERY_MODAL_OPEN,
  FILTERED_REPORTS,
  FORGOT_PASSWORD_MODAL_OPEN,
  LOGOUT,
  MODAL_OPEN,
  PARENTS_REPORTS,
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
          console.log(data)

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
          console.log(data)
          localStorage.setItem('token', data.jwt)

          dispatch(setParent(data.parent))
          dispatch(setModal(false))
          dispatch(setError(null))
          dispatch(parentsReports(data.parent.video_reports))
        } else {
          dispatch(setError(data.error))
        }
      })
  }
}

export const getCurrentParent = () => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/get_current_user`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((parent) => {
        if (parent.error) {
          alert(parent.error)
        } else {
          console.log(parent)
          // dispatch(setCurrentParent(parent))
        }
      })
      .catch(console.log)
  }
}

export const resetPassword = (credentials) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/reset_password`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => res.json())
      .then((response) => {
        if (!!response.error) {
          alert(response.error)
        } else {
          alert(response.alert)
          dispatch(getCurrentParent())
        }
      })
      .catch(console.log)
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch(setParent(null))
    dispatch(setChild(null))
    dispatch(allVideos([]))
    dispatch(allReports([]))
    dispatch(setError(null))
    dispatch(parentsReports([]))
    dispatch(setSignUpModal(false))
    return { type: LOGOUT }
  }
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

export function setSignUpModal(value) {
  return { type: SIGN_UP_MODAL_OPEN, payload: value }
}

export function setProfileModal(value) {
  return { type: PROFILE_MODAL_OPEN, payload: value }
}

export function setParentProfileModal(value) {
  return { type: PARENT_PROFILE_MODAL_OPEN, payload: value }
}

export function setEmptyGalleryModal(value) {
  return { type: EMPTY_GALLERY_MODAL_OPEN, payload: value }
}

export function setForgotPasswordModal(value) {
  return { type: FORGOT_PASSWORD_MODAL_OPEN, payload: value }
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

export function setFilteredReports(reports) {
  return { type: FILTERED_REPORTS, payload: reports }
}
