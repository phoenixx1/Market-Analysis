// Import React and ReactDOM
import React from "react";
import ReactDOM from "react-dom";

// Create react componenet
const App = () => {
  return (
    <div>
      <label for="name" class="label">
        Enter name:{" "}
      </label>
      <input id="name" type="text" />
      <button style={{ backgroundColor: "blue", color: "white" }}>
        Submit!!
      </button>
    </div>
  );
};
// Show react component
ReactDOM.render(<App />, document.querySelector("#root"));