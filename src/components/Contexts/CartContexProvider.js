import React, { useReducer, useState } from "react";
import CartContext from "./CartContext";
import DescriptionContext from "./DescripionContext";
import { useContext } from "react";
const defaultState = {
  items: [],
  total: 0,
  id:null
};

const actionFun = (state, action) => {
  if (action.type === 'add') {
    let updatedItems;
    let updatedTotal;
    let updatedId;
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id );
    const existingCartItemItem = state.items[existingCartItemIndex]
     if(existingCartItemItem)
     {
        existingCartItemItem.Quan += 1;
        updatedTotal = state.total + Number(action.item.Price) * 1;
        updatedItems=state.items
        
     }else{
      const newItem={
            ...action.item,
            Quan:1,
        }
        updatedTotal=state.total+Number(action.item.Price)
        updatedItems=state.items.concat(newItem)
        
      fetch(
        "https://crudcrud.com/api/7375dc97b7c14539b222b36cd8d8e25e/cartdetail",
        {
          method: "POST",
          body: JSON.stringify({
          obj:updatedItems ,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res)=>res.json())
       .then((data)=>{
         console.log(data)
       })
     }
    return {
      items: updatedItems,
      total: updatedTotal,
      id:updatedId,
    };
  }

  return defaultState;
};

const CartContextProvider = (props) => {
  const DesContext = useContext(DescriptionContext)
  const [cartState, dispatchCartAction] = useReducer(actionFun, defaultState);
  
  const addItems = (item) => {
    dispatchCartAction({ type: 'add', item: item });
  };

  const removeItem = (id) => {
    // Implement remove item logic here
  };

  const cartContext = {
    items: cartState.items,
    addItem: addItems,
    removeItem: removeItem,
    total: cartState.total.toFixed(2),
    PayloadId:cartState.id,
  };


  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
