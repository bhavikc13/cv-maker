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

test("Check inputs", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "kushal@gmail.com" } });
  expect(emailInputArea.value).toContain("kushal@gmail.com");

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123456" } });
  expect(passwordInputArea.value).toContain("123456");

  const firstNameInputArea = screen.getByTestId("firstNameInputId");
  fireEvent.change(firstNameInputArea, { target: { value: "firstName" } });
  expect(firstNameInputArea.value).toContain("firstName");

  const lastNameInputArea = screen.getByTestId("lastNameInputId");
  fireEvent.change(lastNameInputArea, { target: { value: "lastName" } });
  expect(lastNameInputArea.value).toContain("lastName");
  done();
}, 100000);

test("Check if email address is badly formatted", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "kushal@gmail" } });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123456" } });

  const firstNameInputArea = screen.getByTestId("firstNameInputId");
  fireEvent.change(firstNameInputArea, { target: { value: "firstName" } });

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  let error = screen.getByTestId("errorTestId");

  expect(error).toHaveTextContent("The email address is badly formatted.");
  done();
}, 100000);

test("Check if password is short", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "test1@gmail.com" } });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123" } });

  const firstNameInputArea = screen.getByTestId("firstNameInputId");
  fireEvent.change(firstNameInputArea, { target: { value: "firstName" } });

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  let error = screen.getByTestId("errorTestId");

  expect(error).toHaveTextContent("Password should be at least 6 characters");
  done();
}, 100000);

test("Check if email address is already used", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "test@gmail.com" } });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123567" } });

  const firstNameInputArea = screen.getByTestId("firstNameInputId");
  fireEvent.change(firstNameInputArea, { target: { value: "firstName" } });

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  let error = screen.getByTestId("errorTestId");

  expect(error).toHaveTextContent(
    "The email address is already in use by another account."
  );
  done();
}, 100000);

test("Check if email address and password are correctly formatted", async (done) => {
  const history = createMemoryHistory();
  renderWithAll(<App />, history);

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("signUpTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  const emailInputArea = screen.getByTestId("emailInputId");
  fireEvent.change(emailInputArea, { target: { value: "test3@gmail.com" } });

  const passwordInputArea = screen.getByTestId("passwordInputId");
  fireEvent.change(passwordInputArea, { target: { value: "123567" } });

  const firstNameInputArea = screen.getByTestId("firstNameInputId");
  fireEvent.change(firstNameInputArea, { target: { value: "firstName" } });

  fireEvent.click(screen.getByTestId("signUpButtonTestId"));
  await new Promise((res) =>
    setTimeout(() => {
      expect(screen.getByTestId("dashboardTestId")).toBeTruthy();
      res();
    }, 20000)
  );

  done();
}, 100000);
