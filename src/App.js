import React from "react";
import "./App.css";
import Pong from "./Pong";
import Snake from "./Snake";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route path="/snake" component={Snake} />
        <Route path="/pong" component={Pong} />
        <Link to="/snake">
          <button>SNAKE</button>
        </Link>

        <Link to="/pong">
          <button>PONG</button>
        </Link>
      </Router>
    </div>
  );
}

export default App;
