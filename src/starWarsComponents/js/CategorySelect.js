import * as React from "react";
import "../css/CategorySelect.css";

export default function CategorySelect({onClick, category}) {
  return (
    <div className="categoryBox">
      <button
        className={`category-cta ${
          category === "films" ? "category-active" : ""
        }`}
        value="films"
        onClick={onClick}
        data-testid="category-cta"
      >
        Films
      </button>
      <button
        className={`category-cta ${
          category === "starships" ? "category-active" : ""
        }`}
        value="starships"
        onClick={onClick}
        data-testid="category-cta"
      >
        Starships
      </button>
      <button
        className={`category-cta ${
          category === "vehicles" ? "category-active" : ""
        }`}
        value="vehicles"
        onClick={onClick}
        data-testid="category-cta"
      >
        Vehicles
      </button>
    </div>
  );
}
