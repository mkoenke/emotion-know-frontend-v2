import JwPagination from 'jw-react-pagination'
import React from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Header, Menu, Popup, Table } from 'semantic-ui-react'
import { BigPlayButton, ControlBar, LoadingSpinner, Player } from 'video-react'
import D3LineGraph from '../Components/d3LineChart'
import IndividualLineGraph from '../Components/IndividualLineGraph'
import LineGraph from '../Components/LineGraph'
import emotionsOverTime from '../HelperFunctions/emotionsOverTime'
import { setClickedReport } from '../Redux/actions'

class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: null,
    items: [],
    pageOfItems: [],
    clickedJournal: {},
  }

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

  handleParentReportClick = (event) => {
    let clickedReport = this.props.parentsReports.find(
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
      let journal = this.props.allVideos.find(
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

  renderReportGraph = () => {
    return (
      <Grid centered columns="two">
        <Grid.Row>
          <Grid.Column>
            <div className="bargraph smallGraph pattern smallGraphPadding">
              {/* <IndividualLineGraph /> */}
              <D3LineGraph data={this.state.clickedReport}/>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div className="bargraph smallGraph pattern">
              <Header textAlign="center" className="reportHeader">
                {this.state.clickedJournal.title}
              </Header>

              {this.state.clickedJournal.video ? (
                <Player>
                  <source src={this.state.clickedJournal.url} />
                  <ControlBar autoHide={false} />
                  <LoadingSpinner />
                  <BigPlayButton position="center" />
                </Player>
              ) : null}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  renderParentReportGraph = () => {
    return (
      <Grid centered columns="one">
        <Grid.Row>
          <Grid.Column>
            <div className="bargraph smallGraph pattern parentGraphPadding">
              <IndividualLineGraph />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

  listOfReports = () => {
    return this.state.pageOfItems.map((report) => {
      let date = new Date(report.created_at)
      let dateWithoutTime =
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
  listOfParentsReports = () => {
    return this.state.pageOfItems.map((report) => {
      let date = new Date(report.created_at)
      let dateWithoutTime =
        date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
      return (
        <Table.Row
          className="link"
          id={report.created_at}
          onClick={this.handleParentReportClick}
        >
          <Table.Cell>{report.title}</Table.Cell>
          <Table.Cell>{dateWithoutTime}</Table.Cell>
        </Table.Row>
      )
    })
  }

  render() {
    const customLabels = {
      first: '<<',
      last: '>>',
      previous: '<',
      next: '>',
    }
    // //this is where i was playing around with the data
    // console.log("this state", this.state.clickedReport)
    // let anger, disgust, joy, fear, sadness, surprise

    // if(this.state.clickedReport) anger = this.state.clickedReport.anger
    
    // const data = Array.from({ length: 50 }, () =>
    //   Math.round(Math.random() * 100)
    // )

    const avgReport = emotionsOverTime(this.props.allReports)

    return (
      <>
        {this.props.child && !this.props.parent ? (
          <>
            <div className="background">
              <Container>
                {this.props.child ? (
                  <Header className="pageHeader" size="huge" textAlign="center">
                    {this.props.child.username}'s Reports
                  </Header>
                ) : null}
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content tableHeaderMargin">
                  Individual Journal Emotional Reports
                </Header>
                <Table celled className="table content">
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

                <br />
                {this.state.beenClicked ? this.renderReportGraph() : null}
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content tableHeaderMargin">
                  Emotional Reports over Time
                </Header>
                <br />
                <div className="lineGraph pattern">
                  <LineGraph />
                  {/* {this.state.clickedReport ? <D3LineGraph data={this.state.clickedReport} /> : null } */}
                  {/* <D3LineGraph data={this.state.clickedReport} /> */}
                </div>
              </Container>
              <div className="footer"></div>
            </div>
          </>
        ) : (
          this.props.parent && (
            <>
              <div className="background">
                <Container>
                  {this.props.child ? (
                    <Header
                      className="pageHeader"
                      size="huge"
                      textAlign="center"
                    >
                      {this.props.child.username}'s Reports
                    </Header>
                  ) : null}
                </Container>
                {!this.props.parentsReports.length ? (
                  <Popup
                    open
                    size="huge"
                    trigger={
                      <Container textAlign="center">
                        <Header as="h2" className="content tableHeaderMargin">
                          Individual Journal Emotional Reports
                        </Header>

                        <br />
                        {this.state.beenClicked
                          ? this.renderParentReportGraph()
                          : null}
                      </Container>
                    }
                    content="When your child starts using EmotionKnow and creates a journal entry, their individual journal entry emotional charts will appear here!"
                  />
                ) : (
                  <Container textAlign="center">
                    <Header as="h2" className="content tableHeaderMargin">
                      Individual Journal Emotional Reports
                    </Header>

                    <Table celled className="table content">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Title</Table.HeaderCell>
                          <Table.HeaderCell>Date</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>{this.listOfParentsReports()}</Table.Body>

                      <Table.Footer>
                        <Table.Row>
                          <Table.HeaderCell colSpan="3">
                            <Menu floated="right">
                              <JwPagination
                                items={this.state.items}
                                onChangePage={this.onChangePage}
                                labels={customLabels}
                                className="pagination"
                              />
                            </Menu>
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Footer>
                    </Table>
                    <br />
                    {this.state.beenClicked
                      ? this.renderParentReportGraph()
                      : null}
                  </Container>
                )}
                {!this.props.parentsReports.length ? (
                  <Popup
                    open
                    size="huge"
                    trigger={
                      <Container textAlign="center">
                        <Header as="h2" className="content tableHeaderMargin">
                          Emotional Reports over Time
                        </Header>
                        <LineGraph />
                      </Container>
                    }
                    content="Your child's emotions over time will appear here!"
                  />
                ) : (
                  <Container textAlign="center">
                    <Header as="h2" className="content tableHeaderMargin">
                      Emotional Reports over Time
                    </Header>
                    <div className="lineGraph pattern">
                      <LineGraph />
                    </div>
                  </Container>
                )}
                <div className="footer"></div>
              </div>
            </>
          )
        )}
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
    allAudios: state.allAudios,
    allVideos: state.allVideos,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClickedReport: (report) => dispatch(setClickedReport(report)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportGalleryPage)
