import React from "react";

import Clear from "./icons/Clear";
import Garbage from "./icons/Garbage";
import PlainCross from "./icons/PlainCross";
import PlainValidate from "./icons/PlainValidate";
import RightArrow from "./icons/RightArrow";
import RoundCancel from "./icons/RoundCancel";
import RoundPlus from "./icons/RoundPlus";
import RoundValidate from "./icons/RoundValidate";
import Share from "./icons/Share";
import TakePicture from "./icons/TakePicture";

export default function Icon({ type, color }) {
  switch (type) {
    case "clear":
      return <Clear color={color} />;
    case "garbage":
      return <Garbage color={color} />;
    case "plain-cross":
      return <PlainCross color={color} />;
    case "plain-validate":
      return <PlainValidate color={color} />;
    case "round-plus":
      return <RoundPlus color={color} />;
    case "round-validate":
      return <RoundValidate color={color} />;
    case "round-cancel":
      return <RoundCancel color={color} />;
    case "right-arrow":
      return <RightArrow color={color} />;
    case "share":
      return <Share color={color} />;
    case "take-picture":
      return <TakePicture color={color} />;
    default:
      return null;
  }
}
