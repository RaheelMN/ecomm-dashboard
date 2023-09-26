import React, { useRef, useState } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

const Addproduct = () => {
  //initialize variables
  const [pname, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [price, setprice] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [imageFile,setimageFile]=useState('')
  const [imageErr,setImageErr]=useState('')
  const imageRef=useRef();

  const addProduct = () => {

      //Initialize error message
      let errFlag = false;

      //check name input field
      if(!pname){
        setNameErr('Enter product name')
        errFlag = true;
      }else{setNameErr('')}

      //check description input field
      if(!desc){
        errFlag = true;
        setDescErr('Enter description')
      }else{setDescErr('')}

      //check file input field
      if(!imageFile){
        errFlag = true;
        setImageErr('Choose image')
      }else{setImageErr('')}

      //check price input field
      if(!price){
        errFlag = true;
        setPriceErr('Enter price')
      }else{setPriceErr('')}

      if(!errFlag){

          const formData = new FormData()
          formData.append('image',imageFile)
          formData.append('name',pname)
          formData.append('description',desc)
          formData.append('price',price)

          const url = 'http://localhost:8000/api/addProduct'
          const obj = {
              method: 'POST',
              body: formData
            }

            const addProductAPI =async ()=>{
              const response = await fetch(url,obj)
              const result = await response.json()
              if(result.error){
                if (result.data.name) {
                  setNameErr(result.data.name[0]);
                }else{
                  setNameErr('')
                }
                if (result.data.image) {
                  setImageErr(result.data.image[0]);
                }else{
                  setImageErr('')
                }
                if (result.data.description) {
                  setDescErr(result.data.description[0]);
                }else{
                  setDescErr('')
                }
                if (result.data.price) {
                  setPriceErr(result.data.price[0]);
                }else{
                  setPriceErr('')
                }                                                
              }else{
                  console.log(result)
                  setname('')
                  setimageFile('')
                  setdesc('')
                  setprice('')
                  imageRef.current.value=""
                  toast.success(result.message)
              }
            }

            addProductAPI()
    }
  };

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-3">
        <h3 className="pt-3 text-center">Add Product</h3>
        <div className="pt-3">
          <label className="" htmlFor="name">
            Name
          </label>
          <input
            className="form-control bg-white"
            onChange={(e) => {setname(e.target.value);setNameErr('')}}
            type="text"
            value={pname}
            name="name"
            id="name"
          />
          <p className="errorMsg">{nameErr}</p>
        </div>
        <div className="pt-3">
          <label className="" htmlFor="image">
            Image
          </label>
          <input  
            ref={imageRef} 
            className="form-control"
            type="file"
            onChange={(e) => {setimageFile(e.target.files[0]);setImageErr('')}}
            name="image"
            id="image"
          />
          <p className="errorMsg">{imageErr}</p>
        </div>
        <div className="pt-3">
          <label className="" htmlFor="desc">
            Description
          </label>
          <input
            className="form-control"
            onChange={(e) => {setdesc(e.target.value);setDescErr('')}}
            value={desc}
            type="text"
            name="desc"
            id="desc"
          />
          <p className="errorMsg">{descErr}</p>
        </div>
        <div className="pt-3">
          <label className="" htmlFor="price">
            Price
          </label>
          <input
            className="form-control"
            onChange={(e) => {setprice(e.target.value);setPriceErr('')}}
            value={price}
            type="number"
            name="price"
            id="price"
          />
          <p className="errorMsg">{priceErr}</p>
        </div>
        <div className="pt-3 text-center">
          <button onClick={addProduct} className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
