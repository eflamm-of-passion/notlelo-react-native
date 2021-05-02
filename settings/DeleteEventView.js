import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import i18n from "../i18n";

import { deleteEvent } from "../event-service";
import DeleteButton from "../components/DeleteButton";

export default function DeleteEventView({ eventNameList }) {
  // FIX the eventNameList is not updated after deletion, so localEventList is used as a workaround
  const [localEventList, setLocalEventList] = useState(eventNameList);
  const handleClick = (eventToDeleteName) => {
    deleteEvent(eventToDeleteName);
    const eventListUpdated = localEventList.filter(
      (eventName) => eventToDeleteName !== eventName
    );
    setLocalEventList(eventListUpdated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("settings.deleteEvent")}</Text>
      <View style={styles.events}>
        {localEventList.map((eventName, index) => (
          <View style={styles.eventLine} key={index}>
            <Text style={styles.eventName}>{eventName}</Text>
            <DeleteButton
              itemToDelete={eventName}
              onClick={() => handleClick(eventName)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 1,
    color: "#404040",
  },
  events: {
    flex: 1,
    margin: 5,
  },
  eventLine: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
    justifyContent: "space-between",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingRight: 30,
  },
  eventName: {
    fontSize: 21,
    marginLeft: 20,
    color: "red",
    letterSpacing: 1,
  },
});
