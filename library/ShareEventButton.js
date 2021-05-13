import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { shareEvent } from "../event-service";
import Icon from "../icons/Icon";
import Toast from "../components/Toast";
import i18n from "../i18n";

export default function ShareEventButton({ event, setSharingInProgress }) {
  const [isToastVisible, setToastVisible] = useState(false);

  const handleShareEventClick = async (event) => {
    setSharingInProgress(true);
    await shareEvent(event);
    setSharingInProgress(false);

    setToastVisible(true);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.shareEventButton}
        onPress={() => handleShareEventClick(event.name)}
      >
        <Icon type="share" color="white" />
      </TouchableOpacity>
      <Toast
        title={i18n.t("library.shareSuccess")}
        type={"success"}
        visible={isToastVisible}
        setVisible={setToastVisible}
        timeout={8000}
      />
    </View>
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
