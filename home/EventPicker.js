import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import i18n from "../i18n";

import { primaryColor } from "../global";
import Icon from "../icons/Icon";

export default function EventPicker({
  setShowEventInput,
  eventNameList,
  selectedEventName,
  setSelectedEventName,
}) {
  return (
    <View style={styles.eventPicker}>
      <Picker
        style={styles.picker}
        selectedValue={selectedEventName}
        onValueChange={(itemValue) => {
          setSelectedEventName(itemValue);
        }}
      >
        {!eventNameList.length || selectedEventName === "" ? (
          <Picker.Item
            label={i18n.t("home.noEvent")}
            value={null}
            color="grey"
          />
        ) : (
          eventNameList.map((eventName, index) => (
            <Picker.Item
              key={index}
              label={eventName}
              value={eventName}
              color="black"
            />
          ))
        )}
      </Picker>

      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => setShowEventInput(true)}
      >
        <Icon type="round-plus" color={primaryColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  eventPicker: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 240,
    height: 60,
    marginRight: 10,
  },
  plusButton: {
    height: 30,
    width: 30,
  },
});
