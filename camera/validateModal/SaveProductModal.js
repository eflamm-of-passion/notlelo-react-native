import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Modal } from "react-native";
import { BlurView } from "expo-blur";
import {
  createAssetAsync,
  createAlbumAsync,
  getAlbumAsync,
  addAssetsToAlbumAsync,
} from "expo-media-library";
import { useFonts } from "expo-font";

import i18n from "../../i18n";
import { addProduct } from "../../event-service";
import { albumName } from "../../global";
import MealPicker from "./MealPicker";
import MealInput from "./MealInput";
import ProductInput from "./ProductInput";

export default function SaveProductModal({
  isModalVisible,
  setModalVisible,
  photoList,
  eventName,
  onProductSaved,
}) {
  const [fontLoaded] = useFonts({
    Raleway: require("../../assets/fonts/Raleway.ttf"),
  });
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
      const takenPhotoFilenames = [];
      for (const photo of photoList) {
        const createdAsset = await createAssetAsync(photo.uri);
        takenPhotoFilenames.push(createdAsset.filename);
        photoAssetList.push(createdAsset);
      }

      // add the assets to the album
      const album = await getAlbumAsync(albumName);
      if (!album) {
        const createdAlbum = await createAlbumAsync(
          albumName,
          photoAssetList[0],
          false
        );
        photoAssetList = photoAssetList.slice(1);
        if (photoAssetList.length) {
          await addAssetsToAlbumAsync(photoAssetList, createdAlbum, false);
        }
      } else {
        await addAssetsToAlbumAsync(photoAssetList, album, false);
      }
      // save the product to the database
      const product = { event: eventName, meal: mealName, name: productName };
      await addProduct(product, takenPhotoFilenames);

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
          <Text
            style={[styles.modalTitle, fontLoaded && { fontFamily: "Raleway" }]}
          >
            {i18n.t("camera.productInputLabel")}
          </Text>

          <ProductInput
            productName={productName}
            setProductName={setProductName}
            eventName={eventName}
          />

          <Text
            style={[styles.modalTitle, fontLoaded && { fontFamily: "Raleway" }]}
          >
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
              <Text
                style={[
                  styles.modalButtonText,
                  fontLoaded && { fontFamily: "Raleway" },
                ]}
              >
                {i18n.t("camera.cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalValidateButton]}
              onPress={() => onClickValidate()}
            >
              <Text
                style={[
                  styles.modalButtonText,
                  fontLoaded && { fontFamily: "Raleway" },
                ]}
              >
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
    fontSize: 22,
    color: "#3b3b3b",
    textAlign: "left",
    marginTop: 10,
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
    letterSpacing: 1,
  },
  modalCancelButton: {
    backgroundColor: "red",
  },
  modalValidateButton: {
    backgroundColor: "green",
  },
});
