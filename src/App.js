import * as React from "react";
import { useState, useEffect } from "react";
import Header from "./starWarsComponents/js/Header";
import CategorySelect from "./starWarsComponents/js/CategorySelect";
import SearchBar from "./starWarsComponents/js/SearchBar";
import SearchResults from "./starWarsComponents/js/SearchResults";
import SortOutput from "./starWarsComponents/js/SortOutput";

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");
  const [azActive, setAzActive] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [loading, setLoading] = useState(false);

  function sortOutput() {
    const strAscending =
      category === "films"
        ? [...outputs].sort((a, b) => (a.title > b.title ? 1 : -1))
        : [...outputs].sort((a, b) => (a.name > b.name ? 1 : -1));

    setOutputs(strAscending);
    setAzActive(true);
  }

  function categoryChange(event) {
    const value = event.target.value;
    setCategory(value);
  }

  function searchChange(event) {
    const value = event.target.value;
    setSearchValue(value);
  }

  function makeApiCall(updatedCategory, updatedSearchValue) {
    const searchUrl = `https://swapi.dev/api/${updatedCategory}?search=${updatedSearchValue}`;

    fetch(searchUrl)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setOutputs(jsonData.results);
        setLoading(false);
        setAzActive(false);
      });
  }

  useEffect(() => {
    if (category) {
      setLoading(true);
      makeApiCall(category, searchValue);
    }
  }, [category, searchValue]);

  return (
    <main className="starWarsWrapper">
      <Header />
      <div className="searchBoxContainer">
        <CategorySelect onClick={categoryChange} category={category} />
        <SearchBar onChange={searchChange} searchValue={searchValue} />
      </div>
      <SortOutput
        category={category}
        azActive={azActive}
        sortOutput={sortOutput}
      />
      {loading ? (
        "Loading..."
      ) : (
        <SearchResults outputs={outputs} category={category} />
      )}
    </main>
  );
}
