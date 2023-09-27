import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import {AiOutlineSearch} from 'react-icons/ai'
import "./header.css"
const Header = ({ishome,setProducts}) => {
  const history = useHistory();
  let userName = "";
  let islocalStorage = false;

  if (localStorage.getItem("user-info")) {
    islocalStorage = true;
    const obj = JSON.parse(localStorage.getItem("user-info"));
    console.log("localstorg" + obj.name);
    userName = obj.name;
  }
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const getProducts = async (searchTerm) => {
    if(searchTerm !== ''){
      const response = await fetch(`http://localhost:8000/api/searchProduct/${searchTerm}`);
      const json = await response.json();
      setProducts(json);
    }else{
      const response = await fetch("http://localhost:8000/api/viewProducts");
      const json = await response.json();
      setProducts(json);      
    }
  };


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Fast77</Navbar.Brand>
        <Nav className="me-auto navbar_wrapper">
          {islocalStorage ? (
            <>
              <NavLink to="/home" activeClassName="selected">Home</NavLink>
              <NavLink to="/add" activeClassName="selected">Add Product</NavLink>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </Nav>
        <Nav className="align-items-center">
          {ishome?
          <div className="search-bar">
          <AiOutlineSearch className="search-icon"/>
          <input onChange={(e)=>getProducts(e.target.value)} className="form_control" style={{borderWidth:0,backgroundColor:"transparent",marginLeft:"5px"}} type="text" name="" id="" placeholder="Search product"/>
          </div>:null}
          {islocalStorage ? (
            <NavDropdown title={userName}>
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : null}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
