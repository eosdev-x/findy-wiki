import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./SearchDB.css";

const supabase = createClient("https://pshfszzzbhdbuwqxsbte.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGZzenp6YmhkYnV3cXhzYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNTg0NjcsImV4cCI6MjA0MjYzNDQ2N30.1_K8Heml71eLsjLxp63Emkkf3p0HBYwL_VCD6WX-_tg");

const SearchDB = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") {
      setResults([]);
      setSearchInitiated(false);
      setErrorMessage("Please enter a name to search");
      return;
    }

    const { data, error } = await supabase
      .from("MainList")
      .select("first_last")
      .ilike("first_last", `%${query}%`);

    if (error) {
      console.error(error);
      setErrorMessage("An error occurred while searching. Please try again.");
      setResults([]);
    } else {
      setResults(data);
      if (data.length === 0) {
        setErrorMessage(`Great news, ${query} is not on the list!`);
      } else {
        setErrorMessage(""); // Clear the error message if search is successful
      }
    }
    setSearchInitiated(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
    <div className="container card bg-primary shadow-inset border-light p-3">
      <div class="card-body shadow-soft border border-light rounded p-4">
        <div className="profile-image-container">
        <div class="profile-image shadow-inset border rounded-circle p-3 mt-5">
          <img class="rounded-circle" src="https://raw.githubusercontent.com/eosdev-x/findy-wiki/refs/heads/main/src/logo.svg" alt="findy logo" />
        </div>
        </div>
      <h1>Flight Log Search</h1>
      <input
        id="searchBox"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <button class="btn btn-primary mb-3 mb-lg-0 mr-3 animate-right-3" onClick={handleSearch}>
        Search The Flight Log
      </button>
      {errorMessage && <div id="results" className="error">{errorMessage}</div>}
      <div id="results">
        {results.length > 0 && results.map((result, index) => (
          <div key={index}>
            Yes, {result.first_last} is on the list!
          </div>
        ))}
      </div>
      </div>
    </div>
    <footer class="container">
        <p>2024 findy.wiki</p>
        <p>
          Source: <a href="https://t.co/EYSU6uMa1W" target="_blank" rel="noopener noreferrer">116 page pdf</a>
        </p>
        <p class="disclaimer">findy.wiki does not claim accuricy of the source pdf. Use at own risk.</p>
    </footer>
    </div>
  );
};

export default SearchDB;