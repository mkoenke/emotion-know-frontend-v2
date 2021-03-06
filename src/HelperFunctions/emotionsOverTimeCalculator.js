//Calculates the return for the emotion over time graph
function emotionsOverTimeCalculator(emotionReports) {
  const countedEmotionReports = emotionReports.map(report =>
    singleReportFrequencyCounter(report)
  )
  const emotionPercentOfEntryArray = countedEmotionReports.map(report => {
    return percentOfCounts(report)
  })
  //this solution needs refactoring, but adds date back to array
  for(let i = 0; i < emotionReports.length; i++){
    emotionPercentOfEntryArray[i].id = i
    emotionPercentOfEntryArray[i].created_at = new Date(emotionReports[i].created_at)
  }
  return emotionPercentOfEntryArray
}

//Calculates the amount of times an emotion is the peak value
function singleReportFrequencyCounter(report) {

  //This may need refactoring
  const newReportObj = {
    anger: report.anger,
    disgust: report.disgust,
    fear: report.fear,
    joy: report.joy,
    sadness: report.sadness,
    surprise: report.surprise,
  }
  const emotionFrequencyCounter = {
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    sadness: 0,
    surprise: 0
  }
  //anger is arbitrary, could use any emotion to calc length
  for (let i = 0; i < newReportObj.anger.length; i++) {
    const sorted = Object.entries(newReportObj).sort((a, b) => {
      return b[1][i] - a[1][i]
    })
    emotionFrequencyCounter[`${sorted[0][0]}`]++
  }
  return emotionFrequencyCounter
}

//Calculates amount of time (by percentage of total) that each emotion is the 
//dominant emotion
function percentOfCounts(countedReport) {
  const emotionalPercentCounter = {
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    sadness: 0,
    surprise: 0
  }
  const totalCount = Object.values(countedReport).reduce(
    (sum, val) => sum + val
  )
  for(const [emotion, count] of Object.entries(countedReport)){
    const percent = count/totalCount
    emotionalPercentCounter[`${emotion}`] = percent
  }
  return emotionalPercentCounter
}

export default emotionsOverTimeCalculator