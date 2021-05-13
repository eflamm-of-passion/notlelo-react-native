import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icons/Icon";

export default function CancelTakingPictureButton({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.cancelButton}
      onPress={() => navigation.goBack()}
    >
      <Icon type="right-arrow" color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    flex: 1,
    width: 50,
    height: 50,
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 40,
    transform: [{ rotate: "180deg" }],
  },
});
