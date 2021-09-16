import React, { useState } from 'react';
import Aside from "../components/Aside";
import NameCatPairRate from "../components/NameCatPairRate";

function CatNameLabel({ userId }) {

  const [rtl, setRtl] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
      <Aside/>
      <NameCatPairRate
        userId={userId}
      />
    </div>
  );
}

export default CatNameLabel;
