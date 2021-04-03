import React from 'react'
import { Grid, Menu, Table } from 'semantic-ui-react'
import JwPagination from 'jw-react-pagination'


export default class ReportsGalleryReportList extends React.Component {

  handleReportClick = (event) => {
    if (this.state.beenClicked) {
      this.setState({ beenClicked: false })
    }
    let clickedReport = this.props.allReports.find(
      (report) => report.created_at === event.target.closest('tr').id
    )
    this.props.dispatchClickedReport(clickedReport)
    this.setState(
      {
        clickedReport: clickedReport,
      },
      this.findJournal
    )
  }

  listOfReports = () => {
    return this.props.pageOfItems.map((report) => {
      const date = new Date(report.created_at)
      const dateWithoutTime =
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
      return (
        <Table.Row
          className="link"
          id={report.created_at}
          onClick={this.handleReportClick}
        >
          <Table.Cell>{report.title}</Table.Cell>
          <Table.Cell>{dateWithoutTime}</Table.Cell>
        </Table.Row>
      )
    })
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }

  render() {
    const customLabels = {
      first: '<<',
      last: '>>',
      previous: '<',
      next: '>',
    }

    console.log("REPORTS LIST IN LIST COMP", this.props.items)
    console.log("PAGE OF ITEMS IN LIST COMP", this.props.pageOfItems)
    return (
      <Grid centered className="tableGrid">
      <Table celled className="content">
        {/* <Table celled className="table content"> */}
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.listOfReports()}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right">
                <JwPagination
                  items={this.props.items}
                  onChangePage={this.onChangePage}
                  labels={customLabels}
                />
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      </Grid >
    )
  }
}