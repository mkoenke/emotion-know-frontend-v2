import { select } from 'd3'
import React, { useEffect, useRef } from 'react'

function BubbleChart(props) {
  const svgRef = useRef()

  const emotions = ['Anger', 'Disgust', 'Fear', 'Joy', 'Sadness', 'Surprise']
  const colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(153, 102, 255, 0.5)',
  ]
  const data = props.data.map((value) => value * 1000)
  useEffect(() => {
    const svg = select(svgRef.current)
    svg
      .selectAll('circle')
      .data(data)
      // .enter()
      // .append('p')
      // .text(function (d, i) {
      //   return emotions[i]
      // })

      .join('circle')
      .attr('r', (value) => value)
      .attr('cx', 200)
      .attr('cy', (value, i) => i * 200 + 100)
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

    svg
      .selectAll('text')
      .data(emotions)
      .enter()
      .append('text')
      .attr('class', 'bubbleText')
      .text((d) => d)
      .attr('x', (d) => {
        // console.log(d.length) // muliply by pixels of 1 letter
        // return 200 - (d.length / 2) * 11
        return 200
      })
      .attr('y', (d, i) => i * 200 + 100)
      .attr('text-anchor', 'middle')
      .style('fill', '#97909e')
    // const leaf = svg
    //   .selectAll('g')
    //   .data(data)
    //   .join('g')
    //   .attr('transform', (d, i) => `translate(${i * 200})`)

    // // let g = svg

    // //   .selectAll(null)
    // //   .data(data)
    // //   .enter()
    // //   .append('g')

    // //   .attr('transform', (value, index) => 'translate(' + index * 200 + ')')

    // leaf
    //   .append('circle')
    //   .attr('r', (value) => value)
    //   // .attr('cx', 200)
    //   // .attr('cy', (value, i) => i * 200)
    //   ///assign colors
    //   .style('fill', function (d, i) {
    //     return colors[i]
    //   })
    // leaf
    //   .append('text')

    //   .text((v, i) => emotions[i])
    //   // .attr('cx', 200)
    //   .attr('x', 200)
    //   // .attr('cy', (value, i) => i * 200)
    //   .attr('y', (d, i) => i * 200)
  }, [props.data.map((value) => value * 1000)])
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
    </React.Fragment>
  )
}

export default BubbleChart
