import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
import {
  createAssetAsync,
  createAlbumAsync,
  getAlbumAsync,
  addAssetsToAlbumAsync,
} from "expo-media-library";
import { addProduct } from "../EventService";
import i18n from "../i18n";

const ALBUM_NAME = "Batch Number";

export default function SaveProductModal({
  isModalVisible,
  setModalVisible,
  photoList,
  setPhotoList,
  creationDate,
}) {
  const [productName, setProductName] = useState("");
  const [mealName, setMealName] = useState("");
  const [eventName, setEventName] = useState("");

  const onClickValidate = () => {
    setModalVisible(false);
    savePictures();
  };

  const onClickCancelSavingProduct = () => {
    setProductName("");
    setModalVisible(false);
  };

  const savePictures = async () => {
    if (photoList.length) {
      // create the assets from the taken pictures
      let photoAssetList = [];
      for (const photo of photoList) {
        const createdAsset = await createAssetAsync(photo.uri);
        photoAssetList.push(createdAsset);
      }

      // add the assets to the album
      const album = await getAlbumAsync(ALBUM_NAME);
      if (!album) {
        const createdAlbum = await createAlbumAsync(
          ALBUM_NAME,
          photoAssetList[0],
          false
        );
        await addAssetsToAlbumAsync(
          photoAssetList.slice(1),
          createdAlbum,
          false
        );
      } else {
        await addAssetsToAlbumAsync(photoAssetList, album, false);
      }
      // save the product to the database
      const product = { event: eventName, meal: mealName, name: productName };
      addProduct(product, creationDate);

      setPhotoList([]);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>
          {i18n.t("camera.productInputLabel")}
        </Text>
        <TextInput
          style={styles.modalTextInput}
          autoFocus={true}
          placeholder={i18n.t("camera.productNamePlaceHolder")}
          onChangeText={(text) => setProductName(text)}
          value={productName}
        />
        <Text style={styles.modalTitle}>{i18n.t("camera.mealInputLabel")}</Text>
        <TextInput
          style={styles.modalTextInput}
          autoFocus={true}
          placeholder={i18n.t("camera.mealNamePlaceHolder")}
          onChangeText={(text) => setMealName(text)}
          value={mealName}
        />
        <Text style={styles.modalTitle}>
          {i18n.t("camera.eventInputLabel")}
        </Text>
        <TextInput
          style={styles.modalTextInput}
          autoFocus={true}
          placeholder={i18n.t("camera.eventNamePlaceHolder")}
          onChangeText={(text) => setEventName(text)}
          value={eventName}
        />
        <View style={styles.modalButtonContainer}>
          <TouchableOpacity
            style={[styles.modalButton, styles.modalCancelButton]}
            onPress={() => onClickCancelSavingProduct()}
          >
            <Text style={styles.modalButtonText}>
              {i18n.t("camera.cancel")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.modalValidateButton]}
            onPress={() => onClickValidate()}
          >
            <Text style={styles.modalButtonText}>
              {i18n.t("camera.validate")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30,
  },
  modalTitle: {
    width: "90%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#3b3b3b",
    textAlign: "left",
  },
  modalTextInput: {
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  modalButtonContainer: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
  },
  modalButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "white",
    textTransform: "uppercase",
  },
  modalCancelButton: {
    backgroundColor: "red",
  },
  modalValidateButton: {
    backgroundColor: "green",
  },
});
