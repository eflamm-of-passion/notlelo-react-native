import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useFonts } from "expo-font";

export default function LinkButton({
  navigation,
  label,
  component,
  selectedEventName,
  eventNameList,
  isDisabled,
  onPress,
}) {
  const [fontLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway.ttf"),
  });

  const handleOnPress = () => {
    onPress && onPress();
    !isDisabled &&
      navigation.navigate(component, {
        eventName: selectedEventName,
        eventNameList: eventNameList,
      });
  };

  return (
    <TouchableOpacity style={styles.link} onPress={() => handleOnPress()}>
      <Text
        style={[
          styles.buttonText,
          isDisabled && styles.disabledButtonText,
          fontLoaded && { fontFamily: "Raleway" },
        ]}
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
    color: "darkgray",
    marginBottom: 25,
  },
  buttonText: {
    fontSize: 23,
    letterSpacing: 3,
    color: "#404040",
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  disabledButtonText: {
    color: "lightgrey",
  },
});
