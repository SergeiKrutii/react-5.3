import PropTypes from "prop-types";
import { useState } from "react";
import { StyledHeader } from "./StyledSearchBar";
import { ToastContainer, toast } from "react-toastify";

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const inputChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query === "") {
      toast.warning("Please, enter what you want to find");
      return;
    }

    onSubmit(query);
    setQuery("");
  };

  return (
    <StyledHeader>
      <form className="search-form" onSubmit={handleSubmit}>
        <button className="search-button" type="submit">
          <span className="search-span">Search</span>
        </button>

        <input
          className="search-input"
          onChange={inputChange}
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      <ToastContainer autoClose={2000} theme="dark" />
    </StyledHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
