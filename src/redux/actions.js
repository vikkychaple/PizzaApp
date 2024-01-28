
export const placeOrder = (order) => {
    return {
      type: 'PLACE_ORDER',
      payload: order,
    };
  };
  
  export const cancelOrder = (orderId) => {
    return {
      type: 'CANCEL_ORDER',
      payload: orderId,
    };
  };
  
  export const moveOrder = (orderId, nextStage) => {
    return {
      type: 'MOVE_ORDER',
      payload: {
        orderId,
        nextStage,
      },
    };
  };
  