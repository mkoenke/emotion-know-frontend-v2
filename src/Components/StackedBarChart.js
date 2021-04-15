import { select, scaleBand, scaleLinear, axisBottom, stack, max, axisLeft, stackOrderAscending } from 'd3'
import React, { useEffect, useRef } from 'react'
import useResizeObserver from './useResizeObserver'

const keys = [
  "anger",
  "disgust",
  "fear",
  "joy",
  "sadness",
  "surprise"]
const colors = {
  anger: "red",
  disgust: "orange",
  sadness: "blue",
  fear: "green",
  surprise: "purple",
  joy: "yellow"
}

function StackedBarChart({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)


  useEffect(() => {
    const svg = select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    // console.log("DATA", data)

    //Stacks and layers
    const stackGenerator = stack()
      .keys(keys)
      .order(stackOrderAscending)
    const layers = stackGenerator(data)
    const extent = [
      0,
      max(layers, layer =>
        max(layer, sequence =>
          sequence[1]))]

    //Scales
    const xScale = scaleBand()
      .domain(data.map(d => d.created_at))
      .range([0, width])
      .padding(0.25)

    const yScale = scaleLinear()
      .domain(extent)
      .range([height, 0])

    //Rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", layer => {
        // console.log("LAYER", layer)
        return colors[layer.key]
      })
      .selectAll("rect")
      .data(layer => layer)
      .join("rect")
      .attr("x", sequence => {
        // console.log("SEQUENCE", sequence)
        return xScale(sequence.data.created_at)
      })
      .attr("width", xScale.bandwidth())
      .attr("y", sequence => yScale(sequence[1]))
      .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]))

    //Axes
    const xAxis = axisBottom(xScale)
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)

    const yAxis = axisLeft(yScale)
    svg
      .select(".y-axis")
      .call(yAxis)




  }, [colors, data, dimensions, keys])

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default StackedBarChart