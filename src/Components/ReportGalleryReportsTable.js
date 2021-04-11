import { Grid, Menu, Table } from 'semantic-ui-react'
import JwPagination from 'jw-react-pagination'
import ReportGalleryListOfReports from './ReportGalleryListOfReports'

export default function ReportGalleryReportsTable(reports, handleReportClick, onChangePage) {
  const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>',
  }

  return (
    <Grid centered className="tableGrid">
      <Table celled className="content">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{ReportGalleryListOfReports(reports, handleReportClick)}</Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right">
                <JwPagination
                  items={reports}
                  // items={this.state.items}
                  onChangePage={onChangePage}
                  labels={customLabels}
                />
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </Grid>
  )
}