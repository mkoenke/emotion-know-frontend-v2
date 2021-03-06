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

function D3LineChart({ data, id = 'myD3LineChart' }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const [currentZoomState, setCurrentZoomState] = useState()
  const [anger, setAngerState] = useState()
  const [disgust, setDisgustState] = useState()
  const [fear, setFearState] = useState()
  const [joy, setJoyState] = useState()
  const [sadness, setSadnessState] = useState()
  const [surprise, setSurpriseState] = useState()

  const margin = { left: 40, right: 0, top: 0, bottom: 0 }

  useEffect(() => {
    const svg = select(svgRef.current)

    svg
      .append('text')
      .attr('x', 250)
      .attr('y', 335)
      .style('fill', '#5d5d5d')
      .style('stroke', '#5d5d5d')
      .style('text-anchor', 'middle')
      .text('Time (s)')

    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -150)
      .attr('y', -45)
      .attr('dy', '1em')
      .style('fill', '#5d5d5d')
      .style('stroke', '#5d5d5d')
      .style('text-anchor', 'middle')
      .text('Liklihood of Current Emotion')

    const svgContent = svg.select('.content')
    const { width, height } = wrapperRef.current.getBoundingClientRect()
    const length = data.anger.length

    const xScale = scaleLinear()
      .domain([0, length - 1])
      .range([0, width - 50])

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale)
      xScale.domain([Math.max(0, newXScale.domain()[0]), newXScale.domain()[1]])
    }

    const yScale = scaleLinear().domain([0, 1.1]).range([height, 1])

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

    setAngerState(lineGenerator(data.anger))
    setDisgustState(lineGenerator(data.disgust))
    setFearState(lineGenerator(data.fear))
    setJoyState(lineGenerator(data.joy))
    setSadnessState(lineGenerator(data.sadness))
    setSurpriseState(lineGenerator(data.surprise))

    svg.call(zoomBehavior)
  }, [currentZoomState, data])

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg
          className="lineSvg"
          ref={svgRef}
          style={{
            marginLeft: margin.left,
            marginTop: '3px',
            marginRight: margin.right,
          }}
        >
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="91%" height="100%" />
            </clipPath>
          </defs>
          <g
            className="content"
            clipPath={`url(#${id})`}
            fill="none"
            strokeWidth="3px"
          >
            <path d={anger} stroke="rgba(255, 99, 132, 1)"></path>
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

export default D3LineChart
