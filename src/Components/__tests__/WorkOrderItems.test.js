/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import WorkOrderItems from "../WorkOrderItems";
import { BrowserRouter as Router} from 'react-router-dom'

/*
  A test that renders a React Component
*/
afterEach(cleanup);

it("renders without crashing", () => {
  render(
    <Router>    
      <WorkOrderItems/>
    </Router>
  );
});