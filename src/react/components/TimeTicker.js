import React from "react";
import ReactDOM from "react-dom";
import { Label } from 'react-bootstrap';

class TimeTicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  mutateState() {
    this.setState({
      date: new Date()
    });
  }
  componentDidMount() {
    this.mutateState();

    this.tickerId = setInterval(() => {
      this.mutateState();
    }, 1);
  }
  componentWillUnmount() {
    clearInterval(this.tickerId);
  }
  render() {
    return (
        <TimeTickerFnkComponent
          offset={this.props.offset}
          date={this.state.date}
        />
    );
  }
}

function TimeTickerFnkComponent(props) {
  let date = props.date;
  let ts = [
    date.getHours() + props.offset || 0,
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  ].join(" ");
  return (
    <div>
      <h1>
        <Label key={props.key}>{props.offset}</Label>&nbsp;
        {ts}
      </h1>
    </div>
  );
}

export default TimeTicker;
