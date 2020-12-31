import React from "react";
import PetCard from "./PetCard";
import "./SearchPage.css";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      selectedOption: "type",
      searchResults: [],
    };
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }
  handleChange(event) {
    this.setState({ selectedOption: event.target.value });
  }
  Search() {
    const url =
      "http://localhost:5000/api/pet?" +
      this.state.selectedOption +
      "=" +
      this.state.search;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ searchResults: data });
      });
  }

  render() {
    return (
      <div>
        <h1 className="searchTitle">Search Page</h1>
        <div className="searchContainer">
          <div className="searchOptions">
            <select
              name="searchFields"
              value={this.state.selectedOption}
              onChange={(event) => this.handleChange(event)}
            >
              <option value="type">Type</option>
              <option value="status">Adoption Status</option>
              <option value="height">Height</option>
              <option value="weight">Weight</option>
              <option value="name">Name</option>
            </select>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            value={this.state.search}
            onChange={(event) => this.handleSearchChange(event)}
          />
          <button className="btnSearch" onClick={() => this.Search()}>
            Search
          </button>
        </div>
        <div className="listContainer">
          <ul>
            {this.state.searchResults.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchPage;
