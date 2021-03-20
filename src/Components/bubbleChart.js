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
  const emotions = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise']
  const colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
  ]
  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(props.data.map((value) => value * 1000))
      // .enter()
      // .append('p')
      // .text(function (d, i) {
      //   return emotions[i]
      // })

      .join('circle')
      .attr('r', (value) => value)
      .attr('cx', 200)
      .attr('cy', (value, i) => i * 200)
      ///assign colors
      .style('fill', function (d, i) {
        return colors[i]
      })
      ///random color
      // .style('fill', function () {
      //   return 'hsl(' + Math.random() * 360 + ',100%,50%)'
      // })

      //all colors teal
      // .attr('stroke', 'rgb(10, 157, 174)')
      // .attr('fill', '#57909e')

      .transition()
      .duration(1000)
      .delay(function (d, i) {
        return i * 10
      })
      .attr('r', function (d) {
        return Math.sqrt(d * 100)
      })
  }, [props.data.map((value) => value * 1000)])
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  )
}

export default BubbleChart
