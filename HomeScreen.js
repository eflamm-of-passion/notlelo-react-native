import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import i18n from "./i18n";
import { getProducts } from "./EventService";

export default function HomeScreen({ navigation }) {
  const [eventNameList, setEventNameList] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(async () => {
    const productList = await getProducts();
    const eventNameSet = new Set();
    for (const product of productList) {
      eventNameSet.add(product.event);
    }
    setEventNameList([...eventNameSet]);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/ripped-paper.png")}
        style={styles.title}
      >
        <Text style={styles.titleText}>{i18n.t("home.title")}</Text>
      </ImageBackground>
      <View style={styles.buttons}>
        <View style={styles.eventPicker}>
          <Picker
            style={styles.picker}
            selectedValue={selectedEventName}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedEventName(itemValue)
            }
          >
            <Picker.Item
              label={i18n.t("home.noEvent")}
              value={null}
              color="grey"
            />
            {eventNameList.map((eventName, index) => (
              <Picker.Item
                key={index}
                label={eventName}
                value={eventName}
                color="black"
              />
            ))}
          </Picker>
          <TouchableOpacity style={styles.plusButton}>
            <Svg fill="#003a5d" viewBox="0 0 122.88 122.75">
              <Path d="M44.63,0H78.25a4,4,0,0,1,4,4V40.57h36.64a4,4,0,0,1,4,4V78.18a4,4,0,0,1-4,4H82.24v36.58a4,4,0,0,1-4,4H44.63a4,4,0,0,1-4-4V82.18H4a4,4,0,0,1-4-4V44.56a4,4,0,0,1,4-4H40.63V4a4,4,0,0,1,4-4Z" />
            </Svg>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.link}
          onPress={() =>
            navigation.navigate("Camera", { eventName: selectedEventName })
          }
        >
          <Text style={styles.buttonText}>{i18n.t("home.camera")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() =>
            navigation.navigate("Library", { eventName: selectedEventName })
          }
        >
          <Text style={styles.buttonText}>{i18n.t("home.library")}</Text>
        </TouchableOpacity>
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
    paddingBottom: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  eventPicker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 240,
    height: 60,
  },
  plusButton: {
    height: 23,
    width: 23,
  },
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
