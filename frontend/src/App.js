import React from "react";
import axios from "axios";
import io from "socket.io-client";
// const url = "https://ws-api.iextrading.com/1.0/tops";
// const socket = io(url);

// socket.emit("subscribe", "tsla");
// socket.on("message", message => console.log(JSON.parse(message)));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockList: {}
    };

    this.socket = io("https://ws-api.iextrading.com/1.0/tops");
    this.socket.on("connect", () => {
      console.log("connected to the iex trading");
    });
    this.socket.on("message", message => {
      let parsed = JSON.parse(message);
      let obj = this.state.stockList;
      obj[parsed["symbol"]] = parsed;
      this.setState({
        stockList: obj
      });
    });
  }

  // ComponentDidMount = () => {
  //   socket.on("connect", () => {
  //     console.log("connected to the iex trading");
  //   });
  //   socket.emit("subscribe", "tsla");
  //
  //   socket.on("message", message => {
  // let parsed = JSON.parse(message);
  // let obj = this.state.stockLIst;
  // obj[parsed["symbol"]] = parsed;
  // this.setState({
  //   stockLIst: obj
  // });
  //   });
  // const url = "https://ws-api.iextrading.com/1.0/tops";
  // const socket = io(url);
  // socket.on("connect", () => {
  //   // socket.emit("subscribe", "snap,fb,tsla");
  //   console.log("connected to the iex trading");
  // });
  // socket.emit("subscribe", "snap,fb,tsla");

  inputHandler = e => {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  };

  addStockToList = async => {
    let sym = this.state.input;
    this.setState({
      input: ""
    });
    // console.log(sym);
    this.socket.emit("subscribe", `${sym}`);
  };

  displayStockPrices = () => {
    let stockObj = this.state.stockList;
    let tickerList = Object.keys(this.state.stockList);
    let tickersAndPrices = tickerList.map((ticker, idx) => {
      return (
        <li key={idx}>
          Ticker: {ticker}, Price: {stockObj[ticker]["lastSalePrice"]}
        </li>
      );
      // debugger;
    });
    return tickersAndPrices;
  };

  render() {
    let { stockList } = this.state;
    console.log("state ", stockList);
    return (
      <div className="App">
        <p>Hello world</p>
        <input onChange={this.inputHandler} type="text" />
        <button onClick={this.addStockToList}>Add Stock</button>
        <p>{this.state.input}</p>
        <ul>{this.displayStockPrices()}</ul>
      </div>
    );
  }
}

export default App;
