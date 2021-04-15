import { select } from 'd3'
import React, {useEffect, useRef} from 'react'
import useResizeObserver from './useResizeObserver'

function StackedBarChart({data, keys, colors}){
  const svfRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(()=> {
    const svg = select(svgRef.current)
    const {width, height} = 
    dimensions || wrapperRef.current.getBoundingClientRect()
  }, [colors, data, dimensions, keys])


  return(
    <React.Fragment>
      <div ref={wrapperRef} style={{marginBottom: '2rem'}}>
        <svg ref={svgRef}>
          <g className="x-axis"/>
          <g className="y-axis"/>
        </svg>
      </div>
    </React.Fragment>
  )
}