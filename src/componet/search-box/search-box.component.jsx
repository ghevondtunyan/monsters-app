import { useState } from "react";
import "./search-box.style.css";

const Search = ({ onUpdateSearch }) => {
  const [term, setTerm] = useState("");
  const onUpdate = (e) => {
    const term = e.target.value;
    setTerm(term);
    onUpdateSearch(term);
  };
  return (
    <input
      className="search"
      type="search"
      placeholder="Search monsters"
      onChange={onUpdate}
      value={term}
    />
  );
};
export default Search;
