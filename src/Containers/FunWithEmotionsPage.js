/* global CY */

import { Bar, PolarArea, Radar } from '@reactchartjs/react-chart.js'
import React from 'react'
import { connect } from 'react-redux'
import Webcam from 'react-webcam'
import { Grid, Header, Loader, Message } from 'semantic-ui-react'
// import EmoBubbles from '../Components/bubbleChart'

class FunWithEmotionsPage extends React.Component {
  state = {
    emo: '',
    arousal: '',
    valence: '',
    mood: '',
    anger: '',
    disgust: '',
    fear: '',
    joy: '',
    sadness: '',
    surprise: '',
    affects98: '',
    dominantAffect: '',
  }
  componentDidMount() {
    this.props.startSDK()

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

  findDominantAffect = (affectsObj) => {
    let affect = Object.keys(affectsObj).reduce(function (a, b) {
      return affectsObj[a] > affectsObj[b] ? a : b
    })
    this.setState({ dominantAffect: affect })
  }

  render() {
    const videoConstraints = {
      facingMode: 'user',
      // width: { max: 700 },
      // height: { max: 320 },
      width: { min: 200, max: 480 },
      height: { min: 400, max: 620 },
      aspectRatio: 0.6666666667,
    }

    let data = {
      labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise'],
      datasets: [
        {
          label: `What does your face show?`,
          data: [
            parseFloat(this.state.anger),
            parseFloat(this.state.disgust),
            parseFloat(this.state.fear),
            parseFloat(this.state.joy),
            parseFloat(this.state.sadness),
            parseFloat(this.state.surprise),
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          // backgroundColor: [
          //   'rgb(255, 0, 0)',
          //   'rgb(255, 128, 0)',
          //   'rgb(0, 255, 0)',
          //   'rgb(255, 255, 0)',
          //   'rgb(0, 0, 255)',
          //   'rgb(127, 0, 255)',
          // ],
          // borderColor: [
          //   'rgba(255, 0, 0, 0.2)',
          //   'rgba(255, 128, 0, 0.2)',
          //   'rgba(0, 255, 0, 0.2)',
          //   'rgba(255, 255, 0, 0.2)',
          //   'rgba(0, 0, 255, 0.2)',
          //   'rgba(127, 0, 255, 0.2)',
          // ],
          borderWidth: 1,
        },
      ],
    }
    let data2 = {
      labels: ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise'],
      datasets: [
        {
          label: `What does your face show?`,
          data: [
            parseFloat(this.state.anger),
            parseFloat(this.state.disgust),
            parseFloat(this.state.fear),
            parseFloat(this.state.joy),
            parseFloat(this.state.sadness),
            parseFloat(this.state.surprise),
          ],
          backgroundColor: ['rgba(255, 99, 132, 0.5)'],

          borderWidth: 1,
        },
      ],
    }

    return (
      <>
        {!this.props.parent && this.props.child ? (
          <>
            <div className="pattern">
              <Header className="pageHeader" size="huge" textAlign="center">
                Let's make some funny faces, {this.props.child.username}!
              </Header>
              <Header className="waitOrDom" size="huge" textAlign="center">
                {this.state.emo && this.state.dominantAffect ? (
                  <>
                    Your face looks like you're feeling{' '}
                    {this.state.dominantAffect.toLowerCase()}!
                    <br />
                    Biggest Emotion: {this.state.emo}
                  </>
                ) : (
                  <>
                    <p>Please wait a moment...</p> <Loader active inline />
                    {/* <EmoBubbles /> */}
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
                  <Grid.Column textAlign="center">
                    <div className="funGraphDiv">
                      <PolarArea data={data} />
                    </div>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <Webcam
                      className="webcam"
                      videoConstraints={videoConstraints}
                    />
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <div className="funGraphDiv">
                      <Bar
                        data={data}
                        // width={700}
                        // height={320}
                        options={{ maintainAspectRatio: false }}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column textAlign="center">
                    <div className="funGraphDiv">
                      <Radar data={data2} />
                    </div>
                  </Grid.Column>
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
