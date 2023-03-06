import Constants from "../Constants/Constants";

const CollapsedReducer = (state=false, action) => {
  switch (action.type) {
    case Constants.LEFT:
      return true;
    case Constants.RIGHT:
      return false;
    default:
      return state;
  }
}

export default CollapsedReducer;