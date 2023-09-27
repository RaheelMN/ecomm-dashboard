import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import {AiFillDelete} from "react-icons/ai"
import {FiEdit} from 'react-icons/fi'
import { Link } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const url = "http://localhost:8000/";

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await fetch("http://localhost:8000/api/viewProducts");
    const json = await response.json();
    setProducts(json);
  };

  const deleteProduct = (id) => {
    const deleteProductAPI = async () => {
      const response = await fetch(
        `http://localhost:8000/api/deleteProduct/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      toast.success(data.message)
      getProducts();
    };
    deleteProductAPI();
  };

  return (
    <div>
      <Header ishome={true} setProducts={setProducts} />
      <h4 className="text-center mt-4">Products table</h4>
      <Table striped bordered hover className="w-75 mx-auto mt-4 text-center">
        <thead>
          <tr className="align-items-center">
            <th>S.No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0
            ? products.map((product, i) => (
                <tr className="align-items-center" key={product.id}>
                  <td className="align-middle">{i+1}</td>
                  <td className="align-middle">{product.name}</td>
                  <td className="align-middle">{product.description}</td>
                  <td className="align-middle">{product.price}</td>
                  <td>
                    <img
                      style={{
                        height: "60px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                      src={url + product.file_path}
                    />
                  </td>
                  <td className="align-middle">
                    <Link to={`/update/${product.id}`}>                  
                      <FiEdit
                        role="button"
                        className="h5 text-primary"
                      ></FiEdit>
                    </Link>
                  </td>                  
                  <td className="align-middle">
                    <AiFillDelete
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                      role="button"
                      className="h4 text-danger"
                    ></AiFillDelete>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default ListProducts;
