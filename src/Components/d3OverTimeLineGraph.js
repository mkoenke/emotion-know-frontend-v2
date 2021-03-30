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
import ResizeObserver from 'resize-observer-polyfill'
import emotionsOverTimeCalculator from '../HelperFunctions/emotionsOverTimeCalculator'

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null)
  useEffect(() => {
    const observeTarget = ref.current
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect)
      })
    })
    resizeObserver.observe(observeTarget)
    return () => {
      resizeObserver.unobserve(observeTarget)
    }
  }, [ref])
  return dimensions
}

function D3OverTimeLineGraph({ data, id = 'd3OverTimeLineGraph' }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const [currentZoomState, setCurrentZoomState] = useState()

  const emotionsOverTimeData = emotionsOverTimeCalculator(data)

  useEffect(() => {
    const svg = select(svgRef.current)
    const svgContent = svg.select('.content')
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([10, width - 10])

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale)
      xScale.domain(newXScale.domain())
    }

    const yScale = scaleLinear()
      .domain([0, 1])
      .range([height - 10, 10])

    const lineGenerator = line()
      .x((d,index) => xScale(d.created_at))
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
      .scaleExtent([0.5, 5])
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
  }, [currentZoomState, data, dimensions])


  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          {/* <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs> */}
          <g className="content" clipPath={`url(#${id})`} fill="none" strokeWidth="2px"></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default D3OverTimeLineGraph
