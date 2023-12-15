import React, { useRef, useContext, useEffect } from "react";
import DescriptionContext from "./Contexts/DescripionContext";
import "./../App.css";

const Input = (props) => {
    const DesContext = useContext(DescriptionContext);
    const [idd,SetId] = React.useState(null)
//   const addItemMemoized = React.useMemo(() => data => DesContext.addItem(data), [data]);
useEffect(() => {
  fetch("https://crudcrud.com/api/7375dc97b7c14539b222b36cd8d8e25e/medicin", {
    method: "GET",
    headers:{
      "Content-Type": "application/json",
    }
  })
  .then(res => res.json())
  .then(Data => {
    if (Data) {
        if(DesContext.items.length===0 ){
            Data.map(item => (
                DesContext.addItem(item.obj,item._id),
                SetId(item._id)
                // console.log(item.obj)
                // setData(item.obj),
                //   addItemMemoized(data)
              ))
        }
    }
  });
});
// DesContext.addItem(data)

  const MedicinName = useRef();
  const Description = useRef();
  const Quantity = useRef();
  const Price = useRef();
  let information;

  const SubmitFn = (e) => {
    e.preventDefault();
    const Mname = MedicinName.current.value;
    const Descr = Description.current.value;
    const Quant = Quantity.current.value;
    const Pric = Price.current.value;
    const id = Math.random();
    const obj = {
      MedicinName: Mname,
      Description: Descr,
      Quantity: Quant,
      Price: Pric,
      id: id,
    };
    DesContext.addItem(obj,idd)
    fetch("https://crudcrud.com/api/7375dc97b7c14539b222b36cd8d8e25e/medicin", {
      method: "POST",
      body: JSON.stringify({
        obj: obj,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  };

  return (
    <div className="app">
      {information && information}
      <form onSubmit={SubmitFn}>
        <label>Medicin Name</label>
        <input ref={MedicinName} type="name"></input>
        <label>Description </label>
        <input ref={Description} type="name"></input>
        <label>Price</label>
        <input ref={Price} type="number"></input>
        <label>Quantity</label>
        <input ref={Quantity} type="number"></input>
        <button>Add to Product</button>
      </form>
    </div>
  );
};
export default Input;
