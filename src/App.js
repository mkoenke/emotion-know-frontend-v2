/* global CY */
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import './App.css'
import NavBar from './Components/NavBar'
import ResetPassword from './Components/ResetPassword'
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
        start()
        stop()
      })
    const faceEmotionEvent = CY.modules().FACE_EMOTION.eventName
    const faceArousalEvent = CY.modules().FACE_AROUSAL_VALENCE.eventName

    const emotionEventResponse = (evt) => {
      console.log('here')
      window.removeEventListener(faceEmotionEvent, emotionEventResponse)
    }
    const arousalEventResponse = (evt) => {
      window.removeEventListener(faceArousalEvent, arousalEventResponse)
      this.setState({ isLoading: false })
    }

    window.addEventListener(faceEmotionEvent, emotionEventResponse)
    window.addEventListener(faceArousalEvent, arousalEventResponse)
  }

  render() {
    let history = createBrowserHistory()
    return (
      <>
        <NavBar />
        <div className="containerPad">
          <Switch>
            <Route path="/reset_password" component={ResetPassword} />
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
                    {/* <Dimmer active page>
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
                    <Homepage stopSDK={this.stopSDK} startSDK={this.startSDK} /> */}
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
