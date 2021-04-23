import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

export default function LinkButton({
  navigation,
  label,
  component,
  selectedEventName,
}) {
  return (
    <TouchableOpacity
      style={styles.link}
      onPress={() =>
        navigation.navigate(component, { eventName: selectedEventName })
      }
    >
      <Text style={styles.buttonText}>{label}</Text>
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
    fontSize: 21,
    letterSpacing: 6,
    textTransform: "uppercase",
    color: "#404040",
  },
});
