import {
  axisBottom,
  axisLeft,
  curveCardinal,
  line,
  scaleLinear,
  scaleOrdinal,
  select,
  zoom,
} from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import emotionsOverTimeCalculator from '../HelperFunctions/emotionsOverTimeCalculator'


function D3OverTimeBarChart({ data }) {
  console.log("CHART DATA", data)

  const svgRef = useRef()
  const svg = select(svgRef.current)



  const layerNames = Object.keys(data[0].emotions)
  const barNames = []

  const margin = {
    top: 10,
    right: 30,
    bottom: 10,
    left: 30
  // }, width = 1200 - margin.left - margin.right,
  //   height = 400 - margin.top - margin.bottom
  }, width = 1200,
    height = 400

  const xScale = scaleOrdinal()
    .domain(barNames)
    .range([0, width], 0.25)

  const yScale = scaleLinear()
    .domain([0, 1])
    .range([height, 0])

  const xAxis = axisBottom(xScale)
  const yAxis = axisLeft(yScale)

  svg
    .attr("class", "bar-chart")
    .attr("width", width)
    // .attr("width", width + margin.left + margin.right)
    .attr("height", height)
    // .attr("height", height + margin.top + margin.bottom)
    .append("g")
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)

  return (
    <React.Fragment>
      <svg ref={svgRef}>

      </svg>
    </React.Fragment>
  )
}

export default D3OverTimeBarChart
