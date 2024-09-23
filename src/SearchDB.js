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
      .select("*")
      .ilike("first_last", `%${query}%`);

    if (error) {
      console.error(error);
    } else {
      setResults(data);
    }
  };

  return (
    <div className="container">
      <h1>Flight Log Search</h1>
      <input
        id="searchBox"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button id="searchButton" onClick={handleSearch}>
        Search
      </button>
      <div id="results">
        {results.map((result, index) => (
          <div key={index}>
            {/* Render your result here */}
            {JSON.stringify(result)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchDB;
