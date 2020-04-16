import firestore from "./../../firebase/firestore";

const initState = {
  orderOfAwardBlocks: [],
};

const orderOfAwardBlocksRed = (state = initState, action) => {
  if (action.type === "ADD_ORDER_OF_AWARD_BLOCK") {
    let newOrderOfAwardBlocks = [...state.orderOfAwardBlocks, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
        orderOfAwardBlocks: newOrderOfAwardBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of award blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfAwardBlocks: newOrderOfAwardBlocks,
    };
  } else if (action.type === "REMOVE_ORDER_OF_AWARD_BLOCK") {
    let newOrderOfAwardBlocks = state.orderOfAwardBlocks.filter(
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
        orderOfAwardBlocks: newOrderOfAwardBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of award blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfAwardBlocks: newOrderOfAwardBlocks,
    };
  } else if (action.type === "UPDATE_ORDER_OF_AWARD_BLOCKS") {
    if (state.orderOfAwardBlocks !== action.orderOfAwardBlocks) {
      firestore
        .collection("users")
        .doc(action.uid)
        .collection("cvs")
        .doc(action.cvid)
        .update({
          updatedAt: new Date(),
          orderOfAwardBlocks: action.orderOfAwardBlocks,
        })
        .then(() =>
          console.log("update date and time.\nupdate order of award blocks")
        )
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      ...state,
      orderOfAwardBlocks: action.orderOfAwardBlocks,
    };
  } else if (action.type === "LOAD_ORDER_OF_AWARD_BLOCKS") {
    return {
      ...state,
      orderOfAwardBlocks: action.orderOfAwardBlocks,
    };
  }

  return state;
};

export default orderOfAwardBlocksRed;
