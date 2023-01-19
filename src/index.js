import io from "socket.io-client";
import * as remote from "@syncstate/remote-client";
import { createDocStore } from "@syncstate/core";
import { Provider } from "@syncstate/react";

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import initialState from "./statics/initialState";

//set up socket connection
let socket = io.connect("http://localhost:8000");
const store = createDocStore({ gamestate: {...initialState} }, [remote.createInitializer()]);
store.dispatch(remote.enableRemote("/gamestate"));
// send request to server to get patches everytime when page reloads
socket.emit("fetchDoc", "doc/gamestate");
store.observe(
  "doc",
  "",
  (state, change) => {
    if (!change.origin) {
      //send json patch to the server
      socket.emit("change", "", change);
    }
  },
  Infinity
);
socket.on("change", (path, patch) => {

  store.dispatch(remote.applyRemote(path, patch));

});
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
