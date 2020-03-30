const initState = {
  degreeBlocks_1: []
};

const educationRed_1 = (state = initState, action) => {
  //console.log('educationRed',state)

  if (action.type === "ADD_EDUCATION_BLOCK_1") {
    let newDegreeBlocks = [...state.degreeBlocks_1, action.newBlock];
    return {
      degreeBlocks_1: newDegreeBlocks
    };
  } else if (action.type === "UPDATE_EDUCATION_DEGREE_NAME_1") {
    let newDegreeBlocks = state.degreeBlocks_1;
    for (let [index, value] of newDegreeBlocks.entries()) {
      //console.log('id',value.id,action.id);
      //console.log(state);
      if (value.id === action.id) {
        value.degreeName = action.degreeName;
        break;
      }
    }

    return {
      degreeBlocks_1: newDegreeBlocks
    };
  } else if (action.type === "UPDATE_EDUCATION_INSTITUTE_NAME_1") {
    let newDegreeBlocks = state.degreeBlocks_1;
    for (let [index, value] of newDegreeBlocks.entries()) {
      if (value.id === action.id) {
        value.instituteName = action.instituteName;
        break;
      }
    }

    return {
      degreeBlocks_1: newDegreeBlocks
    };
  } else if (action.type === "UPDATE_EDUCATION_YEAR_1") {
    let newDegreeBlocks = state.degreeBlocks_1;
    for (let [index, value] of newDegreeBlocks.entries()) {
      if (value.id === action.id) {
        value.year = action.year;
        break;
      }
    }

    return {
      degreeBlocks_1: newDegreeBlocks
    };
  } else if (action.type === "UPDATE_EDUCATION_SCORE_1") {
    let newDegreeBlocks = state.degreeBlocks_1;
    for (let [index, value] of newDegreeBlocks.entries()) {
      if (value.id === action.id) {
        value.score = action.score;
        break;
      }
    }

    return {
      degreeBlocks_1: newDegreeBlocks
    };
  } else if (action.type === "REMOVE_EDUCATION_BLOCK_1") {
    let newDegreeBlocks = state.degreeBlocks_1.filter((value, index) => {
      return value.id !== action.id;
    });

    return {
      degreeBlocks_1: newDegreeBlocks
    };
  }

  return state;
};

export default educationRed_1;
