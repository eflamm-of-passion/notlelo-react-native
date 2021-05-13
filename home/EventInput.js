import React, { useState } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import i18n from "../i18n";
import Icon from "../icons/Icon";

export default function EventInput({
  setSelectedEventName,
  setShowEventInput,
  eventNameList,
  setEventNameList,
}) {
  const [inputEventName, setInputEventName] = useState("");

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
        <Icon type="round-validate" color="green" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.eventInputButton}
        onPress={() => {
          setInputEventName("");
          setShowEventInput(false);
        }}
      >
        <Icon type="round-cancel" color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
