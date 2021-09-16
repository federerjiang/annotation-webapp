import React, { useState } from "react";
import Aside from "../components/Aside";
import NameCatSelect from "../components/NameCatSelect";

function EvalNameLabel({ userId }) {
  const [rtl, setRtl] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className={`app ${rtl ? "rtl" : ""} ${toggled ? "toggled" : ""}`}>
      <Aside />
      <NameCatSelect userId={userId} />
    </div>
  );
}

export default EvalNameLabel;
