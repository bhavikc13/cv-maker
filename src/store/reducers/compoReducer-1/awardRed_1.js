import firestore from "./../../../firebase/firestore";

const initState = {
  awardBlocks_1: [],
};

const awardRed_1 = (state = initState, action) => {
  if (action.type === "ADD_DUMMY_BLOCK_1") {
    let newBlocks = [...state.awardBlocks_1, action.dummyBlock];
    return {
      awardBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_DUMMY_BLOCK_1") {
    let newBlocks = state.awardBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    return {
      awardBlocks_1: newBlocks,
    };
  } else if (action.type === "ADD_AWARD_BLOCK_1") {
    let newBlocks = [...state.awardBlocks_1, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("award")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update award"))
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
      awardBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_AWARD_INFORMATION_1") {
    let newBlocks = state.awardBlocks_1;
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
      .collection("award")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update award"))
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
      awardBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_AWARD_BLOCK_1") {
    let newBlocks = state.awardBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("award")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update award"))
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
      awardBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_ALL_AWARD_BLOCKS_1") {
    return {
      awardBlocks_1: [],
    };
  } else if (action.type === "LOAD_ALL_AWARD_BLOCKS_1") {
    return {
      awardBlocks_1: action.blocks,
    };
  }

  return state;
};

export default awardRed_1;
