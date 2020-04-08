import firestore from "./../../../firebase/firestore";
const initState = {
  internshipBlocks_1: [],
};

const internshipRed_1 = (state = initState, action) => {
  //console.log(state);
  if (action.type === "ADD_DUMMY_BLOCK_1") {
    let newInternshipBlocks = [...state.internshipBlocks_1, action.dummyBlock];
    return {
      internshipBlocks_1: newInternshipBlocks,
    };
  } else if (action.type === "REMOVE_DUMMY_BLOCK_1") {
    let newInternshipBlocks = state.internshipBlocks_1.filter(
      (value, index) => {
        return value.id !== action.id;
      }
    );
    return {
      internshipBlocks_1: newInternshipBlocks,
    };
  } else if (action.type === "ADD_INTERNSHIP_BLOCK_1") {
    let newBlocks = [...state.internshipBlocks_1, action.newBlock];
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("internship")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update internship"))
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
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_INTERNSHIP_ORGANIZATION_NAME_1") {
    let newBlocks = state.internshipBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.organizationName = action.organizationName;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("internship")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update internship"))
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
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_INTERNSHIP_DESCRIPTION_1") {
    let newBlocks = state.internshipBlocks_1;
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
      .collection("internship")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update internship"))
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
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_INTERNSHIP_SUPERVISOR_1") {
    let newBlocks = state.internshipBlocks_1;
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
      .collection("internship")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update internship"))
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
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_INTERNSHIP_START_1") {
    let newBlocks = state.internshipBlocks_1;
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
      .collection("internship")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update internship"))
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
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_INTERNSHIP_END_1") {
    let newBlocks = state.internshipBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.end = action.end;
        break;
      }
    }
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("internship")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update internship"))
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
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "UPDATE_INTERNSHIP_TEAM_SIZE_1") {
    let newBlocks = state.internshipBlocks_1;
    for (let [index, value] of newBlocks.entries()) {
      if (value.id === action.id) {
        value.teamSize = action.teamSize;
        break;
      }
    }

    return {
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_INTERNSHIP_BLOCK_1") {
    let newBlocks = state.internshipBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("internship")
      .doc(action.cvid)
      .set({
        ...newBlocks,
      })
      .then(() => console.log("update internship"))
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
      internshipBlocks_1: newBlocks,
    };
  } else if (action.type === "REMOVE_ALL_INTERNSHIP_BLOCKS_1") {
    return {
      internshipBlocks_1: [],
    };
  } else if (action.type === "LOAD_ALL_INTERNSHIP_BLOCKS_1") {
    return {
      internshipBlocks_1: action.blocks,
    };
  }

  return state;
};

export default internshipRed_1;
