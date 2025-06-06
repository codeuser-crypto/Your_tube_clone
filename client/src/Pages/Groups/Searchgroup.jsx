import React, { useState } from 'react';

const SearchGroup = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/groups/search?q=${query}`);
    const data = await res.json();
    setResults(data);
  };

  return (
    <div>
      <h2>Search Groups</h2>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((g) => (
          <li key={g._id}>{g.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchGroup;