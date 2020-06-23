import React from "react";
import { render, fireEvent, screen } from "./test-utils";
import {
  Router,
  Link,
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Ok, so here's what your tests might look like

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>, {
      initialState: {
        firebase: {
          auth: {
            uid: true,
            authError: null,
          },
        },
        auth: {
          uid: true,
          authError: null,
        },
      },
    }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

test("full app rendering/navigating", async () => {
  const {
    container,
    history: { navigate },
    getByTestId,
  } = renderWithRouter(<App />);
  const appContainer = container;
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(getByTestId("dashboardTestId")).toBeTruthy();

  // with reach-router we don't need to simulate a click event, we can just transition
  // to the page using the navigate function returned from the history object.
});

// test("landing on a bad page", () => {
//   const { container, getByTestId } = renderWithRouter(<App />, {
//     route: "/cvlist",
//   });
//   // normally I'd use a data-testid, but just wanted to show this is also possible
//   expect(getByTestId("cvListTestId")).toBeTruthy();
// });
