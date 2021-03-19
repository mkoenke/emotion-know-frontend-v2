import React, { useEffect, useRef, useState } from 'react'
import { select } from 'd3'
import { useSelector } from 'react-redux'


function FunWithEmotionsBarGraph(props) {

  const w = 50
  const h = 40
  const tempData = [25,35,45,56,66]

  const svgRef = useRef()

  useEffect(() => {
    console.log(Array.from(props.emotions))

    const svg = select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#cccccc")
      .style("padding", 10)
      .style("margin-left", 50)

    svg
      .selectAll("rect")
      .data(tempData)
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "red")
  }, [props.emotions])

  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  )
}

export default FunWithEmotionsBarGraph