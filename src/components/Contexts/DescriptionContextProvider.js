import React, { useReducer, useState } from "react";
import DescriptionContext from "./DescripionContext";

const DefaultState = {
  items: [],
  Quantity:0,
};
const DesReducer = (state, action) => {
  if (action.type === "add") {
    let updateItems
    let updateQuan
    
    if(state.Quantity<1)
    {
         updateItems = state.items.concat(action.item);  
         updateQuan = action.item.Quantity
         
    }
    else{
        updateItems = state.items.concat(action.item);
         updateQuan = Number(state.Quantity) + Number(action.item.Quantity);
         
         
    }
    return {
      items: updateItems,
      Quantity: updateQuan,
    };
  }
  if (action.type === "remove") {
    const currentindex = state.items.findIndex((item) => item.id === action.id);
    let RealQuan;
   
   if (state.items[currentindex].Quantity > 1) {
      state.items[currentindex].Quantity--
      RealQuan=state.Quantity-1;
    }
    else if(state.items[currentindex].Quantity===1){
     
        state.items[currentindex].Quantity='OUT OF STOCK'
        RealQuan=state.Quantity
         
      }

    return {
      items: state.items,
      Quantity: RealQuan,
    };
  }
  return DefaultState;
};
const DesContextProvide = (props) => {
  const [DesState, DispatchDesFn] = useReducer(DesReducer, DefaultState);
  const [CurrenId,SetId]=useState([])
  const AddItemsFunction = (items) => {
    items &&  DispatchDesFn({ type: "add", item: items });
   
  };
  const RemoveItemFunction = (id,ID) => {
    ID &&  SetId(ID)
    console.log(ID)
    DispatchDesFn({ type: "remove", id: id });
  };
  
  const DesContext = {
    items: DesState.items,
    Quantity: DesState.Quantity,
    addItem: AddItemsFunction,
    removeItem: RemoveItemFunction,
    Id:CurrenId,
  };
  // console.log(DesContext.Quantity)

  return (
    <DescriptionContext.Provider value={DesContext}>
      {props.children}
    </DescriptionContext.Provider>
  );
};
export default DesContextProvide;