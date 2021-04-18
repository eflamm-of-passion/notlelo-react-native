import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Circle } from "react-native-svg";

export default function TakePictureButton({ onClickTakePicture }) {
  return (
    <TouchableOpacity
      style={styles.takePictureButton}
      onPress={() => onClickTakePicture()}
    >
      <Svg height="40%" width="40%" viewBox="0 0 98 98">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="darkgrey"
          strokeWidth="5"
          fill="lightgray"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  takePictureButton: {
    flex: 5,
    alignSelf: "center",
    alignItems: "center",
  },
});
