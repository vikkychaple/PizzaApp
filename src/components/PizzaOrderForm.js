
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { placeOrder } from '../redux/actions';

const PizzaOrderForm = ({ placeOrder, orders }) => {
  const [orderType, setOrderType] = useState('Veg');
  const [orderSize, setOrderSize] = useState('Large');
  const [orderBase, setOrderBase] = useState('Thin');

  const maxOrders = 10; 

  const handlePlaceOrder = () => {
 
    if (orders.length >= maxOrders) {
      alert('Not taking any order for now. Maximum limit reached.');
      return;
    }

    const order = {
      id: new Date().getTime(), 
      type: orderType,
      size: orderSize,
      base: orderBase,
      stage: 'Order Placed',
      totalTime: 0,
    };

  
    placeOrder(order);

  
    setOrderType('Veg');
    setOrderSize('Large');
    setOrderBase('Thin');
  };

  return (
    <div className="form-container">
      <h2>Pizza Order Form</h2>
      <form>
        <label>
          Order Type:
          <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </label>
        <br/>
        <label>
          Order Size:
          <select value={orderSize} onChange={(e) => setOrderSize(e.target.value)}>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
        </label>
        <br/>
        <label>
          Order Base:
          <select value={orderBase} onChange={(e) => setOrderBase(e.target.value)}>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </label>
        <br/>
        <button type="button" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placeOrder: (order) => dispatch(placeOrder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaOrderForm);
