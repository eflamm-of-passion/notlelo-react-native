import React from "react";
import { Svg, Path } from "react-native-svg";

export default function Info({ color, width, height }) {
  return (
    <Svg
      width={width ?? 40}
      height={height ?? 40}
      viewBox="0 0 460 460"
      style="enable-background:new 0 0 460 460;"
      fill={color ?? "grey"}
    >
      <Path
        d="M230,0C102.975,0,0,102.975,0,230s102.975,230,230,230s230-102.974,230-230S357.025,0,230,0z M268.333,377.36
			c0,8.676-7.034,15.71-15.71,15.71h-43.101c-8.676,0-15.71-7.034-15.71-15.71V202.477c0-8.676,7.033-15.71,15.71-15.71h43.101
			c8.676,0,15.71,7.033,15.71,15.71V377.36z M230,157c-21.539,0-39-17.461-39-39s17.461-39,39-39s39,17.461,39,39
			S251.539,157,230,157z"
      />
    </Svg>
  );
}
