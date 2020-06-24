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
import { render } from "../../test-utils.js";

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
import { fireEvent, screen, waitForElement } from "../../test-utils.js";
import firebase from "./../../firebase/fbConfig";

import App from "../../App";

test("Check eamil and password input", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "kushal@gmail.com" } });
  expect(emailInputArea.value).toContain("kushal@gmail.com");

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123456" } });
  expect(passwordInputArea.value).toContain("123456");
  done();
}, 100000);

test("signInWithEmailAndPassword should throw error with wrong password", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "test@gmail.com" } });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "1" } });

  fireEvent.click(screen.getByTestId("signInButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signInTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  let error = screen.getByTestId("errorTestId");
  expect(error).toHaveTextContent(
    "The password is invalid or the user does not have a password."
  );
  done();
}, 100000);

test("signInWithEmailAndPassword should throw error with unregistered emailId", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, {
    target: { value: "unit-test@gmail.com" },
  });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "1" } });

  fireEvent.click(screen.getByTestId("signInButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signInTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  let error = screen.getByTestId("errorTestId");

  expect(error).toHaveTextContent(
    "There is no user record corresponding to this identifier. The user may have been deleted."
  );
  done();
}, 100000);

test("signInWithEmailAndPassword should login with correct credentials", async (done) => {
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
      expect(screen.getByTestId("dashboardTestId")).toBeTruthy();
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
import { render } from "../../test-utils.js";

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
import { fireEvent, screen, waitForElement } from "../../test-utils.js";
import firebase from "./../../firebase/fbConfig";

import App from "../../App";

test("Check eamil and password input", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "kushal@gmail.com" } });
  expect(emailInputArea.value).toContain("kushal@gmail.com");

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123456" } });
  expect(passwordInputArea.value).toContain("123456");
  done();
}, 100000);

test("signInWithEmailAndPassword should throw error with wrong password", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "test@gmail.com" } });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "1" } });

  fireEvent.click(screen.getByTestId("signInButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signInTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  let error = screen.getByTestId("errorTestId");
  expect(error).toHaveTextContent(
    "The password is invalid or the user does not have a password."
  );
  done();
}, 100000);

test("signInWithEmailAndPassword should throw error with unregistered emailId", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, {
    target: { value: "unit-test@gmail.com" },
  });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "1" } });

  fireEvent.click(screen.getByTestId("signInButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signInTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  let error = screen.getByTestId("errorTestId");

  expect(error).toHaveTextContent(
    "There is no user record corresponding to this identifier. The user may have been deleted."
  );
  done();
}, 100000);

test("signInWithEmailAndPassword should login with correct credentials", async (done) => {
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
      expect(screen.getByTestId("dashboardTestId")).toBeTruthy();
      res();
    }, 20000)
  );
  done();
}, 100000);
>>>>>>> 47d49f8d70bf2080f645c5061e13cfe2d470008b
