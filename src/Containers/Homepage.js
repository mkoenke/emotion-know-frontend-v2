/* global CY */
import React from 'react'
import { connect } from 'react-redux'
import { Parallax } from 'react-scroll-parallax'
import Webcam from 'react-webcam'
import { Dimmer, Grid, Header, Loader, Message } from 'semantic-ui-react'
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
    loading: true,
    timerOn: false,
    timerStart: 0,
    timerTime: 10000,
  }

  componentDidMount() {
    this.setState({ loading: false })
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
  initialCountdown = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    })
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 20
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        })
      } else {
        clearInterval(this.timer)
        this.setState({ timerOn: false })
        this.props.stopSDK()
      }
    }, 10)
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart,
      })
    }
  }

  startTimer = () => {
    this.props.startSDK()
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    })
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 20
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        })
      } else {
        clearInterval(this.timer)
        this.setState({ timerOn: false })
        this.props.stopSDK()
      }
    }, 10)
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
    console.log('state in homepage: ', this.state)

    return (
      <>
        <BubbleChart data={data} />

        <>
          <div className="pattern">
            <div>
              <div className="root height">
                <span className={`copy h1`}>
                  <Parallax x={[-300, 100]} className="letter">
                    EmotionKnow
                  </Parallax>
                </span>
                <Header className="subHeader" size="large">
                  Building Emotional Intelligence in Children
                </Header>
              </div>
            </div>
            {!this.state.timerOn ? (
              <Header className="waitOrDom" size="huge" textAlign="center">
                Can you make a happy face?
              </Header>
            ) : null}
            <Header className="waitOrDom" size="huge" textAlign="center">
              {this.state.emo && this.state.dominantAffect ? (
                <>
                  Your face looks like you're feeling{' '}
                  <span className="emphasize">
                    {this.state.dominantAffect.toLowerCase()}!
                  </span>
                  <br />
                  Biggest Emotion:{' '}
                  <span className="emphasize">{this.state.emo}</span>
                </>
              ) : (
                <>
                  {/* <p>Please wait a moment...</p> <Loader active inline /> */}
                </>
              )}
              {this.state.loading ? (
                <>
                  <Dimmer active page>
                    <div className="root height">
                      <span className={`copy h1`}>
                        <Parallax x={[0, 0]} className="letter">
                          EmotionKnow
                        </Parallax>
                      </span>
                      <Header className="subHeader" size="large">
                        Building Emotional Intelligence in Children
                      </Header>
                    </div>
                    <Header as="h2" inverted>
                      Please wait a moment...
                    </Header>{' '}
                    <Loader active inline />
                  </Dimmer>
                </>
              ) : (
                <>
                  <div className="Countdown-time">{seconds}</div>
                  {timerOn === false &&
                    (timerStart === 0 || timerTime === timerStart) && (
                      <button
                        className="Button-start"
                        onClick={this.startTimer}
                      >
                        Start
                      </button>
                    )}
                  {(timerOn === false || timerTime < 1000) &&
                    timerStart !== timerTime &&
                    timerStart > 0 && (
                      <button
                        className="Button-reset"
                        onClick={this.resetTimer}
                      >
                        Reset
                      </button>
                    )}
                </>
              )}
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
