import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Svg, Path } from "react-native-svg";
import { useFonts } from "expo-font";
import i18n from "../i18n";

import DeleteEventView from "./DeleteEventView";

export default function SettingsScreen({ navigation, route }) {
  const { eventNameList, setEventNameList } = route.params;
  const [fontLoaded] = useFonts({
    CaveatBrush: require("../assets/fonts/CaveatBrush-Regular.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Svg fill="#fff" viewBox="0 0 330.002 330.002">
            <Path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
          </Svg>
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            styles.titleText,
            fontLoaded ? { fontFamily: "CaveatBrush" } : null,
          ]}
        >
          {i18n.t("home.settings")}
        </Text>
      </View>
      <View style={styles.settings}>
        <DeleteEventView
          eventNameList={eventNameList}
          setEventNameList={setEventNameList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 90,
    backgroundColor: "#003a5d",
  },
  titleText: {
    width: "80%",
    paddingTop: 20,
    paddingLeft: 10,
    color: "white",
    fontSize: 40,
    letterSpacing: 4,
  },
  goBackButton: {
    height: 40,
    width: 40,
    marginBottom: -15,
    transform: [{ rotate: "180deg" }],
  },
  settings: {
    flex: 1,
  },
});
