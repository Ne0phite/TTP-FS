import React from "react";
import axios from "axios";
const url = "https://ws-api.iextrading.com/1.0/last";
const socket = require("socket.io-client")(url);

// socket.on("connect", () => {
//   socket.emit("subscribe", "snap");
// });
// socket.on("message", message => console.log(JSON.parse(message).price));

class App extends React.Component {
  state = {
    input: "",
    name: "",
    price: ""
  };

  inputHandler = e => {
    e.preventDefault();
    this.setState({
      input: e.target.value
    });
  };

  getStockPrice = () => {
    console.log("fired", this.state.input);
    // let sym = this.state.input;
    socket.on("connect", () => {
      socket.emit("subscribe", "snap");
    });
    socket.on("message", message => console.log(JSON.parse(message).price));
  };

  render() {
    return (
      <div className="App">
        <p>Hello world</p>
        <input onChange={this.inputHandler} type="text" />
        <button onClick={this.getStockPrice}>Get Price</button>
        <p>{this.state.name ? this.state.name : null}</p>
        <p>{this.state.price ? this.state.price : null}</p>
      </div>
    );
  }
}

export default App;
