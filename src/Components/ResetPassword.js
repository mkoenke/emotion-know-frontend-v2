import React from 'react'
import { connect } from 'react-redux'
import { resetPassword } from '../Redux/actions'

class ResetPassword extends React.Component {
  state = {
    token: '',
    email: '',
    password: '',
    password_confirmation: '',
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
      })
    }
  }
  render() {
    return (
      <>
        <p>Reset Password:</p>
        <form onSubmit={this.handleSubmit}>
          <label for="token">Token:</label>
          <input
            required
            id="token"
            onChange={this.handleChange}
            name="token"
            placeholder="token"
            type="token"
            value={this.state.token}
          />
          <p>The code that was emailed to you. This is case-sensitive.</p>
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
          <button type="secondary">Reset Password</button>
        </form>
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
