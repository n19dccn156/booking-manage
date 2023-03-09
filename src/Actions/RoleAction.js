import Constants from "../Constants/Constants"

export const SetRoleAction = (authorization) => {
  return {
    type: Constants.SET_ROLE,
    payload: authorization,
  };
};

export const RemoveRoleAction = () => {
  return {
    type: Constants.REMOVE_ROLE,
    payload: '',
  };
};