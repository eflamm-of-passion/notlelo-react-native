import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Svg, Polyline, Line, Path } from "react-native-svg";

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
      <Svg
        fill="none"
        stroke={iconColor()}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <Polyline points="3 6 5 6 21 6" />
        <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <Line x1="10" x2="10" y1="11" y2="17" />
        <Line x1="14" x2="14" y1="11" y2="17" />
      </Svg>
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
