import React, { useState, useEffect } from "react";
import { search } from "../assets/images";
import { Definition } from "../components";
import "./Search.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [word, setWord] = useState("search");

  useEffect(() => {
    setWord("");
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) {
      setWord(searchInput);
      setSearchInput("");
    }
  };
  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="fontInput"
            value={searchInput}
            className="serif"
            placeholder="Search dictionary"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit">
            <img src={search} alt="" />
          </button>
        </form>
      </div>
      <Definition word={word} />
    </>
  );
};

export default Search;
