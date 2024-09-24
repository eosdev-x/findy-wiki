import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./SearchDB.css";

const supabase = createClient("https://pshfszzzbhdbuwqxsbte.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzaGZzenp6YmhkYnV3cXhzYnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwNTg0NjcsImV4cCI6MjA0MjYzNDQ2N30.1_K8Heml71eLsjLxp63Emkkf3p0HBYwL_VCD6WX-_tg");

const SearchDB = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from("MainList")
      .select("first_last")
      .ilike("first_last", `%${query}%`);
  
    if (error) {
      console.error(error);
    } else {
      setResults(data);
    }
  };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container">
      <h1>
        <img class="logo" src="
        https://raw.githubusercontent.com/eosdev-x/findy-wiki/refs/heads/main/src/logo.svg" alt="findy logo" />
        findy.wiki
      </h1>
      <h1>Flight Log Search</h1>
      <input
        id="searchBox"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}  // Add this line
        placeholder="Search..."
      />
      <button id="searchButton" onClick={handleSearch}>
        Search
      </button>
      <div id="results">
        {results.length > 0 ? (
          results.map((result, index) => (
            <div key={index}>
              Yes, {result.first_last} is on the list!
            </div>
          ))
        ) : (
          <div>
            Great news, {query} is not on the list!
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDB;
