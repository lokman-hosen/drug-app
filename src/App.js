import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./components/home/home";
import Branch from "./components/branch/branch";
import Navbar from "./components/header/navbar";
import BranchCreate from "./components/branch/create";
import BranchEdit from "./components/branch/edit";
import AlertMessage from "./components/alertMessage";

function App() {
  return (
    <div className="App">
        <Navbar />
        <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/institute" component={Branch} exact />
        <Route path="/institute/create" component={BranchCreate} exact />
        <Route path="/institute/:id/edit" component={BranchEdit} exact />
      </Switch>
    </div>
  );
}

export default App;
