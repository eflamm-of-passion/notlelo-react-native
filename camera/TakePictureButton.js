import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icons/Icon";

export default function TakePictureButton({ onClickTakePicture, isDisabled }) {
  return (
    <TouchableOpacity
      style={styles.takePictureButton}
      onPress={() => onClickTakePicture()}
    >
      <Icon type="take-picture" color={isDisabled ? "grey" : "snow"} />
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
