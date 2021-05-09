import React from "react";
import { Modal, ActivityIndicator, StyleSheet } from "react-native";

export default function SpinnerModal() {
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <ActivityIndicator style={styles.spinner} size="large" color="darkgrey" />
    </Modal>
  );
}

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});
