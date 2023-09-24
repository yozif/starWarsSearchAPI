import React, { Component } from "react";
import '../css/search.css';
import '../css/category.css';
import '../../fonts/Starjhol.ttf'
import logo from '../../assets/star-wars-logo.png';
import Grid from '@mui/material/Grid'; // Grid version 1

class Search extends Component {
    state = {
        searchValue: '',
        category: '',
        outputs: [],
        azActive: ''
    };
    render() {
        return (
            <div>
            <img className="logo" src={logo}/>
            <h1>Search for starships, films or vehicles from the Star Wars universe!</h1>
            <h2>Please specify a category below.</h2>
            <div className="searchBoxContainer">
                <div className="categoryBox">
                    <button 
                        className={`category-cta ${this.state.category === "films" ? "category-active" : ""}`} 
                        value="films" onClick={this.categoryChange}>
                            Films
                        </button>
                    <button     
                        className={`category-cta ${this.state.category === "starships" ? "category-active" : ""}`} 
                        value="starships" onClick={this.categoryChange}>
                            Starships
                        </button>
                    <button 
                        className={`category-cta ${this.state.category === "vehicles" ? "category-active" : ""}`} 
                        value="vehicles" onClick={this.categoryChange}>
                            Vehicles
                        </button>
                </div>
                <div className="searchWrap">
                    <form className="search" onSubmit={this.handleSearch}>
                        <input  
                            className="searchTerm"
                            name="text"
                            type="text"
                            placeholder="Search"
                            onChange={event => this.searchChange(event)}
                            value={this.state.searchValue}
                        />
                        <button type="submit" className="search-cta" onClick={this.handleSearch} ref={input => this.inputElement = input}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className="seach-icon">
                        <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                        </svg>
                        </button>
                    </form>
                </div>
                <button 
                    className={`sortOutput ${this.state.azActive ? 'sortOutput-active': ""}`} 
                    value="a-z" 
                    onClick={this.sortOutput}>
                        A-Z
                    </button>
            </div>
            <div className="searchResults">
                {this.state.outputs ? (
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {this.state.outputs.map((output, index) => (
                            <Grid item xs={4} key={index}>
                            {this.state.category == "films" ? (
                                <div className="gridBox">
                                    <h3>{output.title}</h3>
                                    <p>Episode number: <span>{output.episode_id}</span></p>
                                    <p>Director: <span>{output.director}</span></p>
                                    <p>Producer: <span>{output.producer}</span></p>
                                    <p>Release date: <span>{output.release_date}</span></p>
                                    <p>Opening crawl: <span>{output.opening_crawl}</span></p>
                                </div>
                                ):(
                                <div className="gridBox">
                                    <h3>{output.name}</h3>
                                    <p>Model: <span>{output.model}</span></p>
                                    <p>Manufacturer: <span>{output.manufacturer}</span></p>
                                    <p>Cost in credits: <span>{output.cost_in_credits}</span></p>
                                    <p>Length: <span>{output.length}</span></p>
                                    <p>Crew: <span>{output.crew}</span></p>
                                    <p>Passengers: <span>{output.passengers}</span></p>
                                    <p>Cargo capacity: <span>{output.cargo_capacity}</span></p>
                                </div>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    ) : (
                    <p>Do you have the correct category selected?</p>
                )}
            </div>
        </div>
        );
    }
    sortOutput = () => {
        let strAscending = '';
        if (this.state.category == "films") {
            strAscending = [...this.state.outputs].sort((a, b) =>
                a.title > b.title ? 1 : -1,
            );
        } else {
            strAscending = [...this.state.outputs].sort((a, b) =>
            a.name > b.name ? 1 : -1,
        );
        }
        this.setState({ outputs: strAscending })
        this.setState({ azActive: true })
    };
    categoryChange = event => {
        this.setState({ category: event.target.value }, () => {
            this.inputElement.click()
        })
    };
    searchChange = event => {
        this.setState({ searchValue: event.target.value });
    };
    handleSearch = event => {
        event.preventDefault()
        this.makeApiCall(this.state.searchValue, this.state.category);
        this.setState({ azActive: false })
    }
    makeApiCall = (searchInput, categoryInput) => {
        var searchUrl = `https://swapi.dev/api/${categoryInput}?search=${searchInput}`;
        fetch(searchUrl).then(response => {
            return response.json();
        }).then(jsonData => {
            this.setState({ outputs: jsonData.results });
            console.log(jsonData.results);
        });
    };
}
export default Search;