import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";

export default function CancelTakingPictureButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.cancelButton}
      onPress={() => navigation.goBack()}
    >
      <Svg width="50" height="50" viewBox="0 0 20 20" fill="white">
        <Path
          fill="none"
          stroke="lightgray"
          stroke-width="1.06"
          d="M16,16 L4,4"
        ></Path>
        <Path
          fill="none"
          stroke="lightgray"
          stroke-width="1.06"
          d="M16,4 L4,16"
        ></Path>
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 40,
  },
});
