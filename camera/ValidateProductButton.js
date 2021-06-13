import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icons/Icon";

export default function ValidateProductButton({ onPress, isDisabled }) {
  return (
    <TouchableOpacity style={styles.validateButton} onPress={onPress}>
      <Icon type="plain-validate" color={isDisabled ? "darkgrey" : "white"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  validateButton: {
    width: 100,
    height: 100,
    paddingTop: 25,
    alignItems: "center",
  },
});
