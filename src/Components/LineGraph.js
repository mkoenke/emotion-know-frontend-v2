import Chart from 'r-chart'
import React from 'react'
import { connect } from 'react-redux'
import emotionsOverTime from '../HelperFunctions/emotionsOverTime'

class LineGraph extends React.Component {
  componentDidMount() {
    this.setState(
      {
        averagedReports: emotionsOverTime(this.props.allReports),
      },
      () => this.chartData()
    )
  }

  state = {
    data: [],
    keys: [],
    averagedReports: [],
  }

  chartData = () => {
    if (this.state.averagedReports.length) {
      let angerKeysAndValues = this.state.averagedReports.map((report) => {
        let date = new Date(report.created_at)

        return { key: `${date}`, value: report.anger }
      })
      let disgustKeysAndValues = this.state.averagedReports.map((report) => {
        let date = new Date(report.created_at)

        return { key: `${date}`, value: report.disgust }
      })
      let fearKeysAndValues = this.state.averagedReports.map((report) => {
        let date = new Date(report.created_at)

        return { key: `${date}`, value: report.fear }
      })
      let joyKeysAndValues = this.state.averagedReports.map((report) => {
        let date = new Date(report.created_at)

        return { key: `${date}`, value: report.joy }
      })
      let sadnessKeysAndValues = this.state.averagedReports.map((report) => {
        let date = new Date(report.created_at)

        return { key: `${date}`, value: report.sadness }
      })
      let surpriseKeysAndValues = this.state.averagedReports.map((report) => {
        let date = new Date(report.created_at)

        return { key: `${date}`, value: report.surprise }
      })
      let xAxisCategories = this.state.averagedReports.map((report) => {
        let date = new Date(report.created_at)

        return `${date}`
      })
      this.setState({
        data: [
          {
            type: 'line',
            title: 'Anger',
            color: 'red',
            points: angerKeysAndValues,
          },
          {
            type: 'line',
            color: 'orange',
            title: 'Disgust',
            points: disgustKeysAndValues,
          },
          {
            type: 'line',
            color: 'green',
            title: 'Fear',
            points: fearKeysAndValues,
          },
          {
            type: 'line',
            color: 'yellow',
            title: 'Joy',
            points: joyKeysAndValues,
          },
          {
            type: 'line',
            color: 'blue',
            title: 'Sadness',
            points: sadnessKeysAndValues,
          },
          {
            type: 'line',
            color: 'purple',
            title: 'Surprise',
            points: surpriseKeysAndValues,
          },
        ],
        keys: xAxisCategories,
      })
    } else if (this.props.parentsReports.length) {
      let angerKeysAndValues = this.props.parentsReports.map((report) => {
        let date = new Date(report.created_at)

        return { key: `${date}`, value: report.anger }
      })
      let disgustKeysAndValues = this.props.parentsReports.map((report) => {
        let date = new Date(report.created_at)
        return { key: `${date}`, value: report.disgust }
      })
      let fearKeysAndValues = this.props.parentsReports.map((report) => {
        let date = new Date(report.created_at)
        return { key: `${date}`, value: report.fear }
      })
      let joyKeysAndValues = this.props.parentsReports.map((report) => {
        let date = new Date(report.created_at)
        return { key: `${date}`, value: report.joy }
      })
      let sadnessKeysAndValues = this.props.parentsReports.map((report) => {
        let date = new Date(report.created_at)
        return { key: `${date}`, value: report.sadness }
      })
      let surpriseKeysAndValues = this.props.parentsReports.map((report) => {
        let date = new Date(report.created_at)
        return { key: `${date}`, value: report.surprise }
      })
      let xAxisCategories = this.props.parentsReports.map((report) => {
        let date = new Date(report.created_at)
        return `${date}`
      })

      this.setState({
        data: [
          {
            type: 'line',
            title: 'Anger',
            color: 'red',
            points: angerKeysAndValues,
          },
          {
            type: 'line',
            color: 'orange',
            title: 'Disgust',
            points: disgustKeysAndValues,
          },
          {
            type: 'line',
            color: 'green',
            title: 'Fear',
            points: fearKeysAndValues,
          },
          {
            type: 'line',
            color: 'yellow',
            title: 'Joy',
            points: joyKeysAndValues,
          },
          {
            type: 'line',
            color: 'blue',
            title: 'Sadness',
            points: sadnessKeysAndValues,
          },
          {
            type: 'line',
            color: 'purple',
            title: 'Surprise',
            points: surpriseKeysAndValues,
          },
        ],
        keys: xAxisCategories,
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <Chart
        data={this.state.data}
        keys={this.state.keys}
        key_zoom={true}
        value_zoom={true}
        value_gridColor={'#ddd'}
        labelRotate={45}
        key_editLabel={(key) => key.split(' ').slice(0, 3).join(' ')}
        axisThickness={{ horizontal: 90, vertical: 50 }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    child: state.child,
    allReports: state.allReports,
    parentsReports: state.parentsReports,
  }
}

export default connect(mapStateToProps)(LineGraph)
