import React from "react"
import { connect } from "react-redux"
import { Header } from "semantic-ui-react"

class ReportGalleryPage extends React.Component {
  componentDidMount() {
    ///fetch all reports from database and display on page as images
  }
  render() {
    return (
      <>
        {this.props.child ? (
          <Header
            className="h1"
            size="huge"
            textAlign="center"
            style={{ color: "rgb(171, 218, 225)" }}
          >
            {this.props.child.username}'s Reports
          </Header>
        ) : null}

        {/* <Grid centered columns="three">
          <Grid.Row>{this.arrayOfJournals()}</Grid.Row>
        </Grid> */}
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
  }
}

export default connect(mapStateToProps)(ReportGalleryPage)
