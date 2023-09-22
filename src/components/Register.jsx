import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/home");
    }
  });

  const sendData = () => {
    const postobj = {
      name,
      email,
      password,
    };
    console.warn(postobj);

    const json = JSON.stringify(postobj);

    const url = "http://localhost:8000/api/register";
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    };

    const registerAPI = async () => {
      const response = await fetch(url, obj);
      const result = await response.json();
      if (result.error) {
        if (result.data.name) {
          setNameErr(result.data.name[0]);
        }else{
          setNameErr('')
        }
        if (result.data.email) {
          setEmailErr(result.data.email[0]);
        }
        else{
          setEmailErr('')
        }
        if (result.data.password) {
          setPasswordErr(result.data.password[0]);
        }else{
          setPasswordErr('')
        }
      }else{
        localStorage.setItem('user-info',JSON.stringify(result.data))
        history.push('/home')
      }
    };

    registerAPI();
  };

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-sm-3 ">
        <h2 className="pt-3 text-center">Register</h2>
        <div className="py-3">
          <label className="text-primary" htmlFor="name">
            Name:
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control"
            type="text"
            id="name"
            name="name"
            required
          />
          <p className="errorMsg">{nameErr}</p>
        </div>
        <div className="py-3">
          <label htmlFor="name">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-control"
            type="email"
            id="email"
            name="email"
          />
          <p className="errorMsg">{emailErr}</p>
        </div>
        <div className="py-3">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-control"
            type="password"
            id="password"
            name="password"
            required
          />
          <p className="errorMsg">{passwordErr}</p>
        </div>
        <div className="py-3 d-flex justify-content-center">
          <button onClick={sendData} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
