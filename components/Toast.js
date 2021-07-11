import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import { useFonts } from "expo-font";

import Icon from "../icons/Icon";

export default function Toast({ title, type, timeout, visible, setVisible }) {
  const [fontLoaded] = useFonts({
    Sarabun: require("../assets/fonts/Sarabun.ttf"),
  });

  useEffect(() => {
    setTimeout(
      () => {
        setVisible(false);
      },
      timeout ? timeout : 5000
    );
  }, [visible]);

  let backgroundColor = "lightgrey";
  let outlineColor = "grey";
  let icon = null;
  switch (type) {
    case "success":
      backgroundColor = "#63db83";
      outlineColor = "green";
      icon = "success";
      break;
    case "error":
      backgroundColor = "#ed3b50";
      outlineColor = "red";
      icon = "error";
      break;
    case "info":
      backgroundColor = "#4ac6ff";
      outlineColor = "grey";
      icon = "info";
      break;
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <Overlay setVisible={setVisible}>
        <View style={styles.container}>
          <View
            style={[
              styles.popup,
              { backgroundColor: backgroundColor },
              { borderColor: outlineColor },
            ]}
          >
            <Icon type={icon} color="white" />
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              style={[styles.text, fontLoaded && { fontFamily: "Sarabun" }]}
            >
              {title}
            </Text>
          </View>
        </View>
      </Overlay>
    </Modal>
  );
}

const Overlay = ({ children, setVisible }) => {
  return (
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPressOut={() => {
        setVisible(false);
      }}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  container: {
    position: "absolute",
    bottom: 0,
    minHeight: 80,
    width: "100%",
    alignItems: "center",
  },
  popup: {
    flexDirection: "row",
    minHeight: 80,
    marginBottom: 10,
    paddingLeft: 5,
    width: "75%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: "80%",
    fontSize: 19,
    color: "white",
    letterSpacing: 0,
    paddingLeft: 15,
  },
});
