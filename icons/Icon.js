import React from "react";

import Clear from "./icons/Clear";
import Error from "./icons/Error";
import Garbage from "./icons/Garbage";
import Info from "./icons/Info";
import PlainCross from "./icons/PlainCross";
import PlainValidate from "./icons/PlainValidate";
import Arrow from "./icons/RightArrow";
import RoundCancel from "./icons/RoundCancel";
import RoundPlus from "./icons/RoundPlus";
import RoundValidate from "./icons/RoundValidate";
import Share from "./icons/Share";
import Success from "./icons/Success";
import TakePicture from "./icons/TakePicture";

export default function Icon({ type, color, width, height, rotation }) {
  switch (type) {
    case "clear":
      return <Clear color={color} />;
    case "error":
      return <Error color={color} width={width} height={height} />;
    case "garbage":
      return <Garbage color={color} />;
    case "info":
      return <Info color={color} width={width} height={height} />;
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
      return (
        <Arrow
          color={color}
          width={width}
          height={height}
          rotation={rotation}
        />
      );
    case "share":
      return <Share color={color} width={width} height={height} />;
    case "success":
      return <Success color={color} width={width} height={height} />;
    case "take-picture":
      return <TakePicture color={color} width={width} height={height} />;
    default:
      return null;
  }
}
