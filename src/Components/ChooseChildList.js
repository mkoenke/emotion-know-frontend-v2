import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import ChildCard from './ChildCard'

// import ReportGalleryPage from "./ReportGalleryPage"

class ChooseChildList extends React.Component {
  listOfChildren = () => {
    return this.props.parent.children.map((child) => (
      <ChildCard onClick={this.filterReports} childObj={child} />
    ))
  }

  filterReports = () => {
    /// filter reports for child matching the clicked card's child's id
  }

  render() {
    return (
      <>
        <Grid columns={3} centered className="background">
          <Grid.Row>{this.listOfChildren()}</Grid.Row>
        </Grid>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
  }
}

export default connect(mapStateToProps)(ChooseChildList)
