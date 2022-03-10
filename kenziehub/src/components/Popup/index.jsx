import React from "react";
import "./style.css";

const Popup = ({ handleClose, content }) => {
  return (
    <div className="box">
      <span className="x" onClick={handleClose}>
        x
      </span>
      {content}
    </div>
  );
};

export default Popup;
