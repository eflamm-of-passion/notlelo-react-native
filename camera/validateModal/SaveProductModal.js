import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { BlurView } from "expo-blur";
import {
  createAssetAsync,
  createAlbumAsync,
  getAlbumAsync,
  addAssetsToAlbumAsync,
} from "expo-media-library";

import i18n from "../../i18n";
import { addProduct } from "../../event-service";
import MealPicker from "./MealPicker";
import MealInput from "./MealInput";

const ALBUM_NAME = "Batch Number";

export default function SaveProductModal({
  isModalVisible,
  setModalVisible,
  photoList,
  creationDate,
  eventName,
  onProductSaved,
}) {
  const [productName, setProductName] = useState("");
  const [showMealInput, setShowMealInput] = useState(false);
  const [inputMealName, setInputMealName] = useState(null);
  const [mealList, setMealList] = useState([
    i18n.t("meal.breakfast"),
    i18n.t("meal.lunch"),
    i18n.t("meal.snack"),
    i18n.t("meal.dinner"),
    i18n.t("meal.fifth"),
    i18n.t("meal.cookingContest"),
  ]);
  const [mealName, setMealName] = useState(mealList[0]);

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

      // successful callback
      onProductSaved();
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <BlurView
        tint="dark"
        intensity={100}
        style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
      >
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
          <Text style={styles.modalTitle}>
            {i18n.t("camera.mealInputLabel")}
          </Text>

          {showMealInput ? (
            <MealInput
              onValidate={(inputMealName) => {
                setMealName(inputMealName);
                setMealList([inputMealName].concat(mealList));
                setShowMealInput(false);
              }}
              onCancel={() => {
                setInputMealName("");
                setShowMealInput(false);
              }}
            />
          ) : (
            <MealPicker
              mealName={mealName}
              setMealName={setMealName}
              mealList={mealList}
              setShowMealInput={setShowMealInput}
            />
          )}

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
      </BlurView>
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
  },
  modalTitle: {
    width: "90%",
    fontSize: 18,
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
    paddingTop: 20,
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
