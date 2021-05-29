import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import { resetChildPassword } from '../Redux/actions'

class ResetPassword extends React.Component {
  state = {
    token: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    isOpen: true,
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { password, password_confirmation } = this.state
    if (password !== password_confirmation) {
      alert("Passwords don't match")
      this.setState({
        password: '',
        password_confirmation: '',
      })
    } else {
      this.props.resetChildPassword(this.state)
      this.setState({
        token: '',
        email: '',
        password: '',
        username: '',
        password_confirmation: '',
        isOpen: false,
      })
      this.props.history.push('/')
    }
  }

  handleCancel = () => {
    this.setState({ isOpen: false })
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <Modal
          onClose={() => this.setState({ isOpen: false })}
          onOpen={() => this.setState({ isOpen: true })}
          open={this.state.isOpen}
          closeOnDimmerClick={false}
          dimmer="blurring"
        >
          <Modal.Header className="pageHeader">
            Reset Child's Password:
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label className="formLabel" for="token">
                  Token:
                </label>
                <input
                  required
                  id="token"
                  onChange={this.handleChange}
                  name="token"
                  placeholder="Token"
                  value={this.state.token}
                />
                <p>The code that was emailed to you. This is case-sensitive.</p>
              </Form.Field>
              <Form.Field>
                <label className="formLabel" for="email">
                  Parent's Email:
                </label>
                <input
                  required
                  id="email"
                  onChange={this.handleChange}
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                />
              </Form.Field>
              <Form.Field>
                <label className="formLabel" for="email">
                  Child's Username:
                </label>
                <input
                  required
                  id="username"
                  onChange={this.handleChange}
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                />
              </Form.Field>
              <Form.Field>
                <label className="formLabel" for="password">
                  Child's New Password:
                </label>
                <input
                  required
                  id="password"
                  onChange={this.handleChange}
                  name="password"
                  placeholder="New Password"
                  type="password"
                  value={this.state.password}
                />
                <p>Set your new password here.</p>
              </Form.Field>
              <Form.Field>
                <label className="formLabel" for="password_confirmation">
                  Confirm New Password:
                </label>
                <input
                  required
                  id="password_confirmation"
                  onChange={this.handleChange}
                  name="password_confirmation"
                  placeholder="New Password Confirmation"
                  type="password"
                  value={this.state.password_confirmation}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleSubmit}>Reset Password</Button>
            <Button onClick={this.handleCancel}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetChildPassword: (credentials) =>
      dispatch(resetChildPassword(credentials)),
  }
}

export default connect(null, mapDispatchToProps)(ResetPassword)
