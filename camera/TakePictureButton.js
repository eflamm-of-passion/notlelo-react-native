import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icons/Icon";

export default function TakePictureButton({ onClickTakePicture, isDisabled }) {
  return (
    <TouchableOpacity
      style={styles.takePictureButton}
      onPress={() => onClickTakePicture()}
    >
      <Icon
        width={100}
        height={100}
        type="take-picture"
        color={isDisabled ? "grey" : "snow"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  takePictureButton: {
    width: 150,
    height: 125,
    alignItems: "center",
  },
});
