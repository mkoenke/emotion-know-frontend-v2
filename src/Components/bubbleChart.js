import { select } from 'd3'
import React, { useEffect, useRef } from 'react'

function BubbleChart(props) {
  // const [data, setData] = useState(props.data.map((value) => value * 1000))
  const svgRef = useRef()
  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(props.data.map((value) => value * 1000))
      .join('circle')
      .attr('r', (value) => value)
      .attr('cx', (value) => value * 10)
      .attr('cy', (value) => value * 5)
      .attr('stroke', 'red')
  }, [props.data.map((value) => value * 1000)])
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  )
}

export default BubbleChart
