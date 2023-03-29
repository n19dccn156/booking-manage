import Constants from "../Constants/Constants";

export const openModal = () => {
  return {
    type: Constants.OPEN_MODAL,
  };
};

export const closeModal = () => {
  return {
    type: Constants.CLOSE_MODAL,
  };
};