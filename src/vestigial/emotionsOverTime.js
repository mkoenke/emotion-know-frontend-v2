//returns array of reports with emotions averaged for each report
function emotionsOverTime(reports) {
  let averagedReports = []
  for (let report of reports) {
    averagedReports.push(averageReportCalculator(report))
  }
  return averagedReports
}

//generates a new object with emotion averages instead of emotion arrays
function averageReportCalculator(report) {
  let averageEmotionReport = {}
  for (let key in report) {
    if (key === "anger" || key === "disgust" || key === "fear" || key === "joy"
      || key === "sadness" || key === "surprise") {
      averageEmotionReport[key] = computeAverage(report[key])
    } else averageEmotionReport[key] = report[key]
  }
  return averageEmotionReport
}

//computes average of each emotion array passed in as an argument
function computeAverage(emotionArray) {
  let floatArray = []
  for (let val of emotionArray) {
    floatArray.push(parseFloat(val))
  }
  let averageResult = (floatArray.reduce((sum, val) => sum + val) / emotionArray.length)
  return averageResult
}

export default emotionsOverTime