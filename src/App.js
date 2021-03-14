import { useEffect, useState } from "react";
import "./App.css";

import CardList from "./componet/card-list/card-list.component.jsx";
import Pagination from "./componet/pagination/pagination.component";
import Search from "./componet/search-box/search-box.component";

import { USER_PER_PAGE } from "./componet/utils/constant";
import axios from "axios";

function App() {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [term, setTerm] = useState("");
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const fetchMonsters = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setLoading(false);
      setMonsters(res.data);

      setTotalPages(Math.ceil(res.data.length / USER_PER_PAGE));
    };
    fetchMonsters();
  }, []);

  const handleClick = (num) => {
    setPage(num);
  };

  const searchMonster = (items, term) => {
    if (term.length !== 0) {
      const filtered = items.filter((monster) =>
        monster.name.toLowerCase().includes(term.toLowerCase())
      );
      return filtered;
    } else {
      return items;
    }
  };

  const onUpdateSearch = (term) => {
    if (term) {
      setHide(true);
      setTerm(term);
    } else {
      setHide(false);
      setTerm("");
    }
  };
  const visibleMonsters = searchMonster(monsters, term);

  return (
    <div className="App">
      <h1>Monster Rolodex</h1>
      <Search onUpdateSearch={onUpdateSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardList monsters={term ? visibleMonsters : monsters} page={page} />
        </>
      )}
      {hide ? null : (
        <Pagination totalPages={totalPages} handleClick={handleClick} />
      )}
    </div>
  );
}

export default App;
