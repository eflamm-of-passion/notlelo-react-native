import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import i18n from "../i18n";

export default function ExpandProductPhotoModal({
  selectedPhoto,
  setSelectedPhoto,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={selectedPhoto != null}
    >
      <BlurView
        tint="dark"
        intensity={100}
        style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
      >
        <View style={styles.modalView}>
          {selectedPhoto ? (
            <Image
              style={styles.modalPhoto}
              source={{ uri: selectedPhoto.uri }}
            />
          ) : null}
          <TouchableOpacity
            style={[styles.modalButton, styles.modalCloseButton]}
            onPress={() => setSelectedPhoto(null)}
          >
            <Text style={styles.modalButtonText}>
              {i18n.t("library.close")}
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  modalPhoto: {
    flex: 1,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  modalCloseButton: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "white",
    textTransform: "uppercase",
  },
});
