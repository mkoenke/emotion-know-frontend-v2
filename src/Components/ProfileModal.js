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
import { logout, setChild, setError, setProfileModal } from '../Redux/actions'

class ProfileModal extends React.Component {
  state = {
    isOpen: true,
    openConfirm: false,
    username: null,
    confirmUsername: null,
    password: null,
    confirmPassword: null,
    usernameError: false,
    usernameMatchError: false,
    passwordError: false,
    passwordMatchError: false,
    changeUsername: false,
    changePassword: false,
    deleteAccount: false,
    parentPassword: null,
  }
  handleCancel = () => {
    this.setState({
      isOpen: false,
      changePassword: false,
      changeUsername: false,
    })
    this.props.dispatchProfileModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.checkMatching)
  }
  checkMatching = () => {
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
    let data = null
    if (
      this.state.username === this.state.confirmUsername &&
      this.state.changeUsername &&
      this.state.username
    ) {
      data = {
        username: this.state.username,
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
    const id = this.props.child.id

    if (data) {
      fetch(`http://localhost:3000/children/${id}`, {
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
          this.setState({
            openConfirm: true,
            changePassword: false,
            changeUsername: false,
          })
          this.props.dispatchChild(data)
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
    this.props.handleProfileClick(false)
  }
  handleDelete = () => {
    this.setState({ deleteAccount: true })
  }

  deleteFetch = () => {
    const parent = {
      email: this.props.child.parent.email,
      password: this.state.parentPassword,
    }
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
          console.log(data)
          // localStorage.setItem('token', data.jwt)

          // dispatch(setParent(data.parent))
          // dispatch(setChild(data.parent.child))
          // dispatch(setParentModal(false))
          // dispatch(setError(null))
          // dispatch(parentsReports(data.parent.video_reports))
        } else {
          // dispatch(setError(data.error))
        }
      })

    const id = this.props.child.id
    // fetch(`http://localhost:3000/children/${id}`, {
    //   method: 'DELETE',
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data)
    //     if (!data.error) {
    //       this.setState({
    //         deleteAccount: false,
    //         isOpen: false,
    //       })

    //       localStorage.removeItem('token')
    //       this.props.logout()
    //       console.log('DELETED:', data)
    //     } else if (data.error) {
    //       console.log(data.error)
    //       this.setState({
    //         deleteAccount: false,
    //       })
    //       this.props.dispatchError('Something went wrong, please try again.')
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     this.props.dispatchError('Something went wrong, please try again.')
    //   })
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
            {/* {this.props.error ? (
              <Message negative>
                <Message.Header>{this.props.error}</Message.Header>
              </Message>
            ) : null} */}
            <Confirm
              open={this.state.deleteAccount}
              content="Are you sure you want to delete your account? This action can not be reversed."
              onConfirm={this.deleteFetch}
              onCancel={() => this.setState({ deleteAccount: false })}
            />
            <Modal
              onClose={() => this.setState({ openConfirm: false })}
              open={this.state.deleteAccount}
              size="small"
            >
              <Modal.Header>Are you sure?</Modal.Header>
              <Modal.Content>
                <p>
                  Are you sure you want to delete your account? This action can
                  not be reversed. Please have your parent enter their password.
                </p>
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
                  icon="check"
                  content="All Done"
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
            {!this.state.changeUsername && !this.state.changePassword ? (
              <Segment basic textAlign="center">
                <Button
                  className="formButton"
                  content="Change Username"
                  onClick={() => {
                    this.props.dispatchError(null)
                    this.setState({ changeUsername: true })
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
            {this.state.changePassword || this.state.changeUsername ? (
              <Form onSubmit={this.handleFormSubmit}>
                {this.state.changeUsername ? (
                  <>
                    <Form.Field>
                      <label className="formLabel">New Username</label>
                      <Input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleFormChange}
                        placeholder="New Username"
                        error={this.state.usernameError}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label className="formLabel">Confirm New Username</label>
                      <Input
                        name="confirmUsername"
                        value={this.state.confirmUsername}
                        onChange={this.handleFormChange}
                        placeholder="Confirm New Username"
                        error={this.state.usernameMatchError}
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
    child: state.child,
    error: state.error,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchChild: (child) => dispatch(setChild(child)),
    dispatchProfileModal: (value) => dispatch(setProfileModal(value)),
    dispatchError: (value) => dispatch(setError(value)),
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal)
