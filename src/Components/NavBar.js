import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import {
  logout,
  setModal,
  setParentModal,
  setSignUpModal,
} from '../Redux/actions'
import LoginModal from './LoginModal'
import ParentLoginModal from './ParentLoginModal'
import SignUpModal from './SignUpModal'
// import SignUpModal from "./SignUpModal"

class NavBar extends React.Component {
  state = {
    activeItem: 'home',
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }
  handleSignUpClick = () => {
    if (!this.props.child && !this.props.parent) {
      this.props.dispatchSignUpModal(true)
    }
  }

  handleLoginClick = () => {
    if (!this.props.child) {
      this.props.dispatchModal(true)
    }
  }

  handleParentLoginClick = () => {
    if (!this.props.parent) {
      this.props.dispatchParentModal(true)
    }
  }

  handleLogOutClick = () => {
    localStorage.removeItem('token')
    this.props.logout()
  }

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu
          stackable
          pointing
          secondary
          fixed="top"
          className="navBarBackground"
        >
          {!this.props.child && !this.props.parent ? (
            <>
              <NavLink to="/">
                <Menu.Item
                  name="home"
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
              <NavLink to="/resources">
                <Menu.Item
                  name="resources"
                  active={activeItem === 'resources'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
            </>
          ) : null}
          {this.props.child ? (
            <>
              <NavLink to="/welcome">
                <Menu.Item
                  name="home"
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
              <NavLink to="/webcam">
                <Menu.Item
                  name="record"
                  active={activeItem === 'webcam'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
              <NavLink to="/videos">
                <Menu.Item
                  name="journals"
                  active={activeItem === 'videos'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
              <NavLink to="/reports">
                <Menu.Item
                  name="reports"
                  active={activeItem === 'reports'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
              <NavLink to="/fun">
                <Menu.Item
                  name="fun with emotions"
                  active={activeItem === 'fun'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
            </>
          ) : null}

          {
            this.props.parent ? (
              <>
                <NavLink to="/reports">
                  <Menu.Item
                    name="reports"
                    active={activeItem === 'reports'}
                    onClick={this.handleItemClick}
                    className="navbar"
                  />
                </NavLink>
                <NavLink to="/fun">
                  <Menu.Item
                    name="fun with emotions"
                    active={activeItem === 'fun'}
                    onClick={this.handleItemClick}
                    className="navbar"
                  />
                </NavLink>
              </>
            ) : null
            // (
            // <>

            // </>
            // )
          }
          <Menu.Menu position="right">
            {!this.props.child && !this.props.parent ? (
              <>
                <Menu.Item
                  name="childLogin"
                  active={activeItem === 'childLogin'}
                  onClick={this.handleItemClick}
                  onClick={this.handleLoginClick}
                  className="navbar"
                />
                <Redirect to="/" />
                <Menu.Item
                  name="parentLogin"
                  active={activeItem === 'parentLogin'}
                  onClick={this.handleItemClick}
                  onClick={this.handleParentLoginClick}
                  className="navbar"
                />
                <Redirect to="/" />
                <Menu.Item
                  name="signUp"
                  active={activeItem === 'signUp'}
                  onClick={this.handleItemClick}
                  onClick={this.handleSignUpClick}
                  className="navbar"
                />
                <Redirect to="/" />
              </>
            ) : null}
            {this.props.signUpModalOpen && (
              <SignUpModal handleSignUpClick={this.handleSignUpClick} />
            )}
            {this.props.parentModalOpen && (
              <ParentLoginModal
                handleParentLoginClick={this.handleParentLoginClick}
              />
            )}
            {this.props.modalOpen && (
              <LoginModal handleLoginClick={this.handleLoginClick} />
            )}
            {this.props.child || this.props.parent ? (
              <>
                <NavLink to="/resources">
                  <Menu.Item
                    name="resources"
                    active={activeItem === 'resources'}
                    onClick={this.handleItemClick}
                    className="navbar"
                  />
                </NavLink>
                <Menu.Item
                  name="logout"
                  active={activeItem === 'logout'}
                  onClick={this.handleItemClick}
                  onClick={this.handleLogOutClick}
                  className="navbar"
                />
                <Redirect to="/welcome" />
              </>
            ) : null}
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
    modalOpen: state.modalOpen,
    parentModalOpen: state.parentModalOpen,
    signUpModalOpen: state.signUpModalOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    dispatchModal: (value) => dispatch(setModal(value)),
    dispatchParentModal: (value) => dispatch(setParentModal(value)),
    dispatchSignUpModal: (value) => dispatch(setSignUpModal(value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
