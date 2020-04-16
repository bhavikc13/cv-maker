import firestore from "./../../../firebase/firestore";

const initState = {
  hobbyBlocks_1: [],
};

const hobbyRed_1 = (state = initState, action) => {
  if (action.type === "ADD_DUMMY_BLOCK_1") {
    let newBlocks = [...state.hobbyBlocks_1, action.dummyBlock];
    return {
      hobbyBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_DUMMY_BLOCK_1") {
    let newBlocks = state.hobbyBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    return {
      hobbyBlocks_1: newBlocks,
    };
  } else if (action.type === "ADD_HOBBY_BLOCK_1") {
    let newBlocks = [...state.hobbyBlocks_1, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("hobby")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update hobby"))
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
      hobbyBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_HOBBY_INFORMATION_1") {
    let newBlocks = state.hobbyBlocks_1;
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
      .collection("hobby")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update hobby"))
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
      hobbyBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_HOBBY_BLOCK_1") {
    let newBlocks = state.hobbyBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("hobby")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update hobby"))
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
      hobbyBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_ALL_HOBBY_BLOCKS_1") {
    return {
      hobbyBlocks_1: [],
    };
  } else if (action.type === "LOAD_ALL_HOBBY_BLOCKS_1") {
    return {
      hobbyBlocks_1: action.blocks,
    };
  }

  return state;
};

export default hobbyRed_1;
