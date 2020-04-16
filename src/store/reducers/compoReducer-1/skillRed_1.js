import firestore from "./../../../firebase/firestore";

const initState = {
  areaOfInterest_1: "",
  proLanguages_1: "",
  toolsAndTech_1: "",
  techElectives_1: "",
};

const skillRed_1 = (state = initState, action) => {
  if (action.type === "UPDATE_AOI_1") {
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("skill")
      .doc(action.cvid)
      .set({
        areaOfInterest: action.aoi,
        proLanguages: state.proLanguages_1,
        toolsAndTech: state.toolsAndTech_1,
        techElectives: state.techElectives_1,
      })
      .then(() => console.log("update skill"))
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
      ...state,
      areaOfInterest_1: action.aoi,
    };
  } else if (action.type === "UPDATE_PL_1") {
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("skill")
      .doc(action.cvid)
      .set({
        areaOfInterest: state.areaOfInterest_1,
        proLanguages: action.pl,
        toolsAndTech: state.toolsAndTech_1,
        techElectives: state.techElectives_1,
      })
      .then(() => console.log("update skill"))
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
      ...state,
      proLanguages_1: action.pl,
    };
  } else if (action.type === "UPDATE_TT_1") {
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("skill")
      .doc(action.cvid)
      .set({
        areaOfInterest: state.areaOfInterest_1,
        proLanguages: state.proLanguages_1,
        toolsAndTech: action.tt,
        techElectives: state.techElectives_1,
      })
      .then(() => console.log("update skill"))
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
      ...state,
      toolsAndTech_1: action.tt,
    };
  } else if (action.type === "UPDATE_TE_1") {
    firestore
      .collection("users")
      .doc(action.uid)
      .collection("cvs")
      .doc(action.cvid)
      .collection("skill")
      .doc(action.cvid)
      .set({
        areaOfInterest: state.areaOfInterest_1,
        proLanguages: state.proLanguages_1,
        toolsAndTech: state.toolsAndTech_1,
        techElectives: action.te,
      })
      .then(() => console.log("update skill"))
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
      ...state,
      techElectives_1: action.te,
    };
  } else if (action.type === "REMOVE_ALL_SKILL_BLOCKS_1") {
    return {
      areaOfInterest_1: "",
      proLanguages_1: "",
      toolsAndTech_1: "",
      techElectives_1: "",
    };
  } else if (action.type === "LOAD_ALL_SKILL_BLOCKS_1") {
    return {
      areaOfInterest_1: action.aoi,
      proLanguages_1: action.pl,
      toolsAndTech_1: action.tt,
      techElectives_1: action.te,
    };
  }
  return state;
};

export default skillRed_1;
