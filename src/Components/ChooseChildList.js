import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { setFilteredReports } from '../Redux/actions'
import ChildCard from './ChildCard'

class ChooseChildList extends React.Component {
  listOfChildren = () => {
    return this.props.parent.children.map((child) => (
      <ChildCard filterReports={this.filterReports} childObj={child} />
    ))
  }

  filterReports = (childId) => {
    const childsReports = this.props.parentsReports.filter(
      (report) => report.child_id === childId
    )
    this.props.dispatchFilteredReports(childsReports)
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
    parent: state.parent,
    parentsReports: state.parentsReports,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchFilteredReports: (reports) => dispatch(setFilteredReports(reports)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseChildList)
