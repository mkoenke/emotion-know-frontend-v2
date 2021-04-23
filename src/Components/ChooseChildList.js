import React from 'react'
import { connect } from 'react-redux'
import ChildCard from './ChildCard'

// import ReportGalleryPage from "./ReportGalleryPage"

class ChooseChildList extends React.Component {
  listOfChildren = () => {
    return this.props.parent.children.map((child) => (
      <ChildCard childObj={child} />
    ))
  }

  render() {
    return <>{this.listOfChildren()}</>
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
  }
}

export default connect(mapStateToProps)(ChooseChildList)
