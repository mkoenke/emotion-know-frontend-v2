import React from 'react'
import { connect } from 'react-redux'
import { Button, Confirm, Form, Input, Message, Modal } from 'semantic-ui-react'
import { setChild, setError, setSignUpModal } from '../Redux/actions'

class SignUpModal extends React.Component {
  state = {
    isOpen: true,
    openConfirm: false,
    username: null,
    confirmUsername: null,
    password: null,
    confirmPassword: null,
    usernameError: false,
    usernameMatchError: false,
    passwordError: false,
    passwordMatchError: false,
  }
  handleCancel = () => {
    this.props.dispatchSignUpModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.checkMatching)
  }
  checkMatching = () => {
    if (this.state.username !== this.state.confirmUsername) {
      this.setState({ usernameError: true, usernameMatchError: true })
    }
    if (this.state.username === this.state.confirmUsername) {
      this.setState({ usernameError: false, usernameMatchError: false })
    }
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordError: true, passwordMatchError: true })
    }
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ passwordError: false, passwordMatchError: false })
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    let childData = null
    if (
      this.state.username === this.state.confirmUsername &&
      this.state.username &&
      this.state.password === this.state.confirmPassword &&
      this.state.password
    ) {
      childData = {
        username: this.state.username,
        password: this.state.password,
        parent_id: this.props.parentId,
      }
    }
    fetch('http://localhost:3000/children', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(childData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('child data:', data)
        this.setState({ isOpen: false, openConfirm: true })
        this.props.dispatchError(null)
        this.props.handleSignUpClick()
      })
      .catch((error) => {
        this.props.dispatchError(error)
      })
  }

  handleConfirmCancel = () => {
    this.setState({ openConfirm: false, isOpen: false })
  }
  handleConfirm = () => {
    this.setState({ isOpen: true, openConfirm: false })
  }

  render() {
    return (
      <>
        {this.state.openConfirm && (
          <Confirm
            open={this.state.openConfirm}
            content="Would you like to add another a child?"
            confirmButton="Yes"
            cancelButton="No"
            onCancel={this.handleConfirmCancel}
            onConfirm={this.handleConfirm}
          />
        )}
        <Modal
          onClose={() => this.setState({ isOpen: false })}
          onOpen={() => this.setState({ isOpen: true })}
          open={this.state.isOpen}
          closeOnDimmerClick={false}
          dimmer="blurring"
        >
          <Modal.Header className="background pageHeader">
            Create Child's Login
          </Modal.Header>
          <Modal.Content className="background">
            {this.props.error ? (
              <Message negative>
                <Message.Header>{this.props.error}</Message.Header>
              </Message>
            ) : null}
            {this.state.usernameError ? (
              <Message negative>
                <Message.Header>Usernames do not match!</Message.Header>
              </Message>
            ) : null}
            {this.state.passwordError ? (
              <Message negative>
                <Message.Header>Passwords do not match!</Message.Header>
              </Message>
            ) : null}
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Field required>
                <label className="formLabel">Username</label>
                <input
                  name="username"
                  value={this.state.username}
                  onChange={this.handleFormChange}
                  placeholder="Username"
                />
              </Form.Field>
              <Form.Field required>
                <label className="formLabel">Confirm Username</label>
                <Input
                  name="confirmUsername"
                  value={this.state.confirmUsername}
                  onChange={this.handleFormChange}
                  placeholder="Confirm Username"
                  error={this.state.usernameMatchError}
                />
              </Form.Field>
              <Form.Field required>
                <label className="formLabel">Password</label>
                <input
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleFormChange}
                  placeholder="Password"
                />
              </Form.Field>
              <Form.Field required>
                <label className="formLabel">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleFormChange}
                  placeholder="Confirm Password"
                  error={this.state.passwordMatchError}
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
