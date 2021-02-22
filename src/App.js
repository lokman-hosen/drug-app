import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./components/home/home";
import Branch from "./components/branch/branch";
import Navbar from "./components/header/navbar";

function App() {
  return (
    <div className="App">
        <Navbar />
        <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/branch" component={Branch} exact />
      </Switch>
    </div>
  );
}

export default App;
