import firestore from "./../../firebase/firestore";

const initState = {
  orderOfPositionBlocks: [],
};

const orderOfPositionBlocksRed = (state = initState, action) => {
  if (action.type === "ADD_ORDER_OF_POSITION_BLOCK") {
    let newOrderOfPositionBlocks = [
      ...state.orderOfPositionBlocks,
      action.newBlock,
    ];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
        orderOfPositionBlocks: newOrderOfPositionBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of position blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfPositionBlocks: newOrderOfPositionBlocks,
    };
  } else if (action.type === "REMOVE_ORDER_OF_POSITION_BLOCK") {
    let newOrderOfPositionBlocks = state.orderOfPositionBlocks.filter(
      (value, index) => {
        return value.id !== action.id;
      }
    );
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
        orderOfPositionBlocks: newOrderOfPositionBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of position blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfPositionBlocks: newOrderOfPositionBlocks,
    };
  } else if (action.type === "UPDATE_ORDER_OF_POSITION_BLOCKS") {
    if (state.orderOfPositionBlocks !== action.orderOfPositionBlocks) {
      firestore
        .collection("users")
        .doc(action.uid)
        .collection("cvs")
        .doc(action.cvid)
        .update({
          updatedAt: new Date(),
          orderOfPositionBlocks: action.orderOfPositionBlocks,
        })
        .then(() =>
          console.log("update date and time.\nupdate order of position blocks")
        )
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      ...state,
      orderOfPositionBlocks: action.orderOfPositionBlocks,
    };
  } else if (action.type === "LOAD_ORDER_OF_POSITION_BLOCKS") {
    return {
      ...state,
      orderOfPositionBlocks: action.orderOfPositionBlocks,
    };
  }

  return state;
};

export default orderOfPositionBlocksRed;
