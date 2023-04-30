import Constants from "../Constants/Constants";

const FindHotelsReducer = (state=false, action) => {
  switch (action.type) {
    case Constants.FIND:
      return !state;
    default:
      return state;
  }
}

export default FindHotelsReducer;