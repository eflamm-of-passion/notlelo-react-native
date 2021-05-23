import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as app from "../app.json";
import i18n from "../i18n";
import { primaryColor } from "../global";

import DeleteEventView from "./DeleteEventView";
import FrequentlyAskedQuestionView from "./FrequentlyAskedQuestionView";
import TopBar from "../components/TopBar";

export default function SettingsScreen({ navigation, route }) {
  const { eventNameList, setEventNameList } = route.params;

  return (
    <View style={styles.container}>
      <TopBar navigation={navigation} title={i18n.t("home.settings")} />
      <DeleteEventView
        eventNameList={eventNameList}
        setEventNameList={setEventNameList}
      />
      <FrequentlyAskedQuestionView />
      <Text style={styles.version}>v{app.expo.version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  version: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    backgroundColor: "white",
    color: "grey",
    paddingBottom: 10,
  },
});
