import "./Description.css";
import React, { useContext, useEffect, useState } from "react";
import DescriptionContext from "./Contexts/DescripionContext";
import Button from "./Contexts/Button/Button/Button";
import CartContext from "./Contexts/CartContext";

const Description = (props) => {
  const CRTcontext = useContext(CartContext);
  const [total,setTotal]=useState(0)
  const DesContext = useContext(DescriptionContext);
  
  if(CRTcontext.total<0 || CRTcontext.total==total){
   console.log('working')
    fetch(`https://crudcrud.com/api/7375dc97b7c14539b222b36cd8d8e25e/cartdetail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((Data) => {
        if (Data) {
          // console.log(Data[Data.length-1])
          if(DesContext.items.length>0){
            const GETdata= Data[Data.length-1].obj
            console.log(GETdata)
              GETdata.map((item)=>(
                CRTcontext.addItem(item)
              ))
          }
          
          }
        
      });
  }
  const RemoveFn = (itmeId, item,ID) => {
    DesContext.removeItem(itmeId, ID);
    CRTcontext.addItem(item)
  };

  let items = (
    <ul>
      {DesContext.items.map((item,index) => (
        <div>
          <li key={item.id}>
            <h5 className="item">{item.MedicinName}</h5>
            <h5 className="item">{item.Description}</h5>
            <h5 className="item">{item.Price}</h5>
            <h5 className="item">{item.Quantity}</h5>
          </li>
          <Button
            onClick={() => {
              RemoveFn(item.id, item,);
            }}
            disabled={item.Quantity === "OUT OF STOCK"}
          >
            Add
          </Button>
        </div>
      ))}
    </ul>
  );

  return (
    <div>
      <form className="form">
        <h3 className="item">Medicine Name</h3>
        <h3 className="item">Description</h3>
        <h3 className="item">Price</h3>
        <h3 className="item">Quantity</h3>
      </form>
      {items}
    </div>
  );
};
export default Description;
