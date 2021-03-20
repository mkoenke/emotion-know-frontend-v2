import { select } from 'd3'
import React, { useEffect, useRef } from 'react'

function BubbleChart(props) {
  const svgRef = useRef()

  const emotions = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise']
  const colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
  ]
  const data = props.data.map((value) => value * 1000)
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

      .transition()
      .duration(1000)
      .delay(function (d, i) {
        return i * 10
      })
      .attr('r', function (d) {
        return Math.sqrt(d * 100)
      })

    // let g = svg
    //   .selectAll(null)
    //   .data(data)
    //   .enter()
    //   .append('g')

    //   .attr('transform', (value, index) => 'translate(' + index * 200 + ')')
    // g.append('circle')
    //   .attr('r', (value) => value)
    //   // .attr('cx', 200)
    //   // .attr('cy', (value, i) => i * 200)
    //   ///assign colors
    //   .style('fill', function (d, i) {
    //     return colors[i]
    //   })
    // g.append('text')
    //   .text((v, i) => emotions[i])
    //   .attr('cx', 200)
    //   .attr('cy', (value, i) => i * 200)
  }, [props.data.map((value) => value * 1000)])
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  )
}

export default BubbleChart
