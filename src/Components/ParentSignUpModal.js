import React from 'react'
import { connect } from 'react-redux'
import { Button, Confirm, Form, Input, Message, Modal } from 'semantic-ui-react'
import { setChild, setError, setSignUpModal } from '../Redux/actions'
import AddChildSignUpModal from './AddChildSignUpModal'

class SignUpModal extends React.Component {
  state = {
    isOpen: true,
    openConfirm: false,
    openChildModal: false,
    parentId: null,
    email: null,
    confirmEmail: null,
    parentPassword: null,
    confirmParentPassword: null,
    emailError: false,
    emailMatchError: false,
    parentPasswordError: false,
    parentPasswordMatchError: false,
  }
  handleCancel = () => {
    this.props.dispatchSignUpModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.checkMatching)
  }
  checkMatching = () => {
    if (this.state.email !== this.state.confirmEmail) {
      this.setState({ emailError: true, emailMatchError: true })
    }
    if (this.state.email === this.state.confirmEmail) {
      this.setState({ emailError: false, emailMatchError: false })
    }
    if (this.state.parentPassword !== this.state.confirmParentPassword) {
      this.setState({
        parentPasswordError: true,
        parentPasswordMatchError: true,
      })
    }
    if (this.state.parentPassword === this.state.confirmParentPassword) {
      this.setState({
        parentPasswordError: false,
        parentPasswordMatchError: false,
      })
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    let parentData = null

    if (
      this.state.email === this.state.confirmEmail &&
      this.state.email &&
      this.state.parentPassword === this.state.confirmParentPassword &&
      this.state.parentPassword
    ) {
      parentData = {
        email: this.state.email,
        password: this.state.parentPassword,
      }
    }
    fetch('http://localhost:3000/parents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parentData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Parent data:', data)
        this.setState({
          openConfirm: true,
          isOpen: false,
          parentId: data.parent.id,
        })
      })
      .catch((error) => {
        this.props.dispatchError(error)
      })
  }
  handleConfirmCancel = () => {
    this.setState({ openConfirm: false, isOpen: false })
  }
  handleConfirm = () => {
    this.setState({ openChildModal: true, openConfirm: false, isOpen: false })
  }

  render() {
    return (
      <>
        {this.state.openConfirm && (
          <Confirm
            open={this.state.openConfirm}
            content="Parent's account has been created!  Would you like to add a child?"
            confirmButton="Add Child"
            onCancel={this.handleConfirmCancel}
            onConfirm={this.handleConfirm}
          />
        )}
        {this.state.openChildModal && (
          <AddChildSignUpModal parentId={this.state.parentId} />
        )}
        <Modal
          onClose={() => this.setState({ isOpen: false })}
          onOpen={() => this.setState({ isOpen: true })}
          open={this.state.isOpen}
          closeOnDimmerClick={false}
          dimmer="blurring"
        >
          <Modal.Header className="background pageHeader">
            Welcome to EmotionKnow!
          </Modal.Header>
          <Modal.Content className="background">
            {this.props.error ? (
              <Message negative>
                <Message.Header>{this.props.error}</Message.Header>
              </Message>
            ) : null}

            {this.state.emailError ? (
              <Message negative>
                <Message.Header>Emails do not match!</Message.Header>
              </Message>
            ) : null}
            {this.state.parentPasswordError ? (
              <Message negative>
                <Message.Header>Parent Passwords do not match!</Message.Header>
              </Message>
            ) : null}
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Field required>
                <label className="formLabel">Parent's email</label>
                <input
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleFormChange}
                  placeholder="Parent's Email"
                />
              </Form.Field>
              <Form.Field required>
                <label className="formLabel">Confirm Email</label>
                <Input
                  name="confirmEmail"
                  type="email"
                  value={this.state.confirmEmail}
                  onChange={this.handleFormChange}
                  placeholder="Confirm Email"
                  error={this.state.emailMatchError}
                />
              </Form.Field>
              <Form.Field required>
                <label className="formLabel">Parent's Password</label>
                <input
                  name="parentPassword"
                  type="password"
                  value={this.state.parentPassword}
                  onChange={this.handleFormChange}
                  placeholder="Parent's Password"
                />
              </Form.Field>
              <Form.Field required>
                <label className="formLabel">Confirm Parent's Password</label>
                <Input
                  name="confirmParentPassword"
                  type="password"
                  value={this.state.confirmParentPassword}
                  onChange={this.handleFormChange}
                  placeholder="Confirm Parent's Password"
                  error={this.state.parentPasswordMatchError}
                />
              </Form.Field>
              <div className="formButtonContainer">
                <Button className="formButton" type="submit">
                  Submit
                </Button>

                <Button
                  className="formButton"
                  onClick={this.handleCancel}
                  type="cancel"
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChild: (child) => dispatch(setChild(child)),
    dispatchSignUpModal: (value) => dispatch(setSignUpModal(value)),
    dispatchError: (value) => dispatch(setError(value)),
  }
}

export default connect(null, mapDispatchToProps)(SignUpModal)
