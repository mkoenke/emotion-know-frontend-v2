import { select, scaleBand, axisBottom, svg } from 'd3'
import React, { useEffect, useRef } from 'react'
import useResizeObserver from './useResizeObserver'

function StackedBarChart({ data, keys, colors }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
  }, [colors, data, dimensions, keys])

  const xScale = scaleBand()
    .domain(data.map(d => d.created_at))
    .range([0, width])

  const xAxis = axisBottom(xScale)
  svg.select(".x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis)

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