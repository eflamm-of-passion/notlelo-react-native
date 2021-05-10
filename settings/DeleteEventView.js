import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import i18n from "../i18n";

import { deleteEvent } from "../event-service";
import DeleteButton from "../components/DeleteButton";

export default function DeleteEventView({ eventNameList }) {
  // FIX the eventNameList is not updated after deletion, so localEventList is used as a workaround
  const [localEventList, setLocalEventList] = useState(eventNameList);
  const [eventNameListToDelete, setEventNameListToDelete] = useState([]);

  const handleDeleteButtonClick = (eventNameList) => {
    for (const eventName of eventNameList) {
      deleteEvent(eventName);
      const eventListUpdated = localEventList.filter(
        (anEventName) => eventName !== anEventName
      );
      setLocalEventList(eventListUpdated);
    }
    setEventNameListToDelete([]);
  };

  const switchEventNameToDelete = (eventName) => {
    if (eventNameListToDelete.includes(eventName)) {
      // remove the eventName
      setEventNameListToDelete(
        eventNameListToDelete.filter(
          (eventNameToDelete) => eventNameToDelete !== eventName
        )
      );
    } else {
      // add the eventName
      setEventNameListToDelete([eventName].concat(eventNameListToDelete));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t("settings.deleteEvent")}</Text>
      <View style={styles.events}>
        {localEventList.map((eventName, index) => (
          <View style={styles.eventLine} key={index}>
            <Checkbox
              style={styles.checkbox}
              value={eventNameListToDelete.includes(eventName)}
              onValueChange={() => switchEventNameToDelete(eventName)}
              color={eventNameListToDelete.includes(eventName) ? "red" : "grey"}
            />
            <Text
              style={[
                styles.eventName,
                {
                  color: eventNameListToDelete.includes(eventName)
                    ? "red"
                    : "grey",
                },
              ]}
            >
              {eventName}
            </Text>
          </View>
        ))}
        {!localEventList.length && (
          <Text style={styles.noCampText}>{i18n.t("settings.noCamp")}</Text>
        )}
        <View style={styles.deleteButton}>
          <DeleteButton
            label={"Supprimer"}
            isDisabled={!eventNameListToDelete.length}
            itemToDelete={eventNameListToDelete}
            onClick={handleDeleteButtonClick}
          />
        </View>
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
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    paddingRight: 30,
  },
  eventName: {
    width: "90%",
    fontSize: 22,
    color: "red",
    textAlign: "center",
    letterSpacing: 1,
  },
  checkbox: {
    marginLeft: 20,
  },
  deleteButton: {
    marginTop: 20,
    alignSelf: "center",
    width: "65%",
  },
  noCampText: {
    color: "darkgrey",
    fontSize: 16,
    fontStyle: "italic",
    alignSelf: "center",
  },
});
