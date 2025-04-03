import * as React from "react";
import logo from "../../assets/star-wars-logo.png";
import "../css/Header.css";

export default function Header() {
  return (
    <header>
      <img className="logo" src={logo} />
      <h1>
        Search for starships, films or vehicles from the Star Wars universe!
      </h1>
      <h2>Please specify a category below.</h2>
    </header>
  );
}
