import React from 'react'
import TimeTicker from './TimeTicker'
import { Button, Glyphicon } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleTickerRemove = this.handleTickerRemove.bind(this);
    this.state = {
      tickers: [
        { offset: -3, id: "tt-1", key:1 },
        { offset: -4, id: "tt-2", key:2 },
        { offset: -4, id: "tt-3", key:3 },
        { offset:  6, id: "tt-4", key:4 },
        { offset: -2, id: "tt-5", key:5 },
        { offset: -4, id: "tt-6", key:6 }
      ]
    };
  }
  handleTickerRemove(e) {
    let tag = $(e.target).first().prop("tagName");
    let id;
    if (tag === 'BUTTON') {
      id = $(e.target.parentElement).attr('id');
    }else{
      id = $(e.target.parentElement).parent().attr('id');
    }
    this.setState((prevState, props) => {
      let newTickersState = prevState.tickers.filter((v,k) => {
        return v.id !== id;
      });
      prevState.tickers  = newTickersState;
      return prevState;
    });
  }
  render() {
    let tickers = this.state.tickers.map((ticker, key) => {
      return (
        <div key={ticker.key} id={ticker.id} ref={ticker.id}>
          <TimeTicker  id={ticker.id} offset={ticker.offset} />
          <Button onClick={this.handleTickerRemove}><Glyphicon glyph="remove-circle" /></Button>
        </div>
      )
    })
    return (
      <div className="container-fluid" id="app">
        {tickers}
      </div>
    )
  }
}

export default App
