import React, { Component } from 'react'
// import rough from 'roughjs'
import { LineSeries, Tooltip, ChartProvider, XAxis, YAxis } from 'rough-charts'
import ReactRough, { Rectangle, Path, Circle } from 'react-rough'

const data = [
  { name: 'A', value1: 30, value2: 35 },
  { name: 'B', value1: 90, value2: 17 },
  { name: 'C', value1: 50, value2: 23 },
  { name: 'D', value1: 40, value2: 15 },
  { name: 'E', value1: 70, value2: 39 },
  { name: 'G', value1: 30, value2: 25 },
  { name: 'H', value1: 100, value2: 31 },
  { name: 'I', value1: 110, value2: 32 },
]
const colors = ['#815c94', '', '', '#66c18c']

class RoughIndex extends Component {
  render () {
    return (
      <div className="hello-body">
        {/* Chart */}
        <ChartProvider
          height={400}
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <LineSeries
            dataKey="value1"
            options={{
              stroke: colors[0],
              strokeWidth: 2,
            }}
          />
          <LineSeries
            dataKey="value2"
            options={{
              stroke: colors[3],
              strokeWidth: 2,
            }}
          />
          <Tooltip />
        </ChartProvider>
        {/* Rectangle */}
        <ReactRough>
          <Rectangle x={15} y={15} width={90} height={80} fill="red" />
        </ReactRough>
        {/* Car */}
        <ReactRough
          config={{
            options: {
              roughness: 0
            }
          }}
          height={300}
          renderer="canvas"
          width={300}
        >
          <Path d="M234.4,182.8c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4C240.8,185.6,238,182.8,234.4,182.8z" />
          <Circle
            diameter={2.8}
            x={234.4}
            y={189.2}
          />
          <Path d="M263,182.8c-3.5,0-6.4,2.9-6.4,6.4c0,3.5,2.9,6.4,6.4,6.4c3.5,0,6.4-2.9,6.4-6.4C269.4,185.6,266.6,182.8,263,182.8z" />
          <Circle
            diameter={2.8}
            x={263}
            y={189.2}
          />
          <Path
            d="M275,171.4c-2.8-0.7-5.2-3-6.3-5.1l-3.9-7.4c-1.1-2.1-3.9-3.8-6.3-3.8h-22.6c-2.4,0-5,1.8-5.7,4.1l-2.4,7
                c-0.2,0.9-1.8,5.5-5,5.5c-2.4,0-5,3.1-5,5.5v8.2c0,2.4,1.9,4.3,4.3,4.3h4.5c0-0.2,0-0.3,0-0.5c0-4.3,3.5-7.8,7.8-7.8
                c4.3,0,7.8,3.5,7.8,7.8c0,0.2,0,0.3,0,0.5h13.1c0-0.2,0-0.3,0-0.5c0-4.3,3.5-7.8,7.8-7.8s7.8,3.5,7.8,7.8c0,0.2,0,0.3,0,0.5h8.1
                c2.4,0,4.3-1.9,4.3-4.3v-6.5C283.2,172,277.3,172,275,171.4z"
          />
          <Path d="M241.8,170.3h-12.5c0.7-1.1,1.1-2.2,1.2-2.6l2-5.9c0.6-1.9,2.8-3.5,4.8-3.5h4.5V170.3z" />
          <Path d="M246.1,170.3v-12h10.4c2,0,4.4,1.5,5.3,3.3l3.3,6.3c0.4,0.8,1.1,1.7,2,2.4H246.1z" />
        </ReactRough>
      </div>
    )
  }
}

export default RoughIndex
