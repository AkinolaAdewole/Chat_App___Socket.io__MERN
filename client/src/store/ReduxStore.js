import {
    legacy_createStore as createStore, // Import the Redux createStore function
    applyMiddleware,
    compose,
  } from "redux";
  import thunk from "redux-thunk"; // Import Redux Thunk middleware
  import { reducers } from "../reducers"; // Import Redux reducers
  
  // Function to save the Redux state to local storage
  function saveToLocalStorage(store) {
    try {
      const serializedStore = JSON.stringify(store);
      window.localStorage.setItem('store', serializedStore);
    } catch (e) {
      console.log(e);
    }
  }
  
  // Function to load the Redux state from local storage
  function loadFromLocalStorage() {
    try {
      const serializedStore = window.localStorage.getItem('store');
      if (serializedStore === null) return undefined;
      return JSON.parse(serializedStore);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
  
  // Define the Redux DevTools compose enhancer or use the default compose function
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  // Load the persisted state from local storage
  const persistedState = loadFromLocalStorage();
  
  // Create the Redux store with middleware (Thunk) and Redux DevTools extension
  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(thunk)));
  
  // Subscribe to changes in the Redux store and save the state to local storage
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store; // Export the Redux store for use in the application
  