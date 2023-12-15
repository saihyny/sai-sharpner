import Clasess from "./HeaderBill.module.css";
import React,{useContext} from "react";
import DescriptionContext from "../Contexts/DescripionContext";
const HeaderBill = (props)=>{
  const DesContext = useContext(DescriptionContext)
const total = DesContext.Quantity;
    return (
        <button className={Clasess.button} onClick={props.show} >
      <span className={Clasess.icon}>
      </span>
      <span>{total}</span>
      <span>your Bill</span>
     
    </button>
    )

}
export default HeaderBill;