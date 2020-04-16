import firestore from "./../../firebase/firestore";

const initState = {
  orderOfSkillBlocks: [],
};

const orderOfSkillBlocksRed = (state = initState, action) => {
  if (action.type === "ADD_ORDER_OF_SKILL_BLOCK") {
    let newOrderOfSkillBlocks = [...state.orderOfSkillBlocks, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .update({
        updatedAt: new Date(),
        orderOfSkillBlocks: newOrderOfSkillBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of skill blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfSkillBlocks: newOrderOfSkillBlocks,
    };
  } else if (action.type === "REMOVE_ORDER_OF_SKILL_BLOCK") {
    let newOrderOfSkillBlocks = state.orderOfSkillBlocks.filter(
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
        orderOfSkillBlocks: newOrderOfSkillBlocks,
      })
      .then(() =>
        console.log("update date and time.\nupdate order of skill blocks")
      )
      .catch((err) => {
        console.log(err);
      });
    return {
      orderOfSkillBlocks: newOrderOfSkillBlocks,
    };
  } else if (action.type === "UPDATE_ORDER_OF_SKILL_BLOCKS") {
    if (state.orderOfSkillBlocks !== action.orderOfSkillBlocks) {
      firestore
        .collection("users")
        .doc(action.uid)
        .collection("cvs")
        .doc(action.cvid)
        .update({
          updatedAt: new Date(),
          orderOfSkillBlocks: action.orderOfSkillBlocks,
        })
        .then(() =>
          console.log("update date and time.\nupdate order of skill blocks")
        )
        .catch((err) => {
          console.log(err);
        });
    }
    return {
      ...state,
      orderOfSkillBlocks: action.orderOfSkillBlocks,
    };
  } else if (action.type === "LOAD_ORDER_OF_SKILL_BLOCKS") {
    return {
      ...state,
      orderOfSkillBlocks: action.orderOfSkillBlocks,
    };
  }

  return state;
};

export default orderOfSkillBlocksRed;
