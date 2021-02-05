// import Chart from "react-apexcharts"
import { Line } from "@reactchartjs/react-chart.js"
import React from "react"
import { connect } from "react-redux"

class MyChart extends React.Component {
  componentDidMount() {
    this.chartData()
  }

  state = {
    data: {
      labels: [],
      datasets: [],
    },
  }

  chartData = () => {
    if (this.props.allReports.length) {
      let xAxisCategories = this.props.allReports.map(
        (report) => `${new Date(report.created_at)}`
      )
      let angerData = this.props.allReports.map((report) => report.anger)
      let disgustData = this.props.allReports.map((report) => report.disgust)
      let fearData = this.props.allReports.map((report) => report.fear)
      let joyData = this.props.allReports.map((report) => report.joy)
      let sadnessData = this.props.allReports.map((report) => report.sadness)
      let surpriseData = this.props.allReports.map((report) => report.surprise)

      this.setState({
        data: {
          labels: xAxisCategories,
          datasets: [
            {
              label: "Anger",
              data: angerData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Disgust",
              data: disgustData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Fear",
              data: fearData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Joy",
              data: joyData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Sadness",
              data: sadnessData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Surprise",
              data: surpriseData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        },
      })
    } else {
      let xAxisCategories = this.props.parentsReports.map(
        (report) => `${new Date(report.created_at)}`
      )
      let angerData = this.props.parentsReports.map((report) => report.anger)
      let disgustData = this.props.parentsReports.map(
        (report) => report.disgust
      )
      let fearData = this.props.parentsReports.map((report) => report.fear)
      let joyData = this.props.parentsReports.map((report) => report.joy)
      let sadnessData = this.props.parentsReports.map(
        (report) => report.sadness
      )
      let surpriseData = this.props.parentsReports.map(
        (report) => report.surprise
      )

      this.setState({
        data: {
          labels: xAxisCategories,
          datasets: [
            {
              label: "Anger",
              data: angerData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Disgust",
              data: disgustData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Fear",
              data: fearData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Joy",
              data: joyData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Sadness",
              data: sadnessData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
            {
              label: "Surprise",
              data: surpriseData,
              fill: false,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.2)",
            },
          ],
        },
      })
    }
  }

  render() {
    console.log("Reports in chart:", this.props.allReports)
    console.log("State in chart: ", this.state)
    return <Line data={this.state.data} />
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    allReports: state.allReports,
    parentsReports: state.parentsReports,
  }
}

export default connect(mapStateToProps)(MyChart)