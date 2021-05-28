import React from "react";
import { connect } from "react-redux";
import { Container, Header } from "semantic-ui-react";
// import D3OverTimeLineGraph from '../Components/D3OverTimeLineGraph'
import EmptyReportsModal from "../Components/EmptyReportsModal";
import ReportGalleryReportsTable from "../Components/ReportGalleryReportsTable";
import ReportGallerySingleGraph from "../Components/ReportGallerySingleGraph";
import StackedBarChart from "../Components/StackedBarChart";
import emotionsOverTimeCalculator from "../HelperFunctions/emotionsOverTimeCalculator";
import { setClickedReport } from "../Redux/actions";

class ReportGalleryPage extends React.Component {
  state = {
    beenClicked: false,
    clickedReport: null,
    clickedVideo: null,
    items: [],
    pageOfItems: [],
  };

  componentDidMount() {
    if (this.props.allReports.length) {
      this.setState({ items: this.props.allReports });
    } else if (this.props.filteredReports.length) {
      this.setState({ items: this.props.filteredReports });
    }
  }

  handleReportClick = (event) => {
    if (this.state.beenClicked) {
      this.setState({ beenClicked: false });
    }
    let currentReports = [];
    if (!this.props.allReports.length)
      currentReports = [...this.props.parentsReports];
    else currentReports = [...this.props.allReports];

    const clickedReport = currentReports.find(
      (report) => report.created_at === event.target.closest("tr").id
    );
    
    fetch(`http://localhost:3000/video_entries/${clickedReport.video_entry_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // 'Authorization': localStorage.getItem('token'),
        Accept: "application/json",
      },
      body: JSON.stringify(),
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(
          {
            clickedReport: clickedReport,
            clickedVideo: data,
            beenClicked: true
          }
        );
      });
  };

  handleParentReportClick = (event) => {
    let clickedReport = this.props.filteredReports.find(
      (report) => report.created_at === event.target.closest("tr").id
    );
    this.props.dispatchClickedReport(clickedReport);
    this.setState(
      {
        clickedReport: clickedReport,
      }
    );
  };

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfItems });
  };

  emotionsOverTimeData = (itemsFromState) => {
    return emotionsOverTimeCalculator(itemsFromState);
  };

  filterChildsName = () => {
    if (this.props.filteredReports.length) {
      const filteredChild = this.props.parent.children.filter(
        (child) => child.id === this.props.filteredReports[0].child_id
      );
      return filteredChild[0].username;
    } else {
      return "NO REPORTS";
    }
  };

  render() {
    console.log("LOCAL STATE", this.state)
    return (
      <>
        {this.props.child ? (
          <>
            <div className="background">
              <Container>
                <Header className="pageHeader" size="huge" textAlign="center">
                  {/* {this.props.child.username}'s Reports */}
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
    );
  }
}
function mapStateToProps(state) {
  return {
    child: state.child,
    parent: state.parent,
    allReports: state.allReports,
    parentsReports: state.parentsReports,
    allVideos: state.allVideos,
    filteredReports: state.filteredReports,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchClickedReport: (report) => dispatch(setClickedReport(report)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportGalleryPage);
