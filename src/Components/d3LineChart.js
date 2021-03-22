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
  const [anger, setAngerState] = useState()
  const [disgust, setDisgustState] = useState()
  const [fear, setFearState] = useState()
  const [joy, setJoyState] = useState()
  const [sadness, setSadnessState] = useState()
  const [surprise, setSurpriseState] = useState()

  useEffect(() => {
    const svg = select(svgRef.current)
    const svgContent = svg.select('.content')
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
      
      
      const length = data.anger.length
      
      const xScale = scaleLinear()
      .domain([0, length - 1])
      .range([10, width - 10])
      
      if (currentZoomState) {
        const newXScale = currentZoomState.rescaleX(xScale)
        xScale.domain(newXScale.domain())
      }
      
      const yScale = scaleLinear()
      .domain([0, 1])
      .range([height - 10, 10])
      
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
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on('zoom', (event) => {
        const zoomState = event.transform
        setCurrentZoomState(zoomState)
      })

      setAngerState(lineGenerator(data.anger))
      setDisgustState(lineGenerator(data.disgust))
      setFearState(lineGenerator(data.fear))
      setJoyState(lineGenerator(data.joy))
      setSadnessState(lineGenerator(data.sadness))
      setSurpriseState(lineGenerator(data.surprise))
      
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
          <g className="content" clipPath={`url(#${id})`} fill="none" strokeWidth="2px">
            <path d={anger} stroke="red" ></path>
            <path d={disgust} stroke="purple"></path>
            <path d={fear} stroke="green"></path>
            <path d={joy} stroke="yellow"></path>
            <path d={sadness} stroke="blue"></path>
            <path d={surprise} stroke="orange"></path>
          </g>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default D3LineChart
