import React, { useEffect, useState } from "react";
import gifCharizard from "../assets/loadingCharizard.gif";

function LoadingModal() {
  return (
    <div>
      <img
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src={gifCharizard}
        alt="Charizard Loading"
      />
    </div>
  );
}

export default LoadingModal;
