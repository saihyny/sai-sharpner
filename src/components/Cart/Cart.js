import classes from "./Cart.module.css";
import Modal from "./Modal";
import "./../Description.css";
import React, { useContext } from "react";
import CartContext from "../Contexts/CartContext";
const Cart = (props) => {
  const crtContext = useContext(CartContext);
  const total = crtContext.total;
 
  const cartItems = <ul>
    {
        crtContext.items.map((item)=>(
            <div >
            <li key={item.id} >
              <h5 className="item">{item.MedicinName}</h5>
              <h5 className="item">{item.Description}</h5>
              <h5 className="item">{item.Price}</h5>
              <h5 className="item">{item.Quan}</h5>
            </li>
          </div>
        ))
    }
  </ul>;

  return (
    <Modal close={props.close}>
        <div>
        <form className="form">
        <h5 className="item">Medicine Name</h5>
        <h5 className="item">Description</h5>
        <h5 className="item">Price</h5>
        <h5 className="item">Quantity</h5>
      </form>
      {cartItems}
      
        
     
      <div className={classes.actions}>
      <span>total</span>
            <span>{total}</span>
        < button className={classes.button}>Order</button>
        <button className={classes["button--alt"]} onClick={props.close}>
          close
        </button>
      </div>
      </div>
    </Modal>
  );
};

export default Cart;
