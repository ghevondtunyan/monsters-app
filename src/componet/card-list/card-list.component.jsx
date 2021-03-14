import React from "react";
import "../card-list/cardlist.style.css";

import { Card } from "../card/card.component";
import { USER_PER_PAGE } from "../utils/constant.js";

const CardList = ({ monsters, page }) => {
  const startIndex = (page - 1) * USER_PER_PAGE;
  const selectmonster = monsters.slice(startIndex, startIndex + USER_PER_PAGE);
  return (
    <div className="card-list">
      {selectmonster.map((monster) => (
        <Card key={monster.id} monster={monster} />
      ))}
    </div>
  );
};
export default CardList;
