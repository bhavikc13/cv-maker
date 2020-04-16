import firestore from "./../../../firebase/firestore";

const initState = {
  projectBlocks_1: [],
};

const projectRed_1 = (state = initState, action) => {
  //console.log(state);

  if (action.type === "ADD_DUMMY_BLOCK_1") {
    let newProjectBlocks = [...state.projectBlocks_1, action.dummyBlock];
    return {
      projectBlocks_1: newProjectBlocks,
    };
  } else if (action.type === "REMOVE_DUMMY_BLOCK_1") {
    let newProjectBlocks = state.projectBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    return {
      projectBlocks_1: newProjectBlocks,
    };
  } else if (action.type === "ADD_PROJECT_BLOCK_1") {
    let newBlocks = [...state.projectBlocks_1, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("project")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update project"))
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
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_PROJECT_NAME_1") {
    let newBlocks = state.projectBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.projectName = action.projectName;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("project")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update project"))
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
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_PROJECT_DESCRIPTION_1") {
    let newBlocks = state.projectBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.description = action.description;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("project")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update project"))
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
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_PROJECT_SUPERVISOR_1") {
    let newBlocks = state.projectBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.supervisor = action.supervisor;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("project")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update project"))
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
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_PROJECT_START_1") {
    let newBlocks = state.projectBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.start = action.start;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("project")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update project"))
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
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_PROJECT_END_1") {
    let newBlocks = state.projectBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.end = action.end;
        break;
      }
    }

    return {
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_PROJECT_TEAM_SIZE_1") {
    let newBlocks = state.projectBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.teamSize = action.teamSize;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("project")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update project"))
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
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_PROJECT_BLOCK_1") {
    let newBlocks = state.projectBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("project")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update project"))
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
      projectBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_ALL_PROJECT_BLOCKS_1") {
    return {
      projectBlocks_1: [],
    };
  } else if (action.type === "LOAD_ALL_PROJECT_BLOCKS_1") {
    return {
      projectBlocks_1: action.blocks,
    };
  }

  return state;
};

export default projectRed_1;
