import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import CameraView from '../Components/CameraView'

class CameraPage extends React.Component {
  render() {
    return (
      <>
        <div className="pattern">
          {this.props.child ? (
            <Header className="pageHeader" size="huge" textAlign="center">
              How are you feeling today, {this.props.child.username}?
            </Header>
          ) : null}
          <div>
            <CameraView
              history={this.props.history}
              stopSDK={this.props.stopSDK}
              startSDK={this.props.startSDK}
            />
          </div>
        </div>
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

export default connect(mapStateToProps)(CameraPage)
