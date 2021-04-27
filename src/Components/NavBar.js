import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import {
  logout,
  setModal,
  setParentModal,
  setParentProfileModal,
  setProfileModal,
  setSignUpModal,
} from '../Redux/actions'
import LoginModal from './LoginModal'
import ParentLoginModal from './ParentLoginModal'
import ParentProfileModal from './ParentProfileModal'
import SignUpModal from './ParentSignUpModal'
import ProfileModal from './ProfileModal'

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
    if (!this.props.child || !this.props.parent) {
      this.props.dispatchModal(true)
    }
  }

  handleParentLoginClick = () => {
    if (!this.props.parent) {
      this.props.dispatchParentModal(true)
    }
  }
  handleProfileClick = (value) => {
    if (this.props.child) {
      this.props.dispatchProfileModal(value)
    }
  }
  handleParentProfileClick = (value) => {
    if (this.props.parent) {
      this.props.dispatchParentProfileModal(value)
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
              <NavLink to="/about">
                <Menu.Item
                  name="about"
                  active={activeItem === 'about'}
                  onClick={this.handleItemClick}
                  className="navbar"
                />
              </NavLink>
            </>
          ) : null}
          {this.props.child && !this.props.parent ? (
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

          {this.props.parent ? (
            <>
              <NavLink to="/welcome">
                <Menu.Item
                  name="home"
                  active={activeItem === 'home'}
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
          <Menu.Menu position="right">
            {!this.props.child && !this.props.parent ? (
              <>
                <Dropdown floating item text="Login">
                  <Dropdown.Menu>
                    <NavLink to="/">
                      <Dropdown.Item
                        name="childLogin"
                        onClick={this.handleLoginClick}
                        className="navbar"
                      >
                        Child Login
                      </Dropdown.Item>
                    </NavLink>
                    {/* <Redirect to="/" /> */}
                    <NavLink to="/">
                      <Dropdown.Item
                        name="parentLogin"
                        onClick={this.handleParentLoginClick}
                        className="navbar"
                      >
                        Parent Login
                      </Dropdown.Item>
                    </NavLink>
                    {/* <Redirect to="/" /> */}
                    <NavLink to="/">
                      <Dropdown.Item
                        name="signUp"
                        onClick={this.handleSignUpClick}
                        className="navbar"
                      >
                        Sign Up
                      </Dropdown.Item>
                    </NavLink>
                    {/* <Redirect to="/" /> */}
                  </Dropdown.Menu>
                </Dropdown>
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
            {this.props.child && !this.props.parent ? (
              <>
                <NavLink to="/about">
                  <Menu.Item
                    name="about"
                    active={activeItem === 'about'}
                    onClick={this.handleItemClick}
                    className="navbar"
                  />
                </NavLink>
                <Dropdown floating item icon="user outline">
                  <Dropdown.Menu>
                    <a>
                      <Dropdown.Item
                        onClick={() => this.handleProfileClick(true)}
                      >
                        Change Profile
                      </Dropdown.Item>
                    </a>
                    <NavLink to="/">
                      <Dropdown.Item
                        name="logout"
                        onClick={this.handleLogOutClick}
                        className="navbar"
                      >
                        Log Out
                      </Dropdown.Item>
                    </NavLink>
                    <Redirect to="/welcome" />
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : null}
            {this.props.parent ? (
              <>
                <NavLink to="/about">
                  <Menu.Item
                    name="about"
                    active={activeItem === 'about'}
                    onClick={this.handleItemClick}
                    className="navbar"
                  />
                </NavLink>
                <Dropdown floating item icon="user outline">
                  <Dropdown.Menu>
                    <a>
                      <Dropdown.Item
                        onClick={() => this.handleParentProfileClick(true)}
                      >
                        Change Profile
                      </Dropdown.Item>
                    </a>
                    <NavLink to="/">
                      <Dropdown.Item
                        name="logout"
                        onClick={this.handleLogOutClick}
                        className="navbar"
                      >
                        Log Out
                      </Dropdown.Item>
                    </NavLink>
                    <Redirect to="/welcome" />
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : null}
            {this.props.profileModalOpen && (
              <ProfileModal handleProfileClick={this.handleProfileClick} />
            )}
            {this.props.parentProfileModalOpen && (
              <ParentProfileModal
                handleParentProfileClick={this.handleParentProfileClick}
              />
            )}
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
    profileModalOpen: state.profileModalOpen,
    parentProfileModalOpen: state.parentProfileModalOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
    dispatchModal: (value) => dispatch(setModal(value)),
    dispatchParentModal: (value) => dispatch(setParentModal(value)),
    dispatchSignUpModal: (value) => dispatch(setSignUpModal(value)),
    dispatchProfileModal: (value) => dispatch(setProfileModal(value)),
    dispatchParentProfileModal: (value) =>
      dispatch(setParentProfileModal(value)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
