import React from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import D3OverTimeLineGraph from '../Components/D3OverTimeLineGraph'
import { setClickedReport } from '../Redux/actions'
import ReportGallerySingleGraph from '../Components/ReportGallerySingleGraph'
import ReportGalleryReportsTable from '../Components/ReportGalleryReportsTable'
import D3OverTimeBarChart from '../Components/D3OverTimeBarChart'
import StackedBarChart from '../Components/StackedBarChart'


class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: null,
    items: [],
    pageOfItems: [],
    clickedJournal: {},
  }

  chartData = [
    {
      id: 1,
      name: "name1",
      created_at: new Date("2021-04-07"),
      anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 2,
      name: "name2",
      created_at: new Date("2021-04-08"),
      anger: 0.4, fear: 0.1, disgust: 0.0, joy: 0.2, sadness: 0.1, surprise: 0.2
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 3,
      name: "name3",
      created_at: new Date("2021-04-09"),
      anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 4,
      name: "name4",
      created_at: new Date("2021-04-11"),
      anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 5,
      name: "name5",
      created_at: new Date("2021-04-12"),
      anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 6,
      name: "name6",
      created_at: new Date("2021-04-13"),
      anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 7,
      name: "name7",
      created_at: new Date("2021-04-15"),
      anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 8,
      name: "name8",
      created_at: new Date("2021-04-16"),
      anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 9,
      name: "name9",
      created_at: new Date("2021-04-18"),
      anger: 0.1, fear: 0.1, disgust: 0.3, joy: 0.0, sadness: 0.3, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 10,
      name: "name9",
      created_at: new Date("2021-04-19"),
      anger: 0.1, fear: 0.1, disgust: 0.3, joy: 0.0, sadness: 0.3, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 11,
      name: "name9",
      created_at: new Date("2021-04-20"),
      anger: 0.1, fear: 0.1, disgust: 0.3, joy: 0.0, sadness: 0.3, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 12,
      name: "name9",
      created_at: new Date("2021-04-22"),
      anger: 0.1, fear: 0.1, disgust: 0.3, joy: 0.0, sadness: 0.3, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 13,
      name: "name9",
      created_at: new Date("2021-04-24"),
      anger: 0.1, fear: 0.1, disgust: 0.3, joy: 0.0, sadness: 0.3, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 14,
      name: "name9",
      created_at: new Date("2021-04-25"),
      anger: 0.1, fear: 0.1, disgust: 0.3, joy: 0.0, sadness: 0.3, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
    {
      id: 15,
      name: "name9",
      created_at: new Date("2021-04-29"),
      anger: 0.1, fear: 0.1, disgust: 0.3, joy: 0.0, sadness: 0.3, surprise: 0.2 
      // emotions: { anger: 0.1, fear: 0.2, disgust: 0.0, joy: 0.5, sadness: 0.0, surprise: 0.2 }
    },
  ]
  componentDidMount() {
    if (this.props.allReports.length) {
      this.setState({ items: this.props.allReports })
    } else if (this.props.parentsReports.length) {
      this.setState({ items: this.props.parentsReports })
    }
  }

  handleReportClick = (event) => {
    if (this.state.beenClicked) {
      this.setState({ beenClicked: false })
    }
    let currentReports = []
    if (!this.props.allReports.length) currentReports = [...this.props.parentsReports]
    else currentReports = [...this.props.allReports]

    const clickedReport = currentReports.find(
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

  handleParentReportClick = (event) => {
    const clickedReport = this.props.parentsReports.find(
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

  findJournal = () => {
    if (this.state.clickedReport.video_entry_id) {
      const journal = this.props.allVideos.find(
        (journal) => journal.id === this.state.clickedReport.video_entry_id
      )

      this.setState({
        clickedJournal: journal,
        beenClicked: true,
      })
    }
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }

  render() {
    return (
      <>
        {this.props.child ? (
          <>
            <div className="background">
              <Container>
                <Header className="pageHeader" size="huge" textAlign="center">
                  {this.props.child.username}'s Reports
                </Header>
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content tableHeaderMargin">
                  Individual Journal Emotional Reports
                </Header>
                {ReportGalleryReportsTable(this.state.items, this.handleReportClick, this.onChangePage)}
                <br />
                {this.state.beenClicked ? ReportGallerySingleGraph(this.state, this.props.parent) : null}
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content tableHeaderMargin">
                  Emotional Reports over Time
                </Header>
                <br />
                <div className="lineGraph pattern">
                  <D3OverTimeLineGraph data={this.state.items} />
                </div>
              </Container>
              <div className="footer"></div>
            </div>
          </>
        ) : (
          <div className="background">
            <Container>
              <Header className="pageHeader" size="huge" textAlign="center">
                Your Child {this.props.parent.child.username}'s Reports
                </Header>
            </Container>
            <Container textAlign="center">
              <Header as="h2" className="content tableHeaderMargin">
                Individual Journal Emotional Reports
                </Header>
              {ReportGalleryReportsTable(this.state.items, this.handleReportClick, this.onChangePage)}
              <br />
              {this.state.beenClicked ? ReportGallerySingleGraph(this.state, this.props.parent) : null}
            </Container>
            <Container textAlign="center">
              <Header as="h2" className="content tableHeaderMargin">
                Emotional Reports over Time
                </Header>
              <br />
              <div className="lineGraph pattern">
                <D3OverTimeLineGraph data={this.state.items} />
              </div>
            </Container>
            <div className="footer"></div>
          </div>
        )}
            <Container>
              <div id="#EOT">
                <StackedBarChart data={this.chartData}/>
              </div>
            </Container>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
      </>
    )
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
    allReports: state.allReports,
    parentsReports: state.parentsReports,
    allJournals: state.allJournals,
    allVideos: state.allVideos,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClickedReport: (report) => dispatch(setClickedReport(report)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportGalleryPage)
