import React, { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import i18n from "../i18n";

import { getProducts } from "../event-service";
import EventInput from "./EventInput";
import EventPicker from "./EventPicker";
import LinkButton from "./LinkButton";

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [eventNameList, setEventNameList] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [showEventInput, setShowEventInput] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [isFocused]);

  const fetchProducts = useCallback(async () => {
    const productList = await getProducts();
    const eventNameSet = new Set();
    for (const product of productList) {
      eventNameSet.add(product.event);
    }
    setEventNameList([...eventNameSet]);
    [...eventNameSet].length
      ? setSelectedEventName([...eventNameSet][0])
      : null;
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/ripped-paper.png")}
        style={styles.title}
      >
        <Text style={styles.titleText}>{i18n.t("home.title")}</Text>
      </ImageBackground>

      <View style={styles.buttons}>
        <View style={styles.picker}>
          {showEventInput ? (
            <EventInput
              setSelectedEventName={setSelectedEventName}
              setShowEventInput={setShowEventInput}
              eventNameList={eventNameList}
              setEventNameList={setEventNameList}
            />
          ) : (
            <EventPicker
              setShowEventInput={setShowEventInput}
              eventNameList={eventNameList}
              selectedEventName={selectedEventName}
              setSelectedEventName={setSelectedEventName}
            />
          )}
        </View>
        <View style={styles.links}>
          <LinkButton
            navigation={navigation}
            label={i18n.t("home.camera")}
            component={"Camera"}
            selectedEventName={selectedEventName}
            isDisabled={!selectedEventName}
          />
          <LinkButton
            navigation={navigation}
            label={i18n.t("home.library")}
            component={"Library"}
            selectedEventName={selectedEventName}
            isDisabled={!selectedEventName}
          />
          <LinkButton
            navigation={navigation}
            label={i18n.t("home.settings")}
            component={"Settings"}
            eventNameList={eventNameList}
            setEventNameList={setEventNameList}
            isDisabled={!eventNameList}
          />
        </View>
      </View>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    minHeight: Math.round(Dimensions.get("window").height), // the keyboard does not push up
  },
  title: {
    flex: 1,
    width: "100%",
    marginTop: -30,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    width: "80%",
    textAlign: "center",
    fontSize: 70,
    lineHeight: 100,
    color: "white",
    letterSpacing: 7,
    textShadowColor: "white",
    textShadowRadius: 4,
  },
  buttons: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: "20%",
  },
  links: {
    justifyContent: "space-evenly",
    height: "80%",
    paddingTop: 20,
    paddingBottom: 40,
  },
});
