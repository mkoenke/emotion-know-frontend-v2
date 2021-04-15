import {
  axisBottom,
  axisLeft,
  curveCardinal,
  line,
  scaleLinear,
  select,
  zoom,
} from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import emotionsOverTimeCalculator from '../HelperFunctions/emotionsOverTimeCalculator'

function D3OverTimeLineGraph({ data, id = 'd3OverTimeLineGraph' }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const [currentZoomState, setCurrentZoomState] = useState()

  const [anger, setAngerState] = useState()
  const [disgust, setDisgustState] = useState()
  const [fear, setFearState] = useState()
  const [joy, setJoyState] = useState()
  const [sadness, setSadnessState] = useState()
  const [surprise, setSurpriseState] = useState()

  const emotionsOverTimeData = emotionsOverTimeCalculator(data)

  const svg = select(svgRef.current)

  svg.append("text")
    .attr("x", 515)
    .attr("y", 335)
    .style("fill", "#5d5d5d")
    .style("stroke", "#5d5d5d")
    .style("text-anchor", "middle")
    .text("Date")
  
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -150)
    .attr("y", -45)
    .attr("dy", "1em")
    .style("fill", "#5d5d5d")
    .style("stroke", "#5d5d5d")
    .style("text-anchor", "middle")
    .text("% of Entry Spent On Emotion")

  useEffect(() => {

    const svgContent = svg.select('.content')
    const { width, height } = wrapperRef.current.getBoundingClientRect()

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width])

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale)
      xScale.domain([Math.max(0, newXScale.domain()[0]), newXScale.domain()[1]])
    }

    const yScale = scaleLinear()
      .domain([0, 1])
      .range([height, 10])

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y((d) => yScale(d))
      .curve(curveCardinal)

    const xAxis = axisBottom(xScale)

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    const yAxis = axisLeft(yScale)
    svg.select('.y-axis').call(yAxis)

    const zoomBehavior = zoom()
      .scaleExtent([1, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', (event) => {
        const zoomState = event.transform
        setCurrentZoomState(zoomState)
      })

    svgContent
      .selectAll('overTimeLine')
      .data([emotionsOverTimeData])
      .join('path')
      .attr('class', 'overTimeLine')
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('d', lineGenerator)

    svg.call(zoomBehavior)

    const arrayEmotionsOverTimeData = (emotionsOverTimeData, emotion) => {
      return emotionsOverTimeData.map(report => report[emotion])
    }

    setAngerState(lineGenerator(arrayEmotionsOverTimeData(emotionsOverTimeData, "anger")))
    setDisgustState(lineGenerator(arrayEmotionsOverTimeData(emotionsOverTimeData, "disgust")))
    setFearState(lineGenerator(arrayEmotionsOverTimeData(emotionsOverTimeData, "fear")))
    setJoyState(lineGenerator(arrayEmotionsOverTimeData(emotionsOverTimeData, "joy")))
    setSadnessState(lineGenerator(arrayEmotionsOverTimeData(emotionsOverTimeData, "sadness")))
    setSurpriseState(lineGenerator(arrayEmotionsOverTimeData(emotionsOverTimeData, "surprise")))

  }, [currentZoomState, data])


  return (
    <React.Fragment>
      <div ref={wrapperRef} >
        <svg ref={svgRef}>``
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`} fill="none" strokeWidth="3px">
            <path d={anger} stroke="rgba(255, 99, 132, 1)" ></path>
            <path d={disgust} stroke="rgba(255, 159, 64, 1)"></path>
            <path d={fear} stroke="rgba(75, 192, 192, 1)"></path>
            <path d={joy} stroke="rgba(255, 206, 86, 1)"></path>
            <path d={sadness} stroke="rgba(54, 162, 235, 1)"></path>
            <path d={surprise} stroke="rgba(153, 102, 255, 1)"></path>
          </g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default D3OverTimeLineGraph
