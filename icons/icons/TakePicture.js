import React from "react";
import { Svg, Circle } from "react-native-svg";

export default function TakePicture({ color }) {
  return (
    <Svg height="40%" width="40%" viewBox="0 0 98 98">
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke="silver"
        strokeWidth="5"
        fill={color}
      />
    </Svg>
  );
}
