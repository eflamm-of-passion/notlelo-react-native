import React from "react";
import { Svg, Polyline, Line, Path } from "react-native-svg";

export default function Garbage({ color }) {
  return (
    <Svg
      fill="none"
      stroke={color ?? "red"}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
    >
      <Polyline points="3 6 5 6 21 6" />
      <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <Line x1="10" x2="10" y1="11" y2="17" />
      <Line x1="14" x2="14" y1="11" y2="17" />
    </Svg>
  );
}
