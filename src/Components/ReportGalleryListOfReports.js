import { Table } from 'semantic-ui-react'

export default function ReportGalleryListOfReports(reports) {
  return reports.map((report) => {
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