import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Modal } from 'semantic-ui-react'
import { resetPassword } from '../Redux/actions'

class ResetPassword extends React.Component {
  state = {
    token: '',
    email: '',
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
      this.props.resetPassword(this.state)
      this.setState({
        token: '',
        email: '',
        password: '',
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
          <Modal.Header className="pageHeader">Reset Password:</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label for="token">Token:</label>
                <input
                  required
                  id="token"
                  onChange={this.handleChange}
                  name="token"
                  placeholder="token"
                  // type="token" //this removed sematic styling
                  value={this.state.token}
                />
                <p>The code that was emailed to you. This is case-sensitive.</p>
              </Form.Field>
              <Form.Field>
                <label for="email">Email:</label>
                <input
                  required
                  id="email"
                  onChange={this.handleChange}
                  name="email"
                  placeholder="email"
                  type="email"
                  value={this.state.email}
                />
              </Form.Field>
              <Form.Field>
                <label for="password">New password:</label>
                <input
                  required
                  id="password"
                  onChange={this.handleChange}
                  name="password"
                  placeholder="password"
                  type="password"
                  value={this.state.password}
                />
                <p>Set your new password here.</p>
              </Form.Field>
              <Form.Field>
                <label for="password_confirmation">Confirm new password:</label>
                <input
                  required
                  id="password_confirmation"
                  onChange={this.handleChange}
                  name="password_confirmation"
                  placeholder="password confirmation"
                  type="password"
                  value={this.state.password_confirmation}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button type="secondary">Reset Password</Button>
            <Button onClick={this.handleCancel}>Cancel</Button>
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (credentials) => dispatch(resetPassword(credentials)),
  }
}

export default connect(null, mapDispatchToProps)(ResetPassword)
