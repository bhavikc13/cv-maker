import firestore from "./../../firebase/firestore";

const initState = {
  orderOfProjectBlocks: [],
};

const orderOfProjectBlocksRed = (state = initState, action) => {
  if (action.type === "ADD_ORDER_OF_PROJECT_BLOCK") {
    let newOrderOfProjectBlocks = [
      ...state.orderOfProjectBlocks,
      action.newBlock,
    ];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
        orderOfProjectBlocks: newOrderOfProjectBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of project blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfProjectBlocks: newOrderOfProjectBlocks,
    };
  } else if (action.type === "REMOVE_ORDER_OF_PROJECT_BLOCK") {
    let newOrderOfProjectBlocks = state.orderOfProjectBlocks.filter(
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
        orderOfProjectBlocks: newOrderOfProjectBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of project blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfProjectBlocks: newOrderOfProjectBlocks,
    };
  } else if (action.type === "UPDATE_ORDER_OF_PROJECT_BLOCKS") {
    if (state.orderOfProjectBlocks !== action.orderOfProjectBlocks) {
      firestore
        .collection("users")
        .doc(action.uid)
        .collection("cvs")
        .doc(action.cvid)
        .update({
          updatedAt: new Date(),
          orderOfProjectBlocks: action.orderOfProjectBlocks,
        })
        .then(() =>
          console.log("update date and time.\nupdate order of project blocks")
        )
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      ...state,
      orderOfProjectBlocks: action.orderOfProjectBlocks,
    };
  } else if (action.type === "LOAD_ORDER_OF_PROJECT_BLOCKS") {
    return {
      ...state,
      orderOfProjectBlocks: action.orderOfProjectBlocks,
    };
  }

  return state;
};

export default orderOfProjectBlocksRed;
