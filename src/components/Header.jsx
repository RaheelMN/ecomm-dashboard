import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
const Header = () => {
  const history = useHistory();
  let userName = "";
  let islocal = false;

  if (localStorage.getItem("user-info")) {
    islocal = true;
    const obj = JSON.parse(localStorage.getItem("user-info"));
    console.log("localstorg" + obj.name);
    userName = obj.name;
  }
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Fast77</Navbar.Brand>
        <Nav className="me-auto navbar_wrapper">
          {islocal ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/add">Add Product</Link>
              <Link to="/update">Update Product</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </Nav>
        <Nav>
          {islocal ? (
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
