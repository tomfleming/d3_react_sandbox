import ReactMap from './ReactMap';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSelect from 'react-select';


class MySelect extends ReactSelect {
  constructor (props) {
    super(props);
    this.state = {value: props.value};
  }

  handleClick(val) {
    console.log(val);
    this.setState({value: val});
  }

  render() {
    let boundClick = this.handleClick.bind(this);
    return (
      <ReactSelect
        {...this.props}
        value={this.state.value}
        onChange={boundClick}>
      </ReactSelect>
    )
  }
}

class App extends React.Component {
  render () {
    let options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
    ];
    return (
      <div>
        <ReactMap mapfile="dist/us.json" width={500} />
        <MySelect
          name="form-field-name"
          value="one"
          options={options}
        />
      </div>
    )
  }
}

var rootElement = document.getElementById('mymap');
ReactDOM.render(<App />, rootElement);
