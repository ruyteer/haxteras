import React, { useEffect, useState } from "react";
import PixBodyBot from "../../../components/pix/PixBodyBot";
import { AllHeader } from "../../../components/header/AllHeader";

function PixBot({ botType }) {
  const botData = JSON.parse(sessionStorage.getItem("dashbotData"));

  return (
    <>
      <AllHeader />
      <div className="pix-page">
        <PixBodyBot botData={botData} botType={botType} />
      </div>
    </>
  );
}

export default PixBot;
