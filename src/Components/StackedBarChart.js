import { select, scaleBand, scaleLinear, axisBottom, stack, max, create, axisLeft, stackOrderAscending, zoom } from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import { isCompositeComponent } from 'react-dom/test-utils'
import useResizeObserver from './useResizeObserver'

const keys = [
  "anger",
  "disgust",
  "fear",
  "joy",
  "sadness",
  "surprise"]
const colors = {
  anger: "rgba(255, 99, 132, 1)",
  disgust: "rgba(255, 159, 64, 1)",
  sadness: "rgba(54, 162, 235, 1)",
  fear: "rgba(75, 192, 192, 1)",
  surprise: "rgba(153, 102, 255, 1)",
  joy: "rgba(255, 206, 86, 1)"
}
const margin = ({ top: 10, right: 5, bottom: 0, left: 0 })



function StackedBarChart({ data, id = "zoomable-stacked-bar-chart" }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // const [data, setReportData] = useState(reportData)

  useEffect(() => {
    const svg = select(svgRef.current)
    const svgContent = svg.select(".content")
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    //Stacks and layers
    const stackGenerator = stack()
      .keys(keys)
      .order(stackOrderAscending)
    const layers = stackGenerator(data)
    const extent = [
      0,
      max(layers, layer =>
        max(layer, sequence =>
          sequence[1]))]

    //Scales
    const xScale = scaleBand()
      .domain(data.map(d => d.created_at.toDateString()))
      .range([margin.left, width - margin.right])
      .padding(0.15)

    const yScale = scaleLinear()
      .domain(extent)
      .range([height - margin.bottom, margin.top])

    //Rendering
    svgContent
      .attr("viewBox", [0, 0, width, height])
      .call(chartZoom)
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", layer => colors[layer.key])
      .selectAll("rect")
      .data(layer => layer)
      .join("rect")
      .attr("x", sequence => {
        return xScale(sequence.data.created_at.toDateString())
      })
      .attr("width", xScale.bandwidth())
      .attr("y", sequence => yScale(sequence[1]))
      .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]))

    //Axes
    const xAxis = axisBottom(xScale)
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)

    const yAxis = axisLeft(yScale)
    svg
      .select(".y-axis")
      .call(yAxis)


    //////////// Zoom behavior ///////////
    function chartZoom(svg) {
      const newExtent = [[margin.left, margin.top], [width - margin.right, height - margin.top]]

      svg.call(
        zoom()
          .scaleExtent([1, 8])
          .translateExtent(newExtent)
          .extent(newExtent)
          .on("zoom", zoomed));

      function zoomed(event) {
        xScale.range([margin.left, width - margin.right].map(d => {
          return event.transform.applyX(d)
        }));
        svg
          .selectAll(".layer rect").attr("x", d => {
            return xScale(d.data.created_at.toDateString())
          })
          .attr("width", xScale.bandwidth());
        svg
          .selectAll(".x-axis").call(xAxis);
      }
    }

    svg.call(chartZoom)

  }, [colors, dimensions, keys, data])

  return (
    <React.Fragment>
      <div ref={wrapperRef} style={{ marginBottom: '2rem' }}>
        <svg ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="100%" height="100%" />
            </clipPath>
          </defs>
          <g className="content" clipPath={`url(#${id})`} />
          <g className="x-axis" clipPath={`url(#${id})`} />
          <g className="y-axis" />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default StackedBarChart