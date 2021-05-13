import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";

import Icon from "../icons/Icon";
import { primaryColor } from "../global";

export default function TopBar({ navigation, title, children }) {
  const [fontLoaded] = useFonts({
    CaveatBrush: require("../assets/fonts/CaveatBrush-Regular.ttf"),
  });
  return (
    <View style={styles.title}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Icon type="right-arrow" color="white" />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[
          styles.titleText,
          fontLoaded ? { fontFamily: "CaveatBrush" } : null,
        ]}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 90,
    backgroundColor: primaryColor,
  },
  titleText: {
    width: "75%",
    paddingTop: 20,
    paddingLeft: 10,
    color: "white",
    fontSize: 45,
    letterSpacing: 1,
  },
  goBackButton: {
    alignItems: "center",
    height: 40,
    width: 50,
    marginBottom: -15,
    transform: [{ rotate: "180deg" }],
  },
});
