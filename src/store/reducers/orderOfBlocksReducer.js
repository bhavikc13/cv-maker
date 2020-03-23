const initState = {
  orderOfBlocks: null
};

const orderOfBlocks = (state = initState, action) => {
  if (action.type === "UPDATE_ORDER_OF_BLOCKS") {
    return {
      ...state,
      orderOfBlocks: action.orderOfBlocks
    };
  }

  return state;
};

export default orderOfBlocks;
