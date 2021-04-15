/* global CY */

import React from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { Grid, Header, Message } from 'semantic-ui-react'
import BubbleChart from '../Components/bubbleChart'

class FunWithEmotionsPage extends React.Component {
  state = {
    emo: '',
    arousal: '',
    valence: '',
    mood: '',
    anger: 0.25,
    disgust: 0.67,
    fear: 0.43,
    joy: 0.94,
    sadness: 0.28,
    surprise: 0.52,
    affects98: '',
    dominantAffect: '',
    timerOn: false,
    timerStart: 0,
    timerTime: 10000,
  }
  componentDidMount() {
    window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
      this.setState({
        emo: evt.detail.output.dominantEmotion,
        anger: evt.detail.output.rawEmotion.Angry,
        disgust: evt.detail.output.rawEmotion.Disgust,
        fear: evt.detail.output.rawEmotion.Fear,
        joy: evt.detail.output.rawEmotion.Happy,
        sadness: evt.detail.output.rawEmotion.Sad,
        surprise: evt.detail.output.rawEmotion.Surprise,
      })
    })
    window.addEventListener(
      CY.modules().FACE_AROUSAL_VALENCE.eventName,
      (evt) => {
        this.setState(
          {
            affects98: evt.detail.output.affects98,
          },
          this.findDominantAffect(evt.detail.output.affects98)
        )
      }
    )
  }

  componentWillUnmount() {
    this.props.stopSDK()
  }

  startTimer = () => {
    this.props.startSDK()
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    })
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1000
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        })
      } else {
        clearInterval(this.timer)
        this.setState({ timerOn: false })
        this.props.stopSDK()
      }
    }, 1000)
  }
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart,
      })
    }
  }

  findDominantAffect = (affectsObj) => {
    let affect = Object.keys(affectsObj).reduce(function (a, b) {
      return affectsObj[a] > affectsObj[b] ? a : b
    })
    this.setState({ dominantAffect: affect })
  }

  render() {
    const videoConstraints = {
      facingMode: 'user',

      height: { min: 200, max: 600 },
      width: { min: 400, max: 700 },
    }

    let data = [
      parseFloat(this.state.anger),
      parseFloat(this.state.disgust),
      parseFloat(this.state.fear),
      parseFloat(this.state.joy),
      parseFloat(this.state.sadness),
      parseFloat(this.state.surprise),
    ]
    const { timerTime, timerStart, timerOn } = this.state
    let seconds = Math.floor(timerTime / 1000)

    const faceArray = [
      'happy',
      'angry',
      'sad',
      'fearful',
      'surprised',
      'disgusted',
      'joyful',
      'shocked',
      'terrified',
      'repulsed',
      'heartbroken',
      'furious',
    ]
    const randomface = faceArray[Math.floor(Math.random() * faceArray.length)]

    return (
      <>
        <BubbleChart data={data} />
        {this.props.parent || this.props.child ? (
          <>
            <div className="pattern">
              {this.props.child && !this.props.parent ? (
                <Header className="pageHeader" size="huge" textAlign="center">
                  Let's make some funny faces, {this.props.child.username}!
                </Header>
              ) : null}
              {this.props.parent && (
                <Header className="pageHeader" size="huge" textAlign="center">
                  Let's make some funny faces!
                </Header>
              )}
              {!this.state.timerOn && (
                <Header className="whichFace" size="huge" textAlign="center">
                  Can you make a {randomface} face?
                </Header>
              )}

              <Header className="waitOrDom" size="huge" textAlign="center">
                {this.state.emo && this.state.dominantAffect && (
                  <>
                    Your face looks like you're feeling{' '}
                    <span className="emphasize">
                      {this.state.dominantAffect.toLowerCase()}!
                    </span>
                    <br />
                    Biggest Emotion:{' '}
                    <span className="emphasize">{this.state.emo}</span>
                  </>
                )}
                <>
                  <div className="timerContainer">
                    {timerOn && <div className="countdownTime">{seconds}</div>}
                    {timerOn === false &&
                      (timerStart === 0 || timerTime === timerStart) && (
                        <button onClick={this.startTimer}>
                          Of course! Let's go!
                        </button>
                      )}
                    {(timerOn === false || timerTime < 1000) &&
                      timerStart !== timerTime &&
                      timerStart > 0 && (
                        <button onClick={this.resetTimer}>Try it again!</button>
                      )}
                  </div>
                </>
              </Header>
              <Grid
                columns={3}
                centered
                verticalAlign="middle"
                container
                stackable
                textAlign="center"
                // className="videoGrid"
              >
                <Grid.Row>
                  <Grid.Column></Grid.Column>
                  <Grid.Column textAlign="center">
                    <Webcam
                      className="webcam"
                      videoConstraints={videoConstraints}
                    />
                  </Grid.Column>
                  <Grid.Column></Grid.Column>
                </Grid.Row>
              </Grid>

              <div className="footer" />
            </div>
          </>
        ) : null}
        <Message positive className="removeMargin">
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
    parent: state.parent,
  }
}

export default connect(mapStateToProps)(FunWithEmotionsPage)
