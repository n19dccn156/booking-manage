import Constants from "../Constants/Constants"

export const ReloadAwaitTable = (reload) => {
  return {
    type: Constants.RELOAD,
    payload: reload,
  };
};

export const ReloadConfirmTable = (reload) => {
  return {
    type: Constants.RELOAD,
    payload: reload,
  };
};

export const ReloadOngoingTable = (reload) => {
  return {
    type: Constants.RELOAD,
    payload: reload,
  };
};