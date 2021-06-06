import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import { selectChild, setFilteredReports } from '../Redux/actions'
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
    this.setSelectedChild(childId)
  }

  setSelectedChild = (childId) => {
    const selectedChild = this.props.parent.children.filter(
      (child) => child.id === childId
    )
    console.log(selectedChild[0])
    this.props.dispatchSelectedChild(selectedChild[0])
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
    dispatchSelectedChild: (child) => dispatch(selectChild(child)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseChildList)
