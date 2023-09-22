import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useHistory } from "react-router-dom";

const Logins = () => {
  
  // Redirect host if he is not allowed to access page 
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/home");
    }
  });

  //initialize variables
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errEmail,setErrEmail]=useState('')
  const [errPass,setErrPass]=useState('')

  const loginUser=()=>{
    let errFlag = false;
    if(!email){
      setErrEmail('Enter Email')
      errFlag = true;
    }else{setErrEmail('')}

    if(!password){
      errFlag = true;
      setErrPass('Enter Password')
    }else{setErrPass('')}

    if(!errFlag){
      alert('you are logged in')
    }
  }


  return (
    <>
      <Header />
      <div className="col-sm-6 offset-3">
        <h3 className="pt-4 text-center">Login</h3>
        <div className="pt-4">
          <label className="" htmlFor="email">
            Email
          </label>
          <input className="form-control" onChange={(e)=>setEmail(e.target.value)} type="email" value={email} name="email" id="email" required />
          <p className="errorMsg">{errEmail}</p>
        </div>
        <div className="pt-4">
          <label className="" htmlFor="Password">
            Password
          </label>
          <input className="form-control"  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required name="password" id="password" />
          <p className="errorMsg">{errPass}</p>
        </div> 
        <div className="pt-4 text-center">
            <button onClick={loginUser} className="btn btn-primary">Submit</button>
        </div>               
      </div>
    </>
  );
};

export default Logins;
