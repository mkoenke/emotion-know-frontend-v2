//returns array of reports with emotions averaged for each report
function emotionsOverTime (reports){
  // console.log("reports:",reports)
  let averagedReports = []
  for(let report of reports){
    // console.log("report:", report)
    averagedReports.push(averageReportCalculator(report))
  }
  // console.log("averaged reports:", averagedReports)
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
  // console.log("averageEmotionReport:", averageEmotionReport)
  return averageEmotionReport 
}

//computes average of each emotion array passed in as an argument
function computeAverage(emotionArray) {
  let floatArray = []
  for(let val of emotionArray){
    floatArray.push(parseFloat(val))
  }
  let averageResult = (floatArray.reduce((sum, val) => sum + val) / emotionArray.length)
  return averageResult
}

export default emotionsOverTime