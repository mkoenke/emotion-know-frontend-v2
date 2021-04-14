/* global CY */
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Parallax } from 'react-scroll-parallax'
import 'semantic-ui-css/semantic.min.css'
import { Dimmer, Header, Loader } from 'semantic-ui-react'
import './App.css'
import NavBar from './Components/NavBar'
import FunWithEmotionsPage from './Containers/FunWithEmotionsPage'
import Homepage from './Containers/Homepage'
import ReportGalleryPage from './Containers/ReportGalleryPage'
import ResourcesPage from './Containers/ResourcesPage'
import VideoGalleryPage from './Containers/VideoGalleryPage'
import CameraPage from './Containers/VideoJournalPage'
import WelcomePageContainer from './Containers/WelcomePageContainer'

class App extends React.Component {
  state = {
    isLoading: true,
    timerOn: false,
    timerStart: 0,
    timerTime: 10000,
  }
  componentDidMount() {
    const config = { smoothness: 0.9, enableBalancer: false }
    CY.loader()
      .licenseKey(process.env.sdkLicense)
      .addModule(CY.modules().FACE_EMOTION.name, config)
      .addModule(CY.modules().FACE_AROUSAL_VALENCE.name)
      .load()
      .then(({ start, stop }) => {
        this.stopSDK = stop
        this.startSDK = start
        this.startSDK()
        console.log('starting in app')
        this.setState({ isLoading: false }, this.initialCountdown)
      })
  }

  initialCountdown = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    })
    this.timer = setInterval(() => {
      console.log('TimerTime:', this.state.timerTime)
      const newTime = this.state.timerTime - 10
      console.log(newTime)
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        })
      } else {
        clearInterval(this.timer)
        this.setState({ timerOn: false })
        this.stopSDK()
        console.log('stopping in app')
      }
    }, 10)
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart,
      })
    }
  }

  render() {
    console.log('state in app:', this.state)
    let history = createBrowserHistory()
    return (
      <>
        <NavBar />
        <div className="containerPad">
          <Switch>
            <Route path="/about" component={ResourcesPage} />
            <Route path="/welcome" component={WelcomePageContainer} />
            <Route
              path="/webcam"
              component={() => (
                <CameraPage
                  history={history}
                  stopSDK={this.stopSDK}
                  startSDK={this.startSDK}
                />
              )}
            />

            <Route path="/videos" component={VideoGalleryPage} />
            <Route path="/reports" component={ReportGalleryPage} />

            <Route
              path="/fun"
              component={() => (
                <FunWithEmotionsPage
                  stopSDK={this.stopSDK}
                  startSDK={this.startSDK}
                />
              )}
            />
            <Route
              path="/"
              component={() =>
                !this.state.isLoading ? (
                  <Homepage stopSDK={this.stopSDK} startSDK={this.startSDK} />
                ) : (
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
                )
              }
            />
          </Switch>
        </div>
      </>
    )
  }
}

export default App
