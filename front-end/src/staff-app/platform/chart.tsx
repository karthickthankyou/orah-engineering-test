import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import { getBgColor } from "staff-app/components/roll-state/roll-state-icon.component"
import styled from "styled-components"

type DataType = {
  present: number
  absent: number
  late: number
  unmark: number
}

export const drawChart = (element: React.RefObject<HTMLDivElement>["current"], data: DataType) => {
  const dataArr = Object.entries(data).map(([key, value]) => ({ key, value }))

  const boxSize = 400

  d3.select(element).select("svg").remove() // Remove the old svg
  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`)

  const arcGenerator = d3.arc().cornerRadius(10).padAngle(0.02).innerRadius(160).outerRadius(200)

  // @ts-ignore. Need more understanding on feeding whole data into generator functions.
  const pieGenerator = d3.pie().value((d) => d.value)
  // @ts-ignore
  const arcs = svg.selectAll().data(pieGenerator(dataArr)).enter()

  arcs
    .append("path")
    // @ts-ignore
    .attr("d", arcGenerator)
    .style("fill", (d, i) => {
      // @ts-ignore
      return getBgColor(d.data.key)
    })
}

const DonutChart = ({ data }: { data: DataType }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      drawChart(ref.current, data)
    }
  }, [ref, data])

  return <S.Square100 ref={ref} />
}

const S = {
  Square100: styled.div`
    height: 100px;
    width: 100px;
  `,
}

export default React.memo(DonutChart)
