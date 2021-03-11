/* global CY */
import { createBrowserHistory } from 'history'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
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
      })
  }

  render() {
    let history = createBrowserHistory()
    console.log('history: ', history)
    console.log('props in app:', this.props)
    return (
      <>
        <NavBar />
        <div className="containerPad">
          <Switch>
            <Route path="/resources" component={ResourcesPage} />
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
            <Route path="/" component={Homepage} />
          </Switch>
        </div>
      </>
    )
  }
}

export default App
