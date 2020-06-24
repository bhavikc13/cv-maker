<<<<<<< HEAD
import {
  reactReduxFirebase,
  getFirebase,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import fbConfig from "./../../firebase/fbConfig";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import rootReducer from "./../../store/reducers/rootReducer";

const rrfConfig = {
  ...fbConfig,
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function renderWithAll(ui, history) {
  return {
    ...render(
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router history={history}>
            <DndProvider backend={Backend}>{ui}</DndProvider>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>,
      {
        initialState: {
          firebase: {
            auth: {
              uid: false,
              authError: null,
            },
          },
          auth: {
            uid: false,
            authError: null,
          },
        },
      }
    ),
  };
}

import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { render, fireEvent, screen, waitForElement } from "../../test-utils.js";
import firebase from "./../../firebase/fbConfig";

import App from "./../../App";

test("cv list page check", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);
  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, {
    target: { value: "test@gmail.com" },
  });
  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123456" } });

  fireEvent.click(screen.getByTestId("signInButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("cvListTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  fireEvent.click(screen.getByTestId("cv"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("cvEditorTestId")).toBeTruthy();
      res();
    }, 20000)
  );
  done();
}, 100000);
=======
import {
  reactReduxFirebase,
  getFirebase,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import fbConfig from "./../../firebase/fbConfig";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  reduxFirestore,
  getFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import rootReducer from "./../../store/reducers/rootReducer";

const rrfConfig = {
  ...fbConfig,
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
  )
);
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function renderWithAll(ui, history) {
  return {
    ...render(
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router history={history}>
            <DndProvider backend={Backend}>{ui}</DndProvider>
          </Router>
        </ReactReduxFirebaseProvider>
      </Provider>,
      {
        initialState: {
          firebase: {
            auth: {
              uid: false,
              authError: null,
            },
          },
          auth: {
            uid: false,
            authError: null,
          },
        },
      }
    ),
  };
}

import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import { render, fireEvent, screen, waitForElement } from "../../test-utils.js";
import firebase from "./../../firebase/fbConfig";

import App from "./../../App";

test("cv list page check", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);
  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, {
    target: { value: "test@gmail.com" },
  });
  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123456" } });

  fireEvent.click(screen.getByTestId("signInButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("cvListTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  fireEvent.click(screen.getByTestId("cv"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("cvEditorTestId")).toBeTruthy();
      res();
    }, 20000)
  );
  done();
}, 100000);
>>>>>>> 47d49f8d70bf2080f645c5061e13cfe2d470008b
