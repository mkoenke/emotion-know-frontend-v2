import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Confirm,
  Divider,
  Form,
  Input,
  Message,
  Modal,
  Segment,
} from 'semantic-ui-react'
import {
  logout,
  setChild,
  setError,
  setParentProfileModal,
} from '../Redux/actions'

class ParentProfileModal extends React.Component {
  state = {
    isOpen: true,
    openConfirm: false,
    email: null,
    confirmEmail: null,
    password: null,
    confirmPassword: null,
    emailError: false,
    emailMatchError: false,
    passwordError: false,
    passwordMatchError: false,
    changeEmail: false,
    changePassword: false,
    deleteAccount: false,
    parentPassword: null,
  }
  handleCancel = () => {
    this.setState({
      isOpen: false,
      changePassword: false,
      changeEmail: false,
    })
    this.props.dispatchParentProfileModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.checkMatching)
  }
  checkMatching = () => {
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
    let data = null
    if (
      this.state.email === this.state.confirmEmail &&
      this.state.changeEmail &&
      this.state.email
    ) {
      data = {
        email: this.state.email,
      }
    }
    if (
      this.state.password === this.state.confirmPassword &&
      this.state.changePassword &&
      this.state.password
    ) {
      data = {
        password: this.state.password,
      }
    }
    const id = this.props.parent.id

    if (data) {
      fetch(`http://localhost:3000/parents/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          // localStorage.setItem('token', data.jwt)
          // this.props.dispatchChild(data.child)

          this.setState({
            openConfirm: true,
            changePassword: false,
            changeEmail: false,
          })
          this.props.dispatchError(null)
        })
        .catch((error) => {
          console.log(error)
          this.props.dispatchError('Something went wrong, please try again.')
        })
    }
  }

  handleConfirm = () => {
    this.setState({ openConfirm: false, isOpen: false })
    this.props.handleParentProfileClick(false)
  }
  handleDelete = () => {
    this.setState({ deleteAccount: true })
  }

  deleteFetch = () => {
    const parent = {
      email: this.props.parent.email,
      password: this.state.parentPassword,
    }
    const id = this.props.parent.id
    fetch('http://localhost:3000/parentLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(parent),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.error) {
          if (data.parent.id === id) {
            fetch(`http://localhost:3000/parents/${id}`, {
              method: 'DELETE',
            })
              .then((response) => response.json())
              .then((data) => {
                if (!data.error) {
                  this.setState({
                    deleteAccount: false,
                    isOpen: false,
                  })

                  localStorage.removeItem('token')
                  this.props.logout()
                  console.log('DELETED:', data)
                } else if (data.error) {
                  console.log(data.error)
                  this.setState({
                    deleteAccount: false,
                  })
                  this.props.dispatchError(
                    'Something went wrong, please try again.'
                  )
                }
              })
              .catch((error) => {
                console.log(error)
                this.props.dispatchError(
                  'Something went wrong, please try again.'
                )
              })
          }
        } else {
          this.props.dispatchError('Something went wrong, please try again.')
        }
      })
  }

  handleParentPasswordChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <>
        {this.state.openConfirm ? (
          <Confirm
            open={this.state.openConfirm}
            content="You successfully changed your username or password!"
            onConfirm={this.handleConfirm}
            onCancel={this.handleConfirm}
            dimmer="inverted"
          />
        ) : null}
        {this.state.deleteAccount ? (
          <>
            <Modal
              onClose={() => this.setState({ openConfirm: false })}
              open={this.state.deleteAccount}
              size="small"
            >
              <Modal.Header negative className="warning">
                Are you sure?
              </Modal.Header>
              <Modal.Content>
                <h3>
                  This action <b>CAN NOT</b> be reversed. Both parent and child
                  accounts will be deleted. Please enter your password.
                </h3>
                <Form>
                  <Form.Field>
                    <Input
                      name="parentPassword"
                      type="password"
                      value={this.state.parentPassword}
                      onChange={this.handleParentPasswordChange}
                      placeholder="Parent's Password"
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  content="DELETE"
                  id="warningButton"
                  onClick={this.deleteFetch}
                />
                <Button
                  className="formButton"
                  onClick={this.handleCancel}
                  type="cancel"
                >
                  Cancel
                </Button>
              </Modal.Actions>
            </Modal>
          </>
        ) : null}

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
            {!this.state.changeEmail && !this.state.changePassword ? (
              <Segment basic textAlign="center">
                <Button
                  className="formButton"
                  content="Change Email"
                  onClick={() => {
                    this.props.dispatchError(null)
                    this.setState({ changeEmail: true })
                  }}
                />

                <Divider horizontal>Or</Divider>

                <Button
                  className="formButton"
                  content="Change Password"
                  onClick={() => {
                    this.props.dispatchError(null)
                    this.setState({ changePassword: true })
                  }}
                />
                <Divider horizontal>Or</Divider>
                <Button
                  className="formButton"
                  content="Delete Account"
                  onClick={this.handleDelete}
                />
              </Segment>
            ) : null}

            {this.state.changePassword || this.state.changeEmail ? (
              <Form onSubmit={this.handleFormSubmit}>
                {this.state.changeEmail ? (
                  <>
                    <Form.Field>
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
                    <Form.Field>
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
                  </>
                ) : null}
                {this.state.changePassword ? (
                  <>
                    <Form.Field>
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
                    <Form.Field>
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
                  </>
                ) : null}
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
            ) : null}
          </Modal.Content>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    parent: state.parent,
    error: state.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChild: (child) => dispatch(setChild(child)),
    dispatchParentProfileModal: (value) =>
      dispatch(setParentProfileModal(value)),
    dispatchError: (value) => dispatch(setError(value)),
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentProfileModal)
