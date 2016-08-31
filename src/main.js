import ReactMapD3 from './ReactMapD3';
import React from 'react';
import ReactDOM from 'react-dom';

let empty = () => {}

class ReactMap extends React.Component {
  render () {
    let boundClick = this.handleClick.bind(this);
    return <div className="map-container" onClick={boundClick}></div>;
  }

  componentDidMount () {
    this.map = new ReactMapD3(this.getDOMNode(), this.getChartState());
  }

  componentDidUpdate () {
    this.map.update(this.getDOMNode(), this.getChartState());
  }

  getChartState () {
    return {
      data: this.props.data,
      onClick: this.props.onClick || empty
    }
  }

  componentWillUnmount () {
    this.map.destroy(this.getDOMNode());
  }

  getDOMNode () {
    return ReactDOM.findDOMNode(this);
  }

  handleClick() {
    this.map.update(this.getDOMNode(), {width: 2000, height: 1000});
  }
}
var rootElement = document.getElementById('mymap');
ReactDOM.render(<ReactMap />, rootElement);
