import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Paolo Nuitini', uv: 69
  },
  {
    name: 'David Gray', uv: 65
  },
  {
    name: 'Bright Eyes', uv: 63
  },
  {
    name: 'Drake', uv: 99
  },
  {
    name: 'Sara Bareilles', uv: 74
  },
  {
    name: 'Queen', uv: 92
  }
];

const gradientOffset = () => {
  const dataMax = Math.max(...data.map(i => i.uv));
  const dataMin = Math.min(...data.map(i => i.uv));

  if (dataMax <= 0) {
    return 0;
  }
  if (dataMin >= 0) {
    return 1;
  }

  return dataMax / (dataMax - dataMin);
};

const off = gradientOffset();

export default class StreamGraph extends PureComponent {
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/64v6ocdx/';

  render() {
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="green" stopOpacity={1} />
            <stop offset={off} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" />
      </AreaChart>
    );
  }
}
