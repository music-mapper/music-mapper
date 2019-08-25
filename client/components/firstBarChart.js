import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import {connect} from 'react-redux'
import {gotAllFeatures} from '../store'

const colors = scaleOrdinal(schemeCategory10).range();

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const {
    fill, x, y, width, height,
  } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

class BarGraph extends PureComponent {
  async componentDidMount(){
    try {
      await this.props.gotAllFeatures()

    } catch (error) {
      console.log('error in component did mount', error)

    }
  }

  render() {
    // console.log(this.props.features.data)
    if (this.props.features.data === undefined) {
      return [];
    }
    return (
      <BarChart
        width={1000}
        height={600}
        data={this.props.features.data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="rating" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {
            this.props.features.data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))
          }
        </Bar>
      </BarChart>
    );
  }
}

const mapStateToProps = (state) => ({
  features: state.audioFeatures.features
})

const mapDispatchToProps = (dispatch) => ({
  gotAllFeatures: () => dispatch(gotAllFeatures())
})

export default connect(mapStateToProps, mapDispatchToProps)(BarGraph)
