import authReducer from "./authReducer";
import cvReducer from "./cvReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { FirebaseReducer, firebaseReducer } from "react-redux-firebase";
import personRed from "./compoReducer/personRed";
import educationRed from "./compoReducer/educationRed";
import skillRed from "./compoReducer/skillRed";
import internshipRed from "./compoReducer/internshipRed";
import projectRed from "./compoReducer/projectRed";
import positionRed from "./compoReducer/positionRed";
import awardRed from "./compoReducer/awardRed";
import hobbyRed from "./compoReducer/hobbyRed";

const rootReducer = combineReducers({
  auth: authReducer,
  cv: cvReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  personRed: personRed,
  educationRed: educationRed,
  skillRed: skillRed,
  internshipRed: internshipRed,
  projectRed: projectRed,
  positionRed: positionRed,
  awardRed: awardRed,
  hobbyRed: hobbyRed
});

export default rootReducer;
