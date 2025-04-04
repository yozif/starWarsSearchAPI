import * as React from "react";
import Grid from "@mui/material/Grid";
import "../css/SearchResults.css";

export default function SearchResults({ outputs, category }) {
  return (
    <div className="searchResults">
      {outputs.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {outputs.map((output, index) => (
            <Grid item xs={4} key={index}>
              {category === "films" ? (
                <div className="gridBox" data-testid="sorted-item">
                  <h3>{output.title}</h3>
                  <p>
                    Episode number: <span>{output.episode_id}</span>
                  </p>
                  <p>
                    Director: <span>{output.director}</span>
                  </p>
                  <p>
                    Producer: <span>{output.producer}</span>
                  </p>
                  <p>
                    Release date: <span>{output.release_date}</span>
                  </p>
                  <p>
                    Opening crawl: <span>{output.opening_crawl}</span>
                  </p>
                </div>
              ) : (
                <div className="gridBox" data-testid="sorted-item">
                  <h3>{output.name}</h3>
                  <p>
                    Model: <span>{output.model}</span>
                  </p>
                  <p>
                    Manufacturer: <span>{output.manufacturer}</span>
                  </p>
                  <p>
                    Cost in credits: <span>{output.cost_in_credits}</span>
                  </p>
                  <p>
                    Length: <span>{output.length}</span>
                  </p>
                  <p>
                    Crew: <span>{output.crew}</span>
                  </p>
                  <p>
                    Passengers: <span>{output.passengers}</span>
                  </p>
                  <p>
                    Cargo capacity: <span>{output.cargo_capacity}</span>
                  </p>
                </div>
              )}
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>Do you have the correct category selected?</p>
      )}
    </div>
  );
}
