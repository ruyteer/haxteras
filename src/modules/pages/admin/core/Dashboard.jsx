import React, { useEffect, useState } from "react";
import Navbar from "../../../components/admin/Navbar";
import Cards from "../../../components/admin/Cards";
import { CardsObject } from "../../../helpers/cards-object";

function Dashboard() {
  const [cardList, setCardList] = useState([{}]);

  const handleGet = () => {
    setCardList(CardsObject.filter((result) => result.type === "home"));
  };

  useEffect(() => {
    handleGet();
  }, []);
  return (
    <div className="dashboard">
      <Navbar />
      <Cards cardsList={cardList} />
    </div>
  );
}

export default Dashboard;
