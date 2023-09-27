import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/Register";
import Logins from "./components/Logins";
import Addproduct from "./components/Addproduct";
import Updateproduct from "./components/Updateproduct";
import Protected from "./components/Protected";
import ListProducts from "./components/ListProducts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Logins />
        </Route>
        <Route path="/home">
          <Protected Page={ListProducts} />
        </Route>
        <Route path="/add">
        <Protected Page={Addproduct} />
        </Route>
        <Route path="/update/:id">
        <Protected Page={Updateproduct} />
        </Route>
        <Route path="/">
        <Protected Page={ListProducts} />
        </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer position="bottom-center"/>
    </div>
  );
}

export default App;
