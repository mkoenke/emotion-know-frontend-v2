import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Message, Modal } from 'semantic-ui-react'
import { setChild, setError, setProfileModal } from '../Redux/actions'

class ProfileModal extends React.Component {
  state = {
    isOpen: true,
    username: '',
    confirmUsername: '',
    password: '',
    confirmPassword: '',
    usernameError: false,
    usernameMatchError: false,
    passwordError: false,
    passwordMatchError: false,
  }
  handleCancel = () => {
    this.props.dispatchProfileModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
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
    if (
      this.state.username === this.state.confirmUsername &&
      this.state.password === this.state.confirmPassword
    ) {
      let data = {
        username: this.state.username,
        password: this.state.password,
      }
      console.log(data)
    } else {
      console.log('THEY DONT MATCH')
    }

    //     fetch(`http://localhost:3000/children/${id}`, {
    //       method: 'PATCH',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         localStorage.setItem('token', data.jwt)
    //         this.props.dispatchError(null)
    //         this.props.dispatchChild(data.child)
    //         this.props.handleProfileClick()
    //         this.setState({ isOpen: false })
    //       })
    //       .catch((error) => {
    //         this.props.dispatchError(error)
    //       })
    //   })
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
          Edit Profile
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
              <label className="formLabel">New Username</label>
              <Input
                name="username"
                value={this.state.username}
                onChange={this.handleFormChange}
                placeholder="New Username"
                error={this.state.usernameError}
              />
            </Form.Field>
            <Form.Field required>
              <label className="formLabel">Confirm New Username</label>
              <Input
                name="confirmUsername"
                value={this.state.confirmUsername}
                onChange={this.handleFormChange}
                placeholder="Confirm New Username"
                error={this.state.usernameMatchError}
              />
            </Form.Field>
            <Form.Field required>
              <label className="formLabel">New Password</label>
              <Input
                name="password"
                type="password"
                value={this.state.email}
                onChange={this.handleFormChange}
                placeholder="New Password"
                error={this.state.passwordError}
              />
            </Form.Field>
            <Form.Field required>
              <label className="formLabel">Confirm New Password</label>
              <Input
                name="confirmPassword"
                type="password"
                value={this.state.parentPassword}
                onChange={this.handleFormChange}
                placeholder="Confirm New Password"
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
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChild: (child) => dispatch(setChild(child)),
    dispatchProfileModal: (value) => dispatch(setProfileModal(value)),
    dispatchError: (value) => dispatch(setError(value)),
  }
}

export default connect(null, mapDispatchToProps)(ProfileModal)
