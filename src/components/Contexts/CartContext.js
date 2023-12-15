import React from "react";

const CartContext = React.createContext({
items:[],
addItem:(items)=>{},
removeItem:(id)=>{},
total:0,
}) 
export default CartContext