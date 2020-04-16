import firestore from "./../../firebase/firestore";

const initState = {
  orderOfHobbyBlocks: [],
};

const orderOfHobbyBlocksRed = (state = initState, action) => {
  if (action.type === "ADD_ORDER_OF_HOBBY_BLOCK") {
    let newOrderOfHobbyBlocks = [...state.orderOfHobbyBlocks, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
        orderOfHobbyBlocks: newOrderOfHobbyBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of hobby blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfHobbyBlocks: newOrderOfHobbyBlocks,
    };
  } else if (action.type === "REMOVE_ORDER_OF_HOBBY_BLOCK") {
    let newOrderOfHobbyBlocks = state.orderOfHobbyBlocks.filter(
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
        orderOfHobbyBlocks: newOrderOfHobbyBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of hobby blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfHobbyBlocks: newOrderOfHobbyBlocks,
    };
  } else if (action.type === "UPDATE_ORDER_OF_HOBBY_BLOCKS") {
    if (state.orderOfHobbyBlocks !== action.orderOfHobbyBlocks) {
      firestore
        .collection("users")
        .doc(action.uid)
        .collection("cvs")
        .doc(action.cvid)
        .update({
          updatedAt: new Date(),
          orderOfHobbyBlocks: action.orderOfHobbyBlocks,
        })
        .then(() =>
          console.log("update date and time.\nupdate order of hobby blocks")
        )
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      ...state,
      orderOfHobbyBlocks: action.orderOfHobbyBlocks,
    };
  } else if (action.type === "LOAD_ORDER_OF_HOBBY_BLOCKS") {
    return {
      ...state,
      orderOfHobbyBlocks: action.orderOfHobbyBlocks,
    };
  }

  return state;
};

export default orderOfHobbyBlocksRed;
