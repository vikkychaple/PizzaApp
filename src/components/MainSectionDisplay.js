
import React from 'react';
import { connect } from 'react-redux';
import { cancelOrder } from '../redux/actions'; 
const MainSectionDisplay = ({ orders }) => {
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes} min ${seconds} sec`;
  };

  const renderOrders = () => {
    if (orders.length === 0) {
      return <p>No orders available.</p>;
    }

    return orders.map((order) => (
      <div key={order.id} className="order-details">
        <p>Order Id: {order.id}</p>
        <p>Stage: {order.stage}</p>
        <p>Total time spent: {formatTime(order.totalTime)}</p>
        {order.stage !== 'Order Placed' && (
          <button onClick={() => cancelOrder(order.id)}>Cancel</button>
        )}
      </div>
    ));
  };

  const calculateTotalDelivered = () => {
    const deliveredOrders = orders.filter((order) => order.stage === 'Order Picked');
    return deliveredOrders.length;
  };

  return (
    <div>
      <h2>Main Section</h2>
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total time spent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderOrders()}
          <tr>
            <td colSpan="4">Total orders delivered: {calculateTotalDelivered()}</td>
          </tr>
        </tbody>
      </table>
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
    cancelOrder: (orderId) => dispatch(cancelOrder(orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainSectionDisplay);
