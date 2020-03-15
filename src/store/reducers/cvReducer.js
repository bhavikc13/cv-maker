const initState = {};
const cvReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_CV":
      console.log("create cv", action.cv);
      return state;
    case "CREATE_PROJECT_ERROR":
      console.log("create cv error", action.err);
      return state;
    case "UPDATE_PROFILE":
      console.log("update profile", action.profile);
      return state;
    case "UPDATE_PROFILE_ERROR":
      console.log("update profile error", action.err);
      return state;
    case "UPDATE_EDUCATION":
      console.log("update education", action.e);
      return state;
    case "UPDATE_EDUCATION_ERROR":
      console.log("update education error", action.err);
      return state;
    case "UPDATE_SKILL":
      console.log("update skill", action.e);
      return state;
    case "UPDATE_SKILL_ERROR":
      console.log("update skill error", action.err);
      return state;
    case "UPDATE_INTERNSHIP":
      console.log("update internship", action.e);
      return state;
    case "UPDATE_INTERNSHIP_ERROR":
      console.log("update internship error", action.err);
      return state;
    case "UPDATE_PROJECT":
      console.log("update project", action.e);
      return state;
    case "UPDATE_PROJECT_ERROR":
      console.log("update project error", action.err);
      return state;
    case "UPDATE_POSITION":
      console.log("update position", action.e);
      return state;
    case "UPDATE_POSITION_ERROR":
      console.log("update position error", action.err);
      return state;
    case "UPDATE_AWARD":
      console.log("update award", action.e);
      return state;
    case "UPDATE_AWARD_ERROR":
      console.log("update award error", action.err);
      return state;
    case "UPDATE_HOBBY":
      console.log("update hobby", action.e);
      return state;
    case "UPDATE_HOBBY_ERROR":
      console.log("update hobby error", action.err);
      return state;
    default:
      return state;
  }
};

export default cvReducer;
