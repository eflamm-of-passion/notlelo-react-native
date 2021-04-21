import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Dimensions,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { Picker } from "@react-native-picker/picker";
import { StatusBar } from "expo-status-bar";
import i18n from "./i18n";
import { getProducts } from "./EventService";

export default function HomeScreen({ navigation }) {
  const [eventNameList, setEventNameList] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState(null);
  const [inputEventName, setInputEventName] = useState(null);
  const [showEventInput, setShowEventInput] = useState(false);

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

  const displayEventPicker = () => {
    return (
      <View style={styles.eventPicker}>
        <Picker
          style={styles.picker}
          selectedValue={selectedEventName}
          onValueChange={(itemValue) => setSelectedEventName(itemValue)}
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
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setShowEventInput(true)}
        >
          <Svg fill="#003a5d" viewBox="0 0 52 52">
            <Path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2 s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2 S39.604,28,38.5,28z" />
          </Svg>
        </TouchableOpacity>
      </View>
    );
  };

  const displayEventInput = () => {
    return (
      <View style={styles.eventInputTextContainer}>
        <TextInput
          placeholder={i18n.t("home.eventInputPlaceholder")}
          style={styles.eventInputText}
          onChangeText={(text) => setInputEventName(text)}
        />
        <TouchableOpacity
          style={styles.eventInputButton}
          onPress={() => {
            setSelectedEventName(inputEventName);
            setEventNameList([inputEventName].concat(eventNameList));
            setShowEventInput(false);
          }}
        >
          <Svg fill="green" viewBox="0 0 330 330">
            <Path d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300 c-74.44,0-135-60.561-135-135S90.56,30,165,30s135,60.561,135,135S239.439,300,165,300z" />
            <Path d="M226.872,106.664l-84.854,84.853l-38.89-38.891c-5.857-5.857-15.355-5.858-21.213-0.001 c-5.858,5.858-5.858,15.355,0,21.213l49.496,49.498c2.813,2.813,6.628,4.394,10.606,4.394c0.001,0,0,0,0.001,0 c3.978,0,7.793-1.581,10.606-4.393l95.461-95.459c5.858-5.858,5.858-15.355,0-21.213 C242.227,100.807,232.73,100.806,226.872,106.664z" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.eventInputButton}
          onPress={() => {
            setInputEventName("");
            setShowEventInput(false);
          }}
        >
          <Svg fill="red" viewBox="0 0 489 489">
            <Path d="M244.5,0C109.3,0,0,109.3,0,244.5S109.3,489,244.5,489S489,379.7,489,244.5S379.7,0,244.5,0z M244.5,448.4 c-112.4,0-203.9-91.5-203.9-203.9S132.1,40.6,244.5,40.6s203.9,91.5,203.9,203.9S356.9,448.4,244.5,448.4z" />
            <Path d="M354.8,134.2c-8.3-8.3-20.8-8.3-29.1,0l-81.2,81.2l-81.1-81.1c-8.3-8.3-20.8-8.3-29.1,0s-8.3,20.8,0,29.1l81.1,81.1 l-81.1,81.1c-8.3,8.3-8.6,21.1,0,29.1c6.5,6,18.8,10.4,29.1,0l81.1-81.1l81.1,81.1c12.4,11.7,25,4.2,29.1,0 c8.3-8.3,8.3-20.8,0-29.1l-81.1-81.1l81.1-81.1C363.1,155,363.1,142.5,354.8,134.2z" />
          </Svg>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/ripped-paper.png")}
        style={styles.title}
      >
        <Text style={styles.titleText}>{i18n.t("home.title")}</Text>
      </ImageBackground>
      <View style={styles.buttons}>
        {showEventInput ? displayEventInput() : displayEventPicker()}
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
    height: 30,
    width: 30,
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
  eventInputTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  eventInputText: {
    width: 240,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  eventInputButton: {
    height: 40,
    width: 40,
    paddingLeft: 10,
  },
});
