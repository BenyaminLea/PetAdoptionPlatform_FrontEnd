import React from "react";
import PetCard from "./PetCard";
import "./SearchPage.css";
import logo from "./logo.jpg";
import "./HomePage.css";
import { withRouter } from "react-router-dom";

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
    let query = this.state.search;
    if (
      this.state.selectedOption === "type" ||
      this.state.selectedOption === "adoptionStatus"
    ) {
      query = query.toLowerCase();
    }
    const url =
      "http://localhost:5000/api/pet?" +
      this.state.selectedOption +
      "=" +
      query;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ searchResults: data });
      });
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <div className="homePage">
          <button onClick={() => this.goBack()}>Back to the home page</button>
          <img src={logo} alt="logo" className="logo" />
          <h1 className="searchTitle">Search Page</h1>
          <div className="searchContainer">
            <div className="searchOptions">
              <select
                name="searchFields"
                value={this.state.selectedOption}
                onChange={(event) => this.handleChange(event)}
              >
                <option value="type">Type</option>
                <option value="adoptionStatus">Adoption Status</option>
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
      </div>
    );
  }
}

export default withRouter(SearchPage);
