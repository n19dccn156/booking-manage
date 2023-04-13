import Constants from "../../Constants/Constants";

const ReloadAwaitReducer = (state=false, action) => {
  switch (action.type) {
    case Constants.RELOAD:
      return action.payload;
    default:
      return state;
  }
}

export default ReloadAwaitReducer;