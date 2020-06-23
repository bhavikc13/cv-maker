import {
  reactReduxFirebase,
  getFirebase,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import fbConfig from "./../../../firebase/fbConfig";
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
import rootReducer from "./../../../store/reducers/rootReducer";
import { render } from "./../../../test-utils";

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
import { fireEvent, screen, waitForElement } from "../../../test-utils.js";
import firebase from "./../../../firebase/fbConfig";

import App from "../../../App";

test("upload image check", async (done) => {
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
      expect(screen.getByTestId("uploadImageLinkTestId")).toBeTruthy();
      res();
    }, 20000)
  );
  done();
}, 100000);

// test("personal information check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("personalInformationLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("education check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("educationLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("award check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("awardLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("hobby check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("hobbyLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("internship check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("internshipLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("Position check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("positionLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("project check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("projectLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("skill check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("skillLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );
//   done();
// }, 100000);

// test("Education input check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("cv"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("educationLinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("educationLinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("degreeBlock1LinkTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   fireEvent.click(screen.getByTestId("degreeBlock1LinkTestId"));
// await new Promise((res) =>
// setTimeout(() => {
//   expect(screen.getByTestId("degreeBlock1DegreeNameTestId")).toBeTruthy();
//   res();
// }, 20000)
// );

//   let tag = screen.getByTestId("degreeBlock1DegreeNameTestId");
//   fireEvent.change(tag, { target: { value: "B.Tech" } });
//   expect(tag.value).toContain("B.Tech");

//   tag = screen.getByTestId("degreeBlock1CollegeNameTestId");
//   fireEvent.change(tag, { target: { value: "DAIICT" } });
//   expect(tag.value).toContain("DAIICT");

//   tag = screen.getByTestId("degreeBlock1YearTestId");
//   fireEvent.change(tag, { target: { value: "2021" } });
//   expect(tag.value).toContain("2021");

//   tag = screen.getByTestId("degreeBlock1CpiTestId");
//   fireEvent.change(tag, { target: { value: "7.0" } });
//   expect(tag.value).toContain("7.0");

//   done();
// }, 500000);

// test("add degree block check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("dashboardTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("cv"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("educationLinkTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("educationLinkTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("addDegreeBlockButtonTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("addDegreeBlockButtonTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("degreeBlock3LinkTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   done();
// }, 500000);

// test("remove degree block check", async (done) => {
//   const history = createMemoryHistory();
//   renderWithAll(<App />, history);
//   const emailInputArea = screen.getByTestId("emailInputId");
//   fireEvent.change(emailInputArea, {
//     target: { value: "test@gmail.com" },
//   });
//   const passwordInputArea = screen.getByTestId("passwordInputId");
//   fireEvent.change(passwordInputArea, { target: { value: "123456" } });

//   fireEvent.click(screen.getByTestId("signInButtonTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("dashboardTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("useExistingCVLinkTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("useExistingCVLinkTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("cvListTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("cv"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("educationLinkTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("educationLinkTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(screen.getByTestId("removeDegreeBlock2ButtonTestId")).toBeTruthy();
//       res();
//     }, 20000)
//   );

//   fireEvent.click(screen.getByTestId("removeDegreeBlock2ButtonTestId"));
//   await new Promise((res) =>
//     setTimeout(() => {
//       expect(
//         screen.queryByTestId("degreeBlock2LinkTestId")
//       ).not.toBeInTheDocument();
//       res();
//     }, 20000)
//   );

//   done();
// }, 500000);
