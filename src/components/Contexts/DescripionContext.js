import React from "react";

const DescriptionContext = React.createContext({
    items:[],
    Quantity:0,
    addItem: (id) => {},
    removeItem:(id)=> {},
    Id:null,
})
export default DescriptionContext;