import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icons/Icon";

export default function CancelTakingPictureButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.cancelButton}
      onPress={() => navigation.goBack()}
    >
      <Icon
        type="right-arrow"
        color="white"
        width={50}
        height={50}
        rotation={180}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    paddingTop: 25,
    width: 100,
    height: 100,
    alignItems: "center",
  },
});
