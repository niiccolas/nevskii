import React from 'react';
import { GiMagnifyingGlass } from 'react-icons/gi';

import './SearchBar.scss';

export const SearchBar = () => {
  return (
    <div className="SearchBar">
      <h2>SearchBAR</h2>
      <GiMagnifyingGlass />
      <input
        type="search"
        name="SearchBar"
        id="SearchBar"
        placeholder="🔍  Search movie…"
      />
    </div>
  );
};

// Variation based on size
