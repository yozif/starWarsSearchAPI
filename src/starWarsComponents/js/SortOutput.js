import * as React from "react";
import "../css/SortOutput.css";

export default function SortOutput({ sortOutput, azActive }) {
  return (
    <button
      className={`sortOutput ${azActive ? "sortOutput-active" : ""}`}
      value="a-z"
      onClick={sortOutput}
    >
      A-Z
    </button>
  );
}
