import React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'
import ChooseChildList from '../Components/ChooseChildList'
import WelcomePageGrid from '../Components/WelcomePageGrid'

class WelcomePageContainer extends React.Component {
  render() {
    return (
      <>
        {!this.props.parent && this.props.child ? (
          <>
            <div className="background">
              <Header className="pageHeader" textAlign="center">
                Welcome to EmotionKnow, {this.props.child.username}!
              </Header>

              <WelcomePageGrid />
            </div>
          </>
        ) : null}
        {this.props.parent ? <ChooseChildList /> : null}
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

export default connect(mapStateToProps)(WelcomePageContainer)
