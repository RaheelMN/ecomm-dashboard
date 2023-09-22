import React, { useEffect, useState } from "react";
import Table from "./Table";
import Header from "./Header";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  
  const history = useHistory();
  useEffect(() => {
      getData();
  }, []);

  const getData = async () => {
    const response = await fetch("http://localhost:8000/getUsers");
    const json = await response.json();
    console.log(json);
    setUsers(json);
  };

  return (
    <>
      <Header />
      {users.length > 0 ? (
        <Table users={users} />
      ) : (
        <div>users do not exits</div>
      )}
      <div>Home</div>
    </>
  );
};

export default Home;
