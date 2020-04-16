import firestore from "./../../../firebase/firestore";

const initState = {
  positionBlocks_1: [],
};

const positionRed_1 = (state = initState, action) => {
  if (action.type === "ADD_DUMMY_BLOCK_1") {
    let newBlocks = [...state.positionBlocks_1, action.dummyBlock];
    return {
      positionBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_DUMMY_BLOCK_1") {
    let newBlocks = state.positionBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    return {
      positionBlocks_1: newBlocks,
    };
  } else if (action.type === "ADD_POSITION_BLOCK_1") {
    let newBlocks = [...state.positionBlocks_1, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("position")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update position"))
      .catch((err) => {
        console.log(err);
      });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
      })
      .then(() => console.log("update date and time."))
      .catch((err) => {
        console.log(err);
      });
    return {
      positionBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_POSITION_INFORMATION_1") {
    let newBlocks = state.positionBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.information = action.information;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("position")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update position"))
      .catch((err) => {
        console.log(err);
      });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
      })
      .then(() => console.log("update date and time."))
      .catch((err) => {
        console.log(err);
      });
    return {
      positionBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_POSITION_BLOCK_1") {
    let newBlocks = state.positionBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("position")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update position"))
      .catch((err) => {
        console.log(err);
      });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
      })
      .then(() => console.log("update date and time."))
      .catch((err) => {
        console.log(err);
      });
    return {
      positionBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_ALL_POSITION_BLOCKS_1") {
    return {
      positionBlocks_1: [],
    };
  } else if (action.type === "LOAD_ALL_POSITION_BLOCKS_1") {
    return {
      positionBlocks_1: action.blocks,
    };
  }

  return state;
};

export default positionRed_1;
