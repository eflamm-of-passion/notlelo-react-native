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
import { useFonts } from "expo-font";
import i18n from "../i18n";

import { getProducts } from "../event-service";
import EventInput from "./EventInput";
import EventPicker from "./EventPicker";
import LinkButton from "./LinkButton";
import Toast from "../components/Toast";

export default function HomeScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [eventNameList, setEventNameList] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [showEventInput, setShowEventInput] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [fontLoaded] = useFonts({
    CaveatBrush: require("../assets/fonts/CaveatBrush-Regular.ttf"),
  });

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
    if ([...eventNameSet].length) {
      if (
        ![...eventNameSet].includes(selectedEventName) &&
        !selectedEventName
      ) {
        setSelectedEventName([...eventNameSet][0]);
      }
    } else {
      setSelectedEventName([...eventNameSet][0]);
    }
  });

  const onPressNavigation = () => {
    if (!selectedEventName) {
      setToastMessage(i18n.t("home.navigationDisabled"));
      setToastVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/ripped-paper.png")}
        style={styles.title}
      >
        <Text
          style={[
            styles.titleText,
            fontLoaded ? { fontFamily: "CaveatBrush" } : null,
          ]}
        >
          {i18n.t("home.title")}
        </Text>
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
            onPress={onPressNavigation}
          />
          <LinkButton
            navigation={navigation}
            label={i18n.t("home.library")}
            component={"Library"}
            selectedEventName={selectedEventName}
            isDisabled={!selectedEventName}
            onPress={onPressNavigation}
          />
          <LinkButton
            navigation={navigation}
            label={i18n.t("home.settings")}
            component={"Settings"}
            eventNameList={eventNameList}
            isDisabled={!eventNameList}
          />
        </View>
      </View>
      <Toast
        title={toastMessage}
        type={"info"}
        visible={isToastVisible}
        setVisible={setToastVisible}
        timeout={5000}
      />
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
    marginTop: -25,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 100,
    lineHeight: 100,
    color: "white",
    letterSpacing: 7,
  },
  buttons: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  picker: {
    height: "20%",
    paddingTop: 20,
  },
  links: {
    justifyContent: "space-evenly",
    height: "80%",
    paddingTop: 20,
    paddingBottom: 40,
  },
});
