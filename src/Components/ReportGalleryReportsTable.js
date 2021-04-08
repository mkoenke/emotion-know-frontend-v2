import { Grid, Table } from 'semantic-ui-react'
import JwPagination from 'jw-react-pagination'

export default function ReportGalleryReportsTable(reports) {
  return (
    <Grid centered className="tableGrid">
      <Table celled className="content">
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
                  items={this.state.items}
                  onChangePage={this.onChangePage}
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