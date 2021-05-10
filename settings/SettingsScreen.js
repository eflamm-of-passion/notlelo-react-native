import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as app from "../app.json";
import i18n from "../i18n";
import { primaryColor } from "../global";

import DeleteEventView from "./DeleteEventView";
import TopBar from "../components/TopBar";

export default function SettingsScreen({ navigation, route }) {
  const { eventNameList, setEventNameList } = route.params;

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} title={i18n.t("home.settings")} />
      <View style={styles.settings}>
        <DeleteEventView
          eventNameList={eventNameList}
          setEventNameList={setEventNameList}
        />
      </View>
      <Text style={styles.version}>v{app.expo.version}</Text>
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
    backgroundColor: primaryColor,
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
  version: {
    textAlign: "center",
    backgroundColor: "white",
    color: "grey",
    paddingBottom: 10,
  },
});
