import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Modal, Segment } from 'semantic-ui-react'
import { setEmptyGalleryModal } from '../Redux/actions'

class EmptyGalleryModal extends React.Component {
  state = {
    isOpen: true,
  }
  handleCancel = () => {
    this.setState({
      isOpen: false,
    })
    this.props.dispatchEmptyGalleryModal(false)
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
          Check back here after recording!
        </Modal.Header>
        <Modal.Content className="background">
          <Segment basic textAlign="center">
            <NavLink to="/webcam">
              <Button className="formButton" content="Record a Video Journal" />
            </NavLink>
          </Segment>
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

export default connect(mapStateToProps, mapDispatchToProps)(EmptyGalleryModal)
