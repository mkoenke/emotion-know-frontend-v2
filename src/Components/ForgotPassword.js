import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'semantic-ui-react'

class ForgotPassword extends React.Component {
  state = {
    email: '',
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
    const baseURL = 'http://localhost:3000'

    fetch(`${baseURL}/forgot_password`, {
      // credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.email),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.alert)
      })
      .catch(console.log)
    this.setState({
      email: '',
    })
    this.props.handleForgotPasswordClick(false)
    this.props.history.push('/')
  }

  closeModal = () => {
    this.props.handleForgotPasswordClick(false)
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
            <button onClick={this.closeModal}>Cancel</button>
          </form>
        </Modal>
      </>
    )
  }
}

export default withRouter(ForgotPassword)
