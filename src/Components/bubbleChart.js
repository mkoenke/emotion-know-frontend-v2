import { select } from 'd3'
import React, { useEffect, useRef } from 'react'

function BubbleChart(props) {
  // const [data, setData] = useState(props.data.map((value) => value * 1000))
  const svgRef = useRef()

  // const color = d3
  //   .scaleOrdinal(
  //     props.data.map((d) => d),
  //     d3.schemeCategory10
  //   )
  //   .unknown('black')
  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(props.data.map((value) => value * 1000))
      .join('circle')
      .attr('r', (value) => value)
      .attr('cx', 200)
      .attr('cy', (value) => value * 5)
      .attr('stroke', 'rgb(10, 157, 174)')
      .attr('fill', '#57909e')
  }, [props.data.map((value) => value * 1000)])
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  )
}

export default BubbleChart
