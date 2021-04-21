import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Svg, Path } from "react-native-svg";
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
  eventName,
}) {
  const [productName, setProductName] = useState("");
  const [mealName, setMealName] = useState("");
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

  const displayMealPicker = () => {
    return (
      <View style={styles.mealPicker}>
        <Picker
          style={styles.picker}
          selectedValue={mealName}
          onValueChange={(itemValue) => setMealName(itemValue)}
        >
          {mealList.map((mealName, index) => (
            <Picker.Item
              key={index}
              label={mealName}
              value={mealName}
              color="black"
            />
          ))}
        </Picker>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => setShowMealInput(true)}
        >
          <Svg fill="#003a5d" viewBox="0 0 52 52">
            <Path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2 s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2 S39.604,28,38.5,28z" />
          </Svg>
        </TouchableOpacity>
      </View>
    );
  };

  const displayMealInput = () => {
    return (
      <View style={styles.mealInputTextContainer}>
        <TextInput
          placeholder={i18n.t("library.mealInputPlaceholder")}
          style={styles.mealInputText}
          onChangeText={(text) => setInputMealName(text)}
        />
        <TouchableOpacity
          style={styles.mealInputButton}
          onPress={() => {
            setMealName(inputMealName);
            setMealList([inputMealName].concat(mealList));
            setShowMealInput(false);
          }}
        >
          <Svg fill="green" viewBox="0 0 330 330">
            <Path d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M165,300 c-74.44,0-135-60.561-135-135S90.56,30,165,30s135,60.561,135,135S239.439,300,165,300z" />
            <Path d="M226.872,106.664l-84.854,84.853l-38.89-38.891c-5.857-5.857-15.355-5.858-21.213-0.001 c-5.858,5.858-5.858,15.355,0,21.213l49.496,49.498c2.813,2.813,6.628,4.394,10.606,4.394c0.001,0,0,0,0.001,0 c3.978,0,7.793-1.581,10.606-4.393l95.461-95.459c5.858-5.858,5.858-15.355,0-21.213 C242.227,100.807,232.73,100.806,226.872,106.664z" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mealInputButton}
          onPress={() => {
            setInputMealName("");
            setShowMealInput(false);
          }}
        >
          <Svg fill="red" viewBox="0 0 489 489">
            <Path d="M244.5,0C109.3,0,0,109.3,0,244.5S109.3,489,244.5,489S489,379.7,489,244.5S379.7,0,244.5,0z M244.5,448.4 c-112.4,0-203.9-91.5-203.9-203.9S132.1,40.6,244.5,40.6s203.9,91.5,203.9,203.9S356.9,448.4,244.5,448.4z" />
            <Path d="M354.8,134.2c-8.3-8.3-20.8-8.3-29.1,0l-81.2,81.2l-81.1-81.1c-8.3-8.3-20.8-8.3-29.1,0s-8.3,20.8,0,29.1l81.1,81.1 l-81.1,81.1c-8.3,8.3-8.6,21.1,0,29.1c6.5,6,18.8,10.4,29.1,0l81.1-81.1l81.1,81.1c12.4,11.7,25,4.2,29.1,0 c8.3-8.3,8.3-20.8,0-29.1l-81.1-81.1l81.1-81.1C363.1,155,363.1,142.5,354.8,134.2z" />
          </Svg>
        </TouchableOpacity>
      </View>
    );
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

        {showMealInput ? displayMealInput() : displayMealPicker()}

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
  mealPicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: 240,
    height: 60,
  },
  plusButton: {
    height: 30,
    width: 30,
  },
  mealInputTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealInputText: {
    width: 220,
    height: 50,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  mealInputButton: {
    height: 40,
    width: 40,
    paddingLeft: 10,
  },
});
