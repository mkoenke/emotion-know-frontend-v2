import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Message, Modal } from 'semantic-ui-react'
import { setChild, setError, setParentProfileModal } from '../Redux/actions'

class ParentProfileModal extends React.Component {
  state = {
    isOpen: true,
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    emailError: false,
    emailMatchError: false,
    passwordError: false,
    passwordMatchError: false,
  }
  handleCancel = () => {
    this.props.dispatchParentProfileModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    if (this.state.email !== this.state.confirmEmail) {
      this.setState({ emailError: true, emailMatchError: true })
    }
    if (this.state.email === this.state.confirmEmail) {
      this.setState({ emailError: false, emailMatchError: false })
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
      this.state.email === this.state.confirmEmail &&
      this.state.password === this.state.confirmPassword
    ) {
      let data = {
        email: this.state.email,
        password: this.state.password,
      }
      console.log(data)
    } else {
      console.log('THEY DONT MATCH')
    }

    //     fetch(`http://localhost:3000/parents/${id}`, {
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
          {this.state.emailError ? (
            <Message negative>
              <Message.Header>Emails do not match!</Message.Header>
            </Message>
          ) : null}
          {this.state.passwordError ? (
            <Message negative>
              <Message.Header>Passwords do not match!</Message.Header>
            </Message>
          ) : null}
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field required>
              <label className="formLabel">New Email</label>
              <Input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleFormChange}
                placeholder="New Email"
                error={this.state.emailError}
              />
            </Form.Field>
            <Form.Field required>
              <label className="formLabel">Confirm New Email</label>
              <Input
                name="confirmEmail"
                type="email"
                value={this.state.confirmEmail}
                onChange={this.handleFormChange}
                placeholder="Confirm New Email"
                error={this.state.emailMatchError}
              />
            </Form.Field>
            <Form.Field required>
              <label className="formLabel">New Password</label>
              <Input
                name="password"
                type="password"
                value={this.state.password}
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
                value={this.state.confirmPassword}
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
    dispatchParentProfileModal: (value) =>
      dispatch(setParentProfileModal(value)),
    dispatchError: (value) => dispatch(setError(value)),
  }
}

export default connect(null, mapDispatchToProps)(ParentProfileModal)
