import firestore from "./../../firebase/firestore";

const initState = {
  orderOfInternshipBlocks: [],
};

const orderOfInternshipBlocksRed = (state = initState, action) => {
  if (action.type === "ADD_ORDER_OF_INTERNSHIP_BLOCK") {
    let newOrderOfInternshipBlocks = [
      ...state.orderOfInternshipBlocks,
      action.newBlock,
    ];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
        orderOfInternshipBlocks: newOrderOfInternshipBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of internship blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfInternshipBlocks: newOrderOfInternshipBlocks,
    };
  } else if (action.type === "REMOVE_ORDER_OF_INTERNSHIP_BLOCK") {
    let newOrderOfInternshipBlocks = state.orderOfInternshipBlocks.filter(
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
        orderOfInternshipBlocks: newOrderOfInternshipBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of internship blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfInternshipBlocks: newOrderOfInternshipBlocks,
    };
  } else if (action.type === "UPDATE_ORDER_OF_INTERNSHIP_BLOCKS") {
    if (state.orderOfInternshipBlocks !== action.orderOfInternshipBlocks) {
      firestore
        .collection("users")
        .doc(action.uid)
        .collection("cvs")
        .doc(action.cvid)
        .update({
          updatedAt: new Date(),
          orderOfInternshipBlocks: action.orderOfInternshipBlocks,
        })
        .then(() =>
          console.log(
            "update date and time.\nupdate order of internship blocks"
          )
        )
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      ...state,
      orderOfInternshipBlocks: action.orderOfInternshipBlocks,
    };
  } else if (action.type === "LOAD_ORDER_OF_INTERNSHIP_BLOCKS") {
    return {
      ...state,
      orderOfInternshipBlocks: action.orderOfInternshipBlocks,
    };
  }

  return state;
};

export default orderOfInternshipBlocksRed;
