import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function LinkButton({
  navigation,
  label,
  component,
  selectedEventName,
  isDisabled,
}) {
  return (
    <TouchableOpacity
      style={styles.link}
      onPress={() =>
        !isDisabled &&
        navigation.navigate(component, { eventName: selectedEventName })
      }
    >
      <Text
        style={[styles.buttonText, isDisabled && styles.disabledButtonText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  link: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    color: "darkgray",
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#404040",
  },
  disabledButtonText: {
    color: "lightgrey",
  },
});
