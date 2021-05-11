import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";

export default function Toast({ title, type, timeout, visible, setVisible }) {
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
  let textColor = "grey";
  switch (type) {
    case "success":
      backgroundColor = "#19bf27";
      outlineColor = "green";
      textColor = "green";
      break;
    case "error":
      backgroundColor = "orange";
      outlineColor = "red";
      textColor = "red";
      break;
    case "warning":
      backgroundColor = "lightgrey";
      outlineColor = "grey";
      textColor = "grey";
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
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPressOut={() => {
          setVisible(false);
        }}
      >
        <View style={styles.container}>
          <View
            style={[
              styles.popup,
              { backgroundColor: backgroundColor },
              { borderColor: outlineColor },
            ]}
          >
            <Text style={[styles.text]}>{title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

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
    minHeight: 80,
    marginBottom: 10,
    width: "80%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
    letterSpacing: 1,
  },
});
