import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal } from 'semantic-ui-react'
import { setEmptyGalleryModal } from '../Redux/actions'

class EmptyReportsModal extends React.Component {
  state = {
    isOpen: true,
  }
  // handleCancel = () => {
  //   this.setState({
  //     isOpen: false,
  //   })
  //   this.props.dispatchEmptyGalleryModal(false)
  // }

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
            Your child's reports will appear here, but you have to create
            journals first!
          </Modal.Description>
          <Modal.Actions className="actionsDiv">
            <NavLink to="/welcome">
              <Button className="formButton" content="Back" />
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

function mapDispatchToProps(dispatch) {
  return {
    dispatchEmptyGalleryModal: (value) => dispatch(setEmptyGalleryModal(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmptyReportsModal)
