import { Redirect, useHistory, useParams } from "react-router-dom";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Updateproduct = (props) => {
  const { id } = useParams();
  const [pname, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [imagePath,setImagePath]=useState("")
  const [imageFile,setimageFile]=useState('')
  const [nameErr, setNameErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [imageErr,setImageErr]=useState('')
  const imageRef=useRef();  
  const history = useHistory();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    const getProductAPI = async () => {
      const response = await fetch(
        `http://localhost:8000/api/getProduct/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setname(data.name)
      setdesc(data.description)
      setprice(data.price)
      setImagePath(data.file_path)

    };
    getProductAPI();
  };

  const updateProductFunc = ()=>{

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

      //check price input field
      if(!price){
        errFlag = true;
        setPriceErr('Enter price')
      }else{setPriceErr('')}

      if(!errFlag){

          const formData = new FormData()
          formData.append('id',id)
          if(imageFile != ''){
            formData.append('image',imageFile)
          }
          formData.append('name',pname)
          formData.append('description',desc)
          formData.append('price',price)

          const url = 'http://localhost:8000/api/updateProduct'
          const obj = {
              method: 'POST',
              body: formData
            }

            const updateProductAPI =async ()=>{
              const response = await fetch(url,obj)
              const result = await response.json()
              console.log(result)
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
                  toast.success(result.message)
                  history.push("/");
              }
            }

            updateProductAPI()
    }    
  }

  return (
    <>
      <Header />
      <div className="col-sm-6 offset-3">
        <h3 className="pt-3 text-center">Update Product</h3>
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
          <div>Image</div>
          <img name="image" id="image" style={{height:"200px",width:"100%",objectFit:"contain"}}
            src={`http://localhost:8000/${imagePath}`}
            alt="image"
          />
        </div>        
        <div className="pt-3">
          <label className="" htmlFor="imageFile">
            Choose Image
          </label>
          <input
            ref={imageRef}
            className="form-control"
            type="file"
            onChange={(e) => {setimageFile(e.target.files[0]);setImageErr('')}}
            name="imageFile"
            id="imageFile"
          />
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
            onChange={(e) =>  {setprice(e.target.value);setPriceErr('')}}
            value={price}
            type="number"
            name="price"
            id="price"
          />
          <p className="errorMsg">{priceErr}</p>
        </div>
        <div className="pt-3 text-center">
          <button
             onClick={updateProductFunc}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Updateproduct;
