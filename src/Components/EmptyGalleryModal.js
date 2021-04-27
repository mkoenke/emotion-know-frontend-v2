import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'

class EmptyGalleryModal extends React.Component {
  state = {
    isOpen: true,
  }

  render() {
    return (
      <Modal
        onClose={() => this.setState({ isOpen: false })}
        onOpen={() => this.setState({ isOpen: true })}
        open={this.state.isOpen}
        closeOnDimmerClick={false}
        dimmer="inverted"
      >
        <Modal.Header className="background pageHeader">
          You're so close!
        </Modal.Header>
        <Modal.Content className="background">
          <Modal.Description
            textAlign="center"
            style={{ fontSize: '24px', textAlign: 'center' }}
          >
            Your gallery of video journals will appear here, but you have to
            record one first! Let's get started!
          </Modal.Description>
          <Modal.Actions className="actionsDiv">
            <NavLink to="/webcam">
              <Button className="formButton" content="Record a Video Journal" />
            </NavLink>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

export default connect(mapStateToProps)(EmptyGalleryModal)
