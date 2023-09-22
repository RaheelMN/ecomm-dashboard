import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./components/Register";
import Logins from "./components/Logins";
import Addproduct from "./components/Addproduct";
import Updateproduct from "./components/Updateproduct";
import Home from "./components/Home";
import DefaultPath from "./components/DefaultPath";
import Protected from "./components/Protected";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/"}>
          <DefaultPath />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Logins />
        </Route>
        <Route path="/home">
          <Protected Page={Home} />
        </Route>
        <Route path="/add">
        <Protected Page={Addproduct} />
        </Route>
        <Route path="/update">
        <Protected Page={Updateproduct} />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
