import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Confirm,
  Dropdown,
  Form,
  Input,
  Message,
  Modal,
} from 'semantic-ui-react'
import avatar1 from '../assets/images/avatar1.png'
import avatar10 from '../assets/images/avatar10.png'
import avatar11 from '../assets/images/avatar11.png'
import avatar12 from '../assets/images/avatar12.png'
import avatar13 from '../assets/images/avatar13.png'
import avatar14 from '../assets/images/avatar14.png'
import avatar15 from '../assets/images/avatar15.png'
import avatar2 from '../assets/images/avatar2.png'
import avatar3 from '../assets/images/avatar3.png'
import avatar4 from '../assets/images/avatar4.png'
import avatar5 from '../assets/images/avatar5.png'
import avatar6 from '../assets/images/avatar6.png'
import avatar7 from '../assets/images/avatar7.png'
import avatar8 from '../assets/images/avatar8.png'
import avatar9 from '../assets/images/avatar9.png'
import { setError, setParent, setSignUpModal } from '../Redux/actions'

class SignUpModal extends React.Component {
  state = {
    isOpen: true,
    openConfirm: false,
    name: null,
    username: null,
    confirmUsername: null,
    password: null,
    confirmPassword: null,
    usernameError: false,
    usernameMatchError: false,
    userNameNotUnique: false,
    passwordError: false,
    passwordMatchError: false,
    avatar: null,
  }
  handleCancel = () => {
    this.setState({ isOpen: false })
    if (this.props.parent) {
      this.props.handleAddChildCancel()
    }
    this.props.dispatchSignUpModal(false)
    this.props.dispatchError(null)
  }
  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.checkMatching)
  }
  handleDropdownChange = (e, { value }) => {
    this.setState({ avatar: value })
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
    let childData = null
    if (
      this.state.username === this.state.confirmUsername &&
      this.state.username &&
      this.state.password === this.state.confirmPassword &&
      this.state.password &&
      this.state.avatar
    ) {
      childData = {
        username: this.state.username,
        password: this.state.password,
        parent_id: this.props.parentId,
        image: this.state.avatar,
      }
    }
    if (childData) {
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
          if(data.status === 422){
            this.setState({ userNameNotUnique: true })
          } else {
            const child = data.child
            this.setState({
              isOpen: false,
              openConfirm: true,
              username: null,
              confirmUsername: null,
              userNameNotUnique: false,
              password: null,
              confirmPassword: null,
              usernameError: false,
              usernameMatchError: false,
              passwordError: false,
              passwordMatchError: false,
              avatar: null,
            })
            this.props.dispatchError(null)
            if (this.props.parent) {
              let parent = { ...this.props.parent }
              parent.children = [...parent.children, child]
              this.props.dispatchParent(parent)
            }
          }
        })
        .catch((error) => {
          this.props.dispatchError(error)
        })
    }
  }

  handleConfirmCancel = () => {
    this.setState({ openConfirm: false, isOpen: false })
    this.props.dispatchSignUpModal(false)
  }
  handleConfirm = () => {
    this.setState({ isOpen: true, openConfirm: false })
  }

  render() {
    const avatarOptions = [
      {
        key: 1,
        image: { avatar: true, src: avatar1 },
        value: avatar1,
      },
      {
        key: 2,
        image: { avatar: true, src: avatar2 },
        value: avatar2,
      },
      {
        key: 3,
        image: { avatar: true, src: avatar3 },
        value: avatar3,
      },
      {
        key: 4,
        image: { avatar: true, src: avatar4 },
        value: avatar4,
      },
      {
        key: 5,
        image: { avatar: true, src: avatar5 },
        value: avatar5,
      },
      {
        key: 6,
        image: { avatar: true, src: avatar6 },
        value: avatar6,
      },
      {
        key: 7,
        image: { avatar: true, src: avatar7 },
        value: avatar7,
      },
      {
        key: 8,
        image: { avatar: true, src: avatar8 },
        value: avatar8,
      },
      {
        key: 9,
        image: { avatar: true, src: avatar9 },
        value: avatar9,
      },
      {
        key: 10,
        image: { avatar: true, src: avatar10 },
        value: avatar10,
      },
      {
        key: 11,
        image: { avatar: true, src: avatar11 },
        value: avatar11,
      },
      {
        key: 12,
        image: { avatar: true, src: avatar12 },
        value: avatar12,
      },
      {
        key: 13,
        image: { avatar: true, src: avatar13 },
        value: avatar13,
      },
      {
        key: 14,
        image: { avatar: true, src: avatar14 },
        value: avatar14,
      },
      {
        key: 15,
        image: { avatar: true, src: avatar15 },
        value: avatar15,
      },
    ]

    return (
      <>
        {this.state.openConfirm && (
          <Confirm
            closeOnDimmerClick={false}
            open={this.state.openConfirm}
            content="Would you like to add another a child?"
            confirmButton="No"
            cancelButton="Yes"
            onCancel={this.handleConfirm}
            onConfirm={this.handleConfirmCancel}
          />
        )}
        <Modal
          onClose={() => this.setState({ isOpen: false })}
          onOpen={() => this.setState({ isOpen: true })}
          open={this.state.isOpen}
          closeOnDimmerClick={false}
          dimmer="blurring"
        >
          <Modal.Header className="background pageHeader">
            Create Child's Login
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
            {this.state.userNameNotUnique ? (
              <Message negative>
                <Message.Header>Username already taken. Please try another username.</Message.Header>
              </Message>
            ) : null}
            <Form onSubmit={this.handleFormSubmit}>
              <Form.Field required>
                <label className="formLabel">Name</label>
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleFormChange}
                  placeholder="Name"
                />
              </Form.Field>
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
                <label className="formLabel">Confirm Username</label>
                <Input
                  name="confirmUsername"
                  value={this.state.confirmUsername}
                  onChange={this.handleFormChange}
                  placeholder="Confirm Username"
                  error={this.state.usernameMatchError}
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
                <label className="formLabel">Confirm Password</label>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleFormChange}
                  placeholder="Confirm Password"
                  error={this.state.passwordMatchError}
                />
              </Form.Field>
              <Form.Field required>
                <Dropdown
                  placeholder="Choose Avatar"
                  floating
                  button
                  selection
                  scrolling
                  options={avatarOptions}
                  name="avatar"
                  onChange={this.handleDropdownChange}
                  value={this.state.avatar}
                ></Dropdown>
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
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    parent: state.parent,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchParent: (parent) => dispatch(setParent(parent)),
    dispatchSignUpModal: (value) => dispatch(setSignUpModal(value)),
    dispatchError: (value) => dispatch(setError(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal)
