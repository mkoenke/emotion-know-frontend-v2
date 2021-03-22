import {
  axisBottom,
  axisLeft,
  curveCardinal,
  line,
  max,
  scaleLinear,
  select,
  zoom,
} from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

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

function D3LineChart({ data, id = 'myD3LineChart' }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const [currentZoomState, setCurrentZoomState] = useState()
  const [anger, setAngerState] = useState(data.anger)
  const [disgust, setDisgustState] = useState(data.disgust)
  const [fear, setFearState] = useState(data.fear)
  const [joy, setJoyState] = useState(data.joy)
  const [sadness, setSadnessState] = useState(data.sadness)
  const [surprise, setSurpriseState] = useState(data.surprise)

  useEffect(() => {
    const svg = select(svgRef.current)
    const svgContent = svg.select('.content')
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const length = data.anger.length

    const xScale = scaleLinear()
      // .domain([0, data.length - 1])
      .domain([0, length - 1])
      .range([10, width - 10])

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale)
      xScale.domain(newXScale.domain())
    }

    const yScale = scaleLinear()
      .domain([0, 1])
      // .domain([0, max(data)])
      .range([height - 10, 10])

    const lineGenerator = line()
      .x((d, index) => xScale(index))
      .y((d) => yScale(d))
      .curve(curveCardinal)
    
    svgContent
      .selectAll('.emotionLine')
      .data([anger,fear,joy,sadness,surprise,disgust])
      .join('path')
      .attr('class', 'emotionLine')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('d', lineGenerator)
    

    // svgContent
    //   .selectAll('.myDot')
    //   .data(anger)
    //   .join('circle')
    //   .attr('class', 'myDot')
    //   .attr('stroke', 'black')
    //   .attr('r', 4)
    //   .attr('fill', 'rgb(10, 157, 174)')
    //   .attr('cx', (value, index) => xScale(index))
    //   .attr('cy', yScale)

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

    svg.call(zoomBehavior)
  }, [currentZoomState, data, dimensions])

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`}></g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default D3LineChart
