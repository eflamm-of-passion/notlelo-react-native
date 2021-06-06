import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import i18n from "../i18n";

import { deleteEvent } from "../event-service";
import Icon from "../icons/Icon";
import Toast from "../components/Toast";
import { secondaryColor } from "../global";

export default function DeleteEventView({ eventNameList }) {
  // the eventNameList is not updated after deletion, so localEventList is used as a workaround
  const [localEventList, setLocalEventList] = useState(eventNameList);
  const [eventNameListToDelete, setEventNameListToDelete] = useState([]);
  const [isToastVisible, setToastVisible] = useState(false);

  const handleDeleteButtonClick = (eventNameList) => {
    for (const eventName of eventNameList) {
      deleteEvent(eventName);
      const eventListUpdated = localEventList.filter(
        (anEventName) => eventName !== anEventName
      );
      setLocalEventList(eventListUpdated);
    }
    setEventNameListToDelete([]);
    setToastVisible(true);
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
        <DeleteButton
          isDisabled={eventNameListToDelete.length === 0}
          onClick={handleDeleteButtonClick}
          list={eventNameListToDelete}
        />
      </View>
      <Toast
        title={i18n.t("settings.deleteSuccess")}
        type={"success"}
        visible={isToastVisible}
        setVisible={setToastVisible}
        timeout={5000}
      />
    </View>
  );
}

const DeleteButton = ({ isDisabled, onClick, list }) => {
  return (
    <View style={styles.deleteButton}>
      <TouchableOpacity
        style={[
          styles.plainButton,
          {
            backgroundColor: isDisabled ? "darkgrey" : "red",
          },
        ]}
        onPress={() => !isDisabled && onClick(list)}
      >
        <Text style={styles.label}>{i18n.t("settings.delete")}</Text>
        <View style={styles.deleteButtonIcon}>
          <Icon type="garbage" color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    paddingLeft: 10,
    marginTop: 15,
    letterSpacing: 1,
    color: secondaryColor,
  },
  events: {
    flex: 0,
    margin: 5,
  },
  eventLine: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "100%",
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
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    width: "65%",
  },
  noCampText: {
    color: "darkgrey",
    fontSize: 16,
    fontStyle: "italic",
    alignSelf: "center",
  },
  plainButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 5,
  },
  label: {
    color: "white",
    fontSize: 22,
    letterSpacing: 1,
    paddingRight: 15,
  },
  deleteButtonIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
