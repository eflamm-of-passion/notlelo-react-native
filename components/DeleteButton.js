import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Svg, Polyline, Line, Path } from "react-native-svg";

import Icon from "../icons/Icon";

function DeleteIcon({ itemToDelete, onClick, isDisabled, isPlain }) {
  const iconColor = () => {
    if (isPlain) {
      return isDisabled ? "grey" : "red";
    } else {
      return "white";
    }
  };

  return (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => !isDisabled && onClick(itemToDelete)}
    >
      <Icon type="garbage" color="red" />
    </TouchableOpacity>
  );
}

export default function DeleteButton({
  label,
  itemToDelete,
  onClick,
  isDisabled,
}) {
  return label ? (
    <TouchableOpacity
      style={[
        styles.plainButton,
        { backgroundColor: isDisabled ? "darkgrey" : "red" },
      ]}
      onPress={() => !isDisabled && onClick(itemToDelete)}
    >
      <Text style={styles.label}>Supprimer</Text>
      <DeleteIcon
        isPlain={false}
        onClick={() => !isDisabled && onClick(itemToDelete)}
      />
    </TouchableOpacity>
  ) : (
    <DeleteIcon
      itemToDelete={itemToDelete}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  );
}

const styles = StyleSheet.create({
  plainButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 5,
  },
  label: {
    color: "white",
    fontSize: 22,
    letterSpacing: 1,
    paddingRight: 15,
  },
  deleteButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
