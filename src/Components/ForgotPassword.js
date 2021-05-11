import React from 'react'
import { withRouter } from 'react-router-dom'

class ForgotPassword extends React.Component {
  state = {
    email: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const baseURL = 'http://localhost:3000'

    fetch(`${baseURL}/forgot_password`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.alert)
      })
      .catch(console.log)
    this.setState({
      email: '',
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <>
        <p>Request password reset:</p>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            id="forgotpasswordemail"
            onChange={this.handleChange}
            name="email"
            placeholder="email"
            type="email"
            value={this.state.email}
          />
          <button>Submit</button>
        </form>
      </>
    )
  }
}

export default withRouter(ForgotPassword)
