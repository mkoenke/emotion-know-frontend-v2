import Chart from 'r-chart'
import React from 'react'
import { connect } from 'react-redux'

class IndividualLineGraph extends React.Component {
  componentDidMount() {
    this.chartData()
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.clickedReport !== this.props.clickedReport) {
      this.chartData()
    }
  }

  state = {
    data: [],
    keys: [],
  }

  chartData = () => {
    console.log('In chartData()')
    console.log(this.props.clickedReport)

    if (this.props.clickedReport) {
      let index = 0
      let angerKeysAndValues = this.props.clickedReport.anger.map((value) => {
        if (value) {
          index++
        }

        return { key: `${index}`, value: parseFloat(value) }
      })
      console.log('anger keys and values: ', angerKeysAndValues)
      index = 0
      let disgustKeysAndValues = this.props.clickedReport.disgust.map(
        (value) => {
          if (value) {
            index++
          }

          return { key: `${index}`, value: parseFloat(value) }
        }
      )
      index = 0
      let fearKeysAndValues = this.props.clickedReport.fear.map((value) => {
        if (value) {
          index++
        }

        return { key: `${index}`, value: parseFloat(value) }
      })
      index = 0
      let joyKeysAndValues = this.props.clickedReport.joy.map((value) => {
        if (value) {
          index++
        }

        return { key: `${index}`, value: parseFloat(value) }
      })
      index = 0
      let sadnessKeysAndValues = this.props.clickedReport.sadness.map(
        (value) => {
          if (value) {
            index++
          }

          return { key: `${index}`, value: parseFloat(value) }
        }
      )
      index = 0
      let surpriseKeysAndValues = this.props.clickedReport.surprise.map(
        (value) => {
          if (value) {
            index++
          }

          return { key: `${index}`, value: parseFloat(value) }
        }
      )
      index = 0
      //picked anger as any one of the arrays to iterate over to get x axis values
      let xAxisCategories = this.props.clickedReport.anger.map((value) => {
        if (value) {
          index++
        }

        return `${index}`
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
    console.log('state in indiv line graph: ', this.state)
    console.log('props in indiv line graph: ', this.props)
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
    clickedReport: state.clickedReport,
    parentsReports: state.parentsReports,
  }
}

export default connect(mapStateToProps)(IndividualLineGraph)
