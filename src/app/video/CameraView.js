/* global CY */

import emailjs from 'emailjs-com'
import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  Button,
  Dimmer,
  Form,
  Grid,
  Header,
  Loader,
  Message,
} from 'semantic-ui-react'
import { addReportToAllReports, addVideoToAllVideos } from '../../Redux/actions'
import Video from '../../Components/VideoRecorder'

let angerData = []
let disgustData = []
let fearData = []
let joyData = []
let sadnessData = []
let surpriseData = []
let timedAngerData = []
let timedDisgustData = []
let timedFearData = []
let timedJoyData = []
let timedSadnessData = []
let timedSurpriseData = []

class RecordView extends React.Component {
  state = {
    title: '',
    submittedTitle: '',
    videoBlob: null,
    emo: '',
    emoData: '',
    isRecording: false,
    angerArr: [],
    fearArr: [],
    joyArr: [],
    surpriseArr: [],
    disgustArr: [],
    sadnessArr: [],
    isLoading: true,
  }

  componentDidMount() {
    this.setState({ isLoading: false })
  }
  componentWillUnmount() {
    this.props.stopSDK()
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleTitleSubmit = () => {
    this.setState(
      { submittedTitle: this.state.title },
      this.setState({ title: '' })
    )
  }

  handleUploadClick = () => {
    this.handleVideoUpload(this.state.videoBlob)
  }

  handleVideoUpload = (file) => {
    const journal = new FormData()
    journal.append('title', this.state.submittedTitle)
    journal.append('child_id', this.props.child.id)
    journal.append('video', file, `${this.state.submittedTitle}`)

    fetch('http://localhost:3000/video_entries', {
      method: 'POST',
      body: journal,
    })
      .then((resp) => resp.json())
      .then((returnedVideoJournal) => {
        this.props.dispatchVideo(returnedVideoJournal)
        this.postReport(returnedVideoJournal)
        this.sendEmail()
        // this.props.history.push('/videos')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  sendEmail = () => {
    emailjs
      .send(
        'service_b4uxd6p',
        'template_skc2xnu',
        {
          parentEmail: this.props.child.parent_email,
          replyEmail: 'EmotionKnowTeam@gmail.com',
        },
        'user_CN4ma3aQ7rwUtwDJc9mdp'
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text)
        },
        function (error) {
          console.log('FAILED...', error)
        }
      )
  }

  postReport = (journal) => {
    let reportToPost = {
      title: this.state.submittedTitle,
      video_entry_id: journal.id,
      child_id: this.props.child.id,
      parent_id: this.props.child.parent.id,
      anger: this.state.angerArr,
      disgust: this.state.disgustArr,
      fear: this.state.fearArr,
      joy: this.state.joyArr,
      sadness: this.state.sadnessArr,
      surprise: this.state.surpriseArr,
    }
    return fetch('http://localhost:3000/video_reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(reportToPost),
    })
      .then((resp) => resp.json())
      .then((returnedReport) => {
        this.props.dispatchReport(returnedReport)
      })
  }

  timedDataCollectorVar = null
  startTimedDataCollector = () => {
    this.timedDataCollectorVar = setInterval(() => {
      timedAngerData.push(angerData[angerData.length - 1])
      timedDisgustData.push(disgustData[disgustData.length - 1])
      timedFearData.push(fearData[fearData.length - 1])
      timedJoyData.push(joyData[joyData.length - 1])
      timedSadnessData.push(sadnessData[sadnessData.length - 1])
      timedSurpriseData.push(surpriseData[surpriseData.length - 1])
    }, 500)
  }
  stopTimedDataCollector = () => {
    clearInterval(this.timedDataCollectorVar)
    this.timedDataCollectorVar = null
  }

  onStartRecording = () => {
    angerData = []
    disgustData = []
    fearData = []
    joyData = []
    sadnessData = []
    surpriseData = []
    timedAngerData = []
    timedDisgustData = []
    timedFearData = []
    timedJoyData = []
    timedSadnessData = []
    timedSurpriseData = []
    this.setState({ isRecording: true }, () => {
      this.startListening()
      this.startTimedDataCollector()
    })
  }
  onRecordingComplete = (videoBlob) => {
    this.props.stopSDK()
    this.setState(
      {
        videoBlob,
        isRecording: false,
        angerArr: timedAngerData.splice(5),
        fearArr: timedFearData.splice(5),
        joyArr: timedJoyData.splice(5),
        surpriseArr: timedSurpriseData.splice(5),
        disgustArr: timedDisgustData.splice(5),
        sadnessArr: timedSadnessData.splice(5),
      },
      () => this.stopTimedDataCollector()
    )
  }

  startListening = () => {
    this.props.startSDK()
    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
      this.setState({
        emo: evt.detail.output.dominantEmotion,
        emoData: evt.detail.output.rawEmotion,
      })
      if (this.state.isRecording) {
        this.collectEmotionData(evt.detail.output.rawEmotion)
      }
    })
  }

  collectEmotionData = (emotionObj) => {
    angerData = [...angerData, emotionObj.Angry]
    fearData = [...fearData, emotionObj.Fear]
    disgustData = [...disgustData, emotionObj.Disgust]
    joyData = [...joyData, emotionObj.Happy]
    sadnessData = [...sadnessData, emotionObj.Sad]
    surpriseData = [...surpriseData, emotionObj.Surprise]
  }

  render() {
    return (
      <>
        <div className="journal videoJournal background">
          <div style={{ margin: '50px' }}>
            {this.state.submittedTitle ? (
              <Header as="h1" className="content" textAlign="center">
                {this.state.submittedTitle}
              </Header>
            ) : (
              <Grid centered>
                <Form onSubmit={this.handleTitleSubmit}>
                  <Form.Group widths="equal">
                    <Form.Input
                      style={{ width: '300px' }}
                      fluid
                      placeholder="Create Title"
                      onChange={this.changeHandler}
                      name="title"
                      value={this.state.title}
                    />
                  </Form.Group>
                  <Button className="formButton">Set Title</Button>
                </Form>
              </Grid>
            )}
          </div>
          <div>
            <Grid centered>
              {this.state.isLoading ? (
                <>
                  <Dimmer active>
                    <p>Please wait a moment...</p> <Loader active inline />
                  </Dimmer>
                </>
              ) : null}
              <div style={{ height: '620px', width: '800px' }}>
                <Video
                  onRecordingComplete={this.onRecordingComplete}
                  onStartRecording={this.onStartRecording}
                  onTurnOnCamera={this.props.startSDK}
                />
              </div>
            </Grid>
            <div
              style={{
                margin: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NavLink to="/videos">
                <Button className="formButton" onClick={this.handleUploadClick}>
                  Upload Video
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
        <Message positive>
          <Message.Header>Your privacy is important to us!</Message.Header>
          <p>
            MorphCast is a patented technology using facial analysis to adapt
            content to the viewer in real-time whilst protecting their privacy.
            The software runs directly in your browser and emotions are found
            based on Deep Neural Network AI, able to analyse facial expressions.
            The only data that is stored, is what you choose to store when you
            upload!
          </p>
        </Message>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchReport: (report) => dispatch(addReportToAllReports(report)),
    dispatchVideo: (journal) => dispatch(addVideoToAllVideos(journal)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordView)
