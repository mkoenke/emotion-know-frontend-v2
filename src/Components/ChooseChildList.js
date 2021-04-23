import React from 'react'
import { connect } from 'react-redux'

// import ReportGalleryPage from "./ReportGalleryPage"

class ChooseChildList extends React.Component {
  listOfChildren = () => {
    return this.props.parent.children.map((child) => <li>{child.username}</li>)
  }
  render() {
    return <ul>{this.listOfChildren()}</ul>
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
  }
}

export default connect(mapStateToProps)(ChooseChildList)
