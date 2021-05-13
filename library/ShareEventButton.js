import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { shareEvent } from "../event-service";
import Icon from "../icons/Icon";

export default function ShareEventButton({ event, setSharingInProgress }) {
  const handleShareEventClick = async (event) => {
    setSharingInProgress(true);
    await shareEvent(event);
    setSharingInProgress(false);
  };

  return (
    <TouchableOpacity
      style={styles.shareEventButton}
      onPress={() => handleShareEventClick(event.name)}
    >
      <Icon type="share" color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shareEventButton: {
    alignSelf: "center",
    width: 35,
    height: 35,
    marginTop: 10,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
