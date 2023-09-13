import React, { useState } from "react";
import "./RightSide.css";

import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import NavIcons from "../NavIcons/NavIcons";
 
const RightSide = () => {
  // Define a state variable to manage the visibility of the share modal
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
      {/* Side Navbar */}
      <NavIcons />
      
      <div className="container">
              {/* TrendCard */}
            <TrendCard />
      </div>


      {/* Share button */}
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      
      {/* ShareModal component */}
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
