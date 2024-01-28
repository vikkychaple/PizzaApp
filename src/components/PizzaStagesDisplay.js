
import React from 'react';
import { connect } from 'react-redux';
import { moveOrder } from '../redux/actions';
import './PizzaStagesDisplay.css'; 

const PizzaStagesDisplay = ({ orders, moveOrder }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes} min ${seconds} sec`;
  };

  const calculateTotalTime = (stage) => {
    const currentTime = Date.now();
    const filteredOrders = orders.filter((order) => order.stage === stage && order.timestamp);
    if (filteredOrders.length === 0) {
        return '0 min 0 sec'; 
      }
    
   
    const totalTime = filteredOrders.reduce((total, order) => {
      const timeElapsed = ((currentTime - order.timestamp) / 1000) || 0;
      return total + timeElapsed;
    }, 0);

    return formatTime(totalTime);
  };

  const isOverdue = (order) => {
    const currentTime = Date.now();
    const timeElapsed = (currentTime - order.timestamp) / 1000; 
    return timeElapsed > 180; 
  };

  const renderOrders = () => {
    if (orders.length === 0) {
      return <p>No orders available.</p>;
    }

    return orders.map((order) => (
      <div
        key={order.id}
        className={`order-card ${isOverdue(order) ? 'overdue' : ''}`}
      >
        <p>Order Id: {order.id}</p>
        <p>Stage: {order.stage}</p>
        <p>Total time spent: {formatTime((Date.now() - order.timestamp) / 1000)}</p>
       
        {order.stage !== 'Order Placed' && (
          <p>Time in {order.stage}: {calculateTotalTime(order.stage)}</p>
        )}
        <button onClick={() => moveOrder(order.id, 'CANCEL')}>Cancel</button>
        {order.stage === 'Order Placed' && (
          <button onClick={() => moveOrder(order.id, 'IN_MAKING')}>Start Making</button>
        )}
        {order.stage === 'Order In Making' && (
          <>
            <button onClick={() => moveOrder(order.id, 'READY')}>Order Ready</button>
            <button onClick={() => moveOrder(order.id, 'CANCEL')}>Cancel</button>
          </>
        )}
        {order.stage === 'Order Ready' && (
          <>
            <button onClick={() => moveOrder(order.id, 'PICKED')}>Order Picked</button>
            <button onClick={() => moveOrder(order.id, 'CANCEL')}>Cancel</button>
          </>
        )}
        {order.stage === 'Order Picked' && (
          <button onClick={() => moveOrder(order.id, 'CANCEL')}>Cancel</button>
        )}
      </div>
    ));
  };

  const calculateTotalDeliveredToday = () => {
    const today = new Date().toLocaleDateString();
    const deliveredToday = orders.filter(
      (order) => order.stage === 'Order Picked' && order.deliveryDate === today
    );
    return deliveredToday.length;
  };

  return (
    <div>
      <h2>Pizza Orders in Progress</h2>
      <div className="order-container">{renderOrders()}</div>
      <h2>Total Orders Delivered Today: {calculateTotalDeliveredToday()}</h2>
      <h2>Total Time in Order In Making: {calculateTotalTime('Order In Making')}</h2>
      <h2>Total Time in Order Ready: {calculateTotalTime('Order Ready')}</h2>
      <h2>Total Time in Order Picked: {calculateTotalTime('Order Picked')}</h2>
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
    moveOrder: (orderId, nextStage) => dispatch(moveOrder(orderId, nextStage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaStagesDisplay);
