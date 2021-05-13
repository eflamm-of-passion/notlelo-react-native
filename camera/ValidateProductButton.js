import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icons/Icon";

export default function ValidateProductButton({ openModal, isDisabled }) {
  return (
    <TouchableOpacity
      style={styles.validateButton}
      onPress={() => !isDisabled && openModal()}
    >
      <Icon type="plain-validate" color={isDisabled ? "darkgrey" : "white"} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  validateButton: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    marginRight: 45,
  },
});
