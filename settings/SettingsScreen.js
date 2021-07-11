import React from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";

import * as app from "../app.json";
import i18n from "../i18n";

import DeleteEventView from "./DeleteEventView";
import FrequentlyAskedQuestionView from "./FrequentlyAskedQuestionView";
import TopBar from "../components/TopBar";
import { primaryColor, secondaryColor } from "../global";

function HorizontalRule() {
  return (
    <View
      style={{
        alignSelf: "center",
        width: "90%",
        borderBottomColor: "lightgrey",
        borderBottomWidth: 1,
        marginTop: 20,
        marginBottom: 20,
      }}
    />
  );
}

function ContactMe() {
  const [fontLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway.ttf"),
    Sarabun: require("../assets/fonts/Sarabun.ttf"),
  });

  const email = "mailto:eflamm.ollivier@gmail.com";
  const handlePress = () => {
    Linking.openURL(email);
  };

  return (
    <View>
      <Text
        style={[styles.aboutTitle, fontLoaded && { fontFamily: "Raleway" }]}
      >
        {i18n.t("settings.about")}
      </Text>
      <Text
        style={[
          styles.aboutDescription,
          fontLoaded && { fontFamily: "Sarabun" },
        ]}
      >
        {i18n.t("settings.aboutDescription")}
      </Text>
      <TouchableOpacity style={styles.contactMeButton} onPress={handlePress}>
        <Text style={styles.contactMeButtonText}>
          {i18n.t("settings.clickHere")}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.signature, fontLoaded && { fontFamily: "Sarabun" }]}>
        {i18n.t("settings.signature")}
      </Text>
    </View>
  );
}

function VersionNumber() {
  return <Text style={styles.version}>v{app.expo.version}</Text>;
}

export default function SettingsScreen({ navigation, route }) {
  const { eventNameList, setEventNameList } = route.params;

  return (
    <ScrollView style={styles.container}>
      <TopBar navigation={navigation} title={i18n.t("home.settings")} />
      <DeleteEventView
        eventNameList={eventNameList}
        setEventNameList={setEventNameList}
      />
      <HorizontalRule />
      <FrequentlyAskedQuestionView />
      <ContactMe />
      <VersionNumber />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    backgroundColor: "white",
  },
  aboutTitle: {
    fontSize: 28,
    paddingLeft: 10,
    marginTop: 15,
    letterSpacing: 1,
    color: secondaryColor,
  },
  aboutDescription: {
    fontSize: 16,
    letterSpacing: 1,
    color: secondaryColor,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 8,
    textAlign: "center",
  },
  signature: {
    width: "75%",
    alignSelf: "center",
    fontSize: 14,
    letterSpacing: 1,
    color: "darkgrey",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    textAlign: "center",
  },
  contactMeButton: {
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    marginLeft: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: primaryColor,
  },
  contactMeButtonText: {
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },
  version: {
    textAlign: "center",
    backgroundColor: "white",
    color: "grey",
    paddingTop: 10,
  },
});
