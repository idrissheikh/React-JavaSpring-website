import rootReducer from "./reducer/RootReducer";
import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";

const AppReducer = combineReducers({
  rootReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
  return createStore(AppReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configStore;
