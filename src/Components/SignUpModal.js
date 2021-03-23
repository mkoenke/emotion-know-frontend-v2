import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Message, Modal } from 'semantic-ui-react'
import { setChild, setError, setSignUpModal } from '../Redux/actions'

class SignUpModal extends React.Component {
  state = {
    isOpen: true,
    username: '',
    password: '',
    email: '',
    parentPassword: '',
  }
  handleCancel = () => {
    this.props.dispatchSignUpModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    let parentData = {
      email: this.state.email,
      password: this.state.parentPassword,
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
        let childData = {
          username: this.state.username,
          password: this.state.password,
          parent_id: data.parent.id,
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
            localStorage.setItem('token', data.jwt)
            this.props.dispatchError(null)
            this.props.dispatchChild(data.child)
            this.props.handleSignUpClick()
            this.setState({ isOpen: false })
          })
          .catch((error) => {
            this.props.dispatchError(error)
          })
      })
      .catch((error) => {
        this.props.dispatchError(error)
      })
  }

  render() {
    return (
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
              <label className="formLabel">Parent's email</label>
              <input
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleFormChange}
                placeholder="Parent's Email"
              />
            </Form.Field>{' '}
            <Form.Field required>
              <label className="formLabel">Parent's Password</label>
              <input
                name="parentPassword"
                type="password"
                value={this.state.parentPassword}
                onChange={this.handleFormChange}
                placeholder="Parent's Password"
              />{' '}
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
    dispatchSignUpModal: (value) => dispatch(setSignUpModal(value)),
    dispatchError: (value) => dispatch(setError(value)),
  }
}

export default connect(null, mapDispatchToProps)(SignUpModal)
