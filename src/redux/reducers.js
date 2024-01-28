
const initialState = {
    orders: [],
  };
  const updateOrderStage = (orders, orderId, nextStage) => {
    return orders.map((order) =>
      order.id === orderId ? { ...order, stage: nextStage, timestamp: Date.now() } : order
    );
  };
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'PLACE_ORDER':
        return {
          ...state,
          orders: [...state.orders, action.payload],
        };
  
      case 'CANCEL_ORDER':
        return {
          ...state,
          orders: state.orders.filter((order) => order.id !== action.payload),
        };
  
      case 'MOVE_ORDER':
       
        const { orderId, nextStage } = action.payload;
        return {
          ...state,
          orders: updateOrderStage(state.orders, orderId, nextStage),
        };
       
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  