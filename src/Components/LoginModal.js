import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Message, Modal } from 'semantic-ui-react'
import { login, loginParent, setError, setModal } from '../Redux/actions'

class LoginModal extends React.Component {
  state = {
    isOpen: true,
    username: '',
    password: '',
  }
  handleCancel = () => {
    this.props.dispatchModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    if (this.state.username.includes('@')) {
      let parent = {
        email: this.state.username,
        password: this.state.password,
      }
      this.props.loginParent(parent)
      this.props.dispatchModal(false)

      // this.props.handleLoginClick()
    } else {
      let child = {
        username: this.state.username,
        password: this.state.password,
      }

      this.props.login(child)
      this.props.dispatchModal(false)

      // this.props.handleLoginClick()
    }
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
          Welcome back!
        </Modal.Header>
        <Modal.Content className="background">
          {this.props.error ? (
            <Message negative>
              <Message.Header>{this.props.error}</Message.Header>
            </Message>
          ) : null}
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Field required>
              <label className="formLabel">Username or Email</label>
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
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleFormChange}
                placeholder="Password"
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

const mapStateToProps = (state) => ({
  error: state.error,
})

const mapDispatchToProps = (dispatch) => ({
  loginParent: (parentInfo) => dispatch(loginParent(parentInfo)),
  login: (childInfo) => dispatch(login(childInfo)),
  dispatchModal: (value) => dispatch(setModal(value)),
  dispatchError: (value) => dispatch(setError(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
