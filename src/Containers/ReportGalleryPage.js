import React from 'react'
import { connect } from 'react-redux'
import { Confirm, Container, Dropdown, Header } from 'semantic-ui-react'
// import D3OverTimeLineGraph from '../Components/D3OverTimeLineGraph'
import EmptyReportsModal from '../Components/EmptyReportsModal'
import ReportGalleryReportsTable from '../Components/ReportGalleryReportsTable'
import ReportGallerySingleGraph from '../Components/ReportGallerySingleGraph'
import StackedBarChart from '../Components/StackedBarChart'
import emotionsOverTimeCalculator from '../HelperFunctions/emotionsOverTimeCalculator'
import {
  fetchVideoToCache,
  removeChild,
  setClickedReport,
} from '../Redux/actions'

class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: null,
    clickedVideo: null,
    items: [],
    pageOfItems: [],
    openConfirm: false,
  }

  componentDidMount() {
    if (this.props.allReports.length) {
      this.setState({ items: this.props.allReports })
    } else if (this.props.filteredReports.length) {
      this.setState({ items: this.props.filteredReports })
    }
  }

  handleReportClick = (event) => {
    if (this.state.beenClicked) {
      this.setState({ beenClicked: false })
    }
    let currentReports = []
    if (!this.props.allReports.length)
      currentReports = [...this.props.parentsReports]
    else currentReports = [...this.props.allReports]

    const clickedReport = currentReports.find(
      (report) => report.created_at === event.target.closest('tr').id
    )

    const video = this.findVideoInCache(clickedReport.video_entry_id)

    if (video) {
      this.setReportGalleryState(clickedReport, video)
    } else {
      const reportGalleryStateObject = {
        type: 'REPORT_GALLERY',
        clickedReport: clickedReport,
        cacheFunction: this.setReportGalleryState,
      }
      this.props.dispatchCacheVideo(reportGalleryStateObject)
    }
  }

  setReportGalleryState = (clickedReport, video) => {
    this.setState({
      clickedReport: clickedReport,
      clickedVideo: video,
      beenClicked: true,
    })
  }

  findVideoInCache = (clickedVideoId) => {
    const video = this.props.videoCache.find((video) => {
      if (video.id === clickedVideoId) {
        return video
      }
    })
    return video || null
  }

  handleParentReportClick = (event) => {
    let clickedReport = this.props.filteredReports.find(
      (report) => report.created_at === event.target.closest('tr').id
    )
    this.props.dispatchClickedReport(clickedReport)
    this.setState({
      clickedReport: clickedReport,
    })
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems })
  }

  emotionsOverTimeData = (itemsFromState) => {
    return emotionsOverTimeCalculator(itemsFromState)
  }

  filterChildsName = () => {
    if (this.props.filteredReports.length) {
      const filteredChild = this.props.parent.children.filter(
        (child) => child.id === this.props.filteredReports[0].child_id
      )
      return filteredChild[0].username
    } else {
      return 'NO REPORTS'
    }
  }

  initiateChildPasswordReset = () => {
    const baseURL = 'http://localhost:3000'
    const token = localStorage.getItem('token')

    fetch(`${baseURL}/forgot_child_password`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.props.parent.email),
    })
      .then((res) => res.json())
      .then((response) => {
        alert(response.alert)
      })
      .catch(console.log)
  }

  deleteChild = () => {
    console.log('Deleting child')
    // const baseURL = 'http://localhost:3000'
    // const token = localStorage.getItem('token')
    // const id = this.props.selectedChild.id
    // fetch(`${baseURL}/children/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(this.props.parent.email),
    // })
    //   .then((res) => res.json())
    //   .then((response) => {
    //     console.log(response)
    //     //update redux and front end redirect and child cards for deleted child
    //     this.props.history.push('/welcome')
    //   })
    //   .catch(console.log)
    this.props.dispatchRemoveChild(this.props.selectedChild)
    this.props.history.push('/welcome')
  }

  handleConfirmCancel = () => {
    this.setState({ openConfirm: false })
  }
  handleConfirm = () => {
    this.setState({ openConfirm: false })
    this.deleteChild()
  }

  render() {
    // console.log("LOCAL STATE", this.state)
    return (
      <>
        {this.state.openConfirm && (
          <Confirm
            closeOnDimmerClick={false}
            open={this.state.openConfirm}
            content="Are you sure? Deleting a child's account can not be undone!"
            confirmButton="No"
            cancelButton="Yes"
            onCancel={this.handleConfirm}
            onConfirm={this.handleConfirmCancel}
          />
        )}
        {this.props.child ? (
          <>
            <div className="background">
              <Container>
                <Header className="pageHeader" size="huge" textAlign="center">
                  {this.props.allReports.length ? (
                    `${this.props.child.username}'s Reports`
                  ) : (
                    <EmptyReportsModal />
                  )}
                </Header>
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content tableHeaderMargin">
                  Individual Journal Emotional Reports
                </Header>
                {ReportGalleryReportsTable(
                  this.state.items,
                  this.handleReportClick,
                  this.onChangePage
                )}
                <br />
                {this.state.beenClicked
                  ? ReportGallerySingleGraph(this.state, this.props.parent)
                  : null}
              </Container>
              <Container textAlign="center">
                <Header as="h2" className="content tableHeaderMargin">
                  Emotional Reports over Time
                </Header>
                <br />
                {/* <div className="lineGraph pattern">
                  <D3OverTimeLineGraph data={this.state.items} />
                </div> */}
                <div id="#EOT">
                  <StackedBarChart
                    data={this.emotionsOverTimeData(this.state.items)}
                  />
                </div>
              </Container>
              <div className="footer"></div>
            </div>
          </>
        ) : (
          <div className="background">
            <Dropdown floating item icon="bars" className="editChildMenu">
              <Dropdown.Menu>
                <Dropdown.Item
                  name="resetPassword"
                  onClick={this.initiateChildPasswordReset}
                  className="editChildDropdown"
                >
                  Reset {this.filterChildsName()}'s Password
                </Dropdown.Item>
                <Dropdown.Item
                  name="deleteChild"
                  onClick={() => this.setState({ openConfirm: true })}
                  className="editChildDropdown"
                >
                  Delete {this.filterChildsName()}'s Account
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Container>
              <Header className="pageHeader" size="huge" textAlign="center">
                {this.props.filteredReports.length ? (
                  `${this.filterChildsName()}'s Reports`
                ) : (
                  <EmptyReportsModal />
                )}
              </Header>
            </Container>
            <Container textAlign="center">
              <Header as="h2" className="content tableHeaderMargin">
                Individual Journal Emotional Reports
              </Header>
              {ReportGalleryReportsTable(
                this.state.items,
                this.handleReportClick,
                this.onChangePage
              )}
              <br />
              {this.state.beenClicked
                ? ReportGallerySingleGraph(this.state, this.props.parent)
                : null}
            </Container>
            <Container textAlign="center">
              <Header as="h2" className="content tableHeaderMargin">
                Emotional Reports over Time
              </Header>
              <br />
              {/* <div className="lineGraph pattern">
                <D3OverTimeLineGraph data={this.state.items} />
              </div> */}
            </Container>
            <div className="footer"></div>
          </div>
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
    filteredReports: state.filteredReports,
    videoCache: state.videoCache,
    selectedChild: state.selectedChild,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClickedReport: (report) => dispatch(setClickedReport(report)),
    dispatchCacheVideo: (videoStateObject) =>
      dispatch(fetchVideoToCache(videoStateObject)),
    dispatchRemoveChild: (child) => dispatch(removeChild(child)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportGalleryPage)
