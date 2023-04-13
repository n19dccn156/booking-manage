import LoggedInReducer from "./LoggedInReducer";
import CollapsedReducer from "./CollapsedReducer";
import OpenModalReducer from "./ModalReducer";
import ReloadAwaitReducer from "./Reload/ReloadAwait";
import ReloadConfirmReducer from "./Reload/ReloadConfirm";
import ReloadOngoingReducer from "./Reload/ReloadOngoing";


const Reducers = {
  "loggedIn": LoggedInReducer,
  "collapsed": CollapsedReducer,
  "openModal": OpenModalReducer,
  "reloadAwait": ReloadAwaitReducer,
  "reloadConfirm": ReloadConfirmReducer,
  "reloadOngoing": ReloadOngoingReducer,
};

export default Reducers;