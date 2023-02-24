import { ArrowLeft } from "phosphor-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const GoBackArrow = () => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Link
      to="/"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="back-button">
        <ArrowLeft size={24} weight={hovered ? "bold" : "regular"} />
      </button>
    </Link>
  );
};

export default GoBackArrow;
