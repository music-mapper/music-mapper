const {PropTypes} = React;
const {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} = Recharts;

// body {
//   margin: 0;
// }
// #container {
//   -webkit-box-sizing: border-box;
//   -moz-box-sizing: border-box;
//   box-sizing: border-box;
//   padding: 10px;
//   width: 800px;
//   height: 800px;
//   background-color: #fff;
// }

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
const data = [
      {name: 'Page A', uv: 4000, female: 2400, male: 2400},
      {name: 'Page B', uv: 3000, female: 1398, male: 2210},
      {name: 'Page C', uv: 2000, female: 9800, male: 2290},
      {name: 'Page D', uv: 2780, female: 3908, male: 2000},
      {name: 'Page E', uv: 1890, female: 4800, male: 2181},
      {name: 'Page F', uv: 2390, female: 3800, male: 2500},
      {name: 'Page G', uv: 3490, female: 4300, male: 2100},
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill}/>;
