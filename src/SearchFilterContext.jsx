import React, { createContext, useState } from "react";
const SearchFilterContext = createContext();
export const SearchFilterProvider = ({ children }) => {
  const [open, setOpen] = useState(
    localStorage.getItem("openSearchFilter") !== null
      ? JSON.parse(localStorage.getItem("openSearchFilter"))
      : false
  );
  const [result, setResult] = useState(
    localStorage.getItem("searchResult") !== null
      ? JSON.parse(localStorage.getItem("searchResult"))
      : ""
  );
  return (
    <SearchFilterContext.Provider value={{ open, setOpen, result, setResult }}>
      {children}
    </SearchFilterContext.Provider>
  );
};
export default SearchFilterContext;
