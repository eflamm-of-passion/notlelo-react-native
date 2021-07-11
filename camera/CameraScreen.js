import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { requestPermissionsAsync } from "expo-media-library";
import { Camera } from "expo-camera";

import TakePictureButton from "./TakePictureButton";
import ValidateProductButton from "./ValidateProductButton";
import PreviewPhotoList from "./PreviewPhotoList";
import SaveProductModal from "./validateModal/SaveProductModal";
import Toast from "../components/Toast";
import Icon from "../icons/Icon";
import i18n from "../i18n";

export default function CameraScreen({ navigation, route }) {
  const [focusedScreen, setFocusedScreen] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoList, setPhotoList] = useState([]);
  const [isTakingPicture, setTakingPicture] = useState(false);

  const [isValidateProductModalVisible, setValidateProductModalVisible] =
    useState(false);

  const [isToastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState("info");
  const [toastTimeout, setToastTimeout] = useState(5000);

  const { eventName } = route.params;

  useEffect(() => {
    // source : https://github.com/react-native-camera/react-native-camera/issues/1051
    navigation.addListener("willFocus", () => this.setFocusedScreen(true));
    navigation.addListener("willBlur", () => this.setFocusedScreen(false));
    (async () => {
      const cameraAccess = await Camera.requestPermissionsAsync();
      const mediaLibraryAccess = await requestPermissionsAsync();
      setHasPermission(
        cameraAccess.status === "granted" &&
          mediaLibraryAccess.status === "granted"
      );
    })();
  }, [isValidateProductModalVisible, photoList]);

  const onClickTakePicture = async () => {
    if (camera) {
      if (!isTakingPicture) {
        const photoFiller = { id: 0, filler: true };
        setPhotoList([photoFiller].concat(photoList));
        setTakingPicture(true);
        const photo = await camera.takePictureAsync({
          quality: 0.1, // this parameter is overriden by skipProcessing
          // skipProcessing: true, // to take picture faster, but need to be tested further
        });
        // remove the filler from the previw list
        setPhotoList(photoList.filter((photo) => photo.id !== photoFiller.id));
        photo.id = Math.random();
        setPhotoList([photo].concat(photoList));
        setTakingPicture(false);
      } else {
        setToastMessage(i18n.t("camera.waitToTakePicture"));
        setToastType("info");
        setToastVisible(true);
        setToastTimeout(1500);
      }
    }
  };

  const openValidateProductModal = () => {
    if (photoList.length && !isTakingPicture) {
      setValidateProductModalVisible(true);
      // TODO open the keyboard
    } else {
      setToastMessage(i18n.t("camera.validateDisabled"));
      setToastType("info");
      setToastVisible(true);
      setToastTimeout(5000);
    }
  };

  const onProductSaved = () => {
    // empty the preview list
    setPhotoList([]);
    setValidateProductModalVisible(false);
    // feedback to user
    setToastMessage(i18n.t("camera.productSaved"));
    setToastType("success");
    setToastVisible(true);
    setToastTimeout(5000);
  };

  function CancelTakingPictureButton({ navigation }) {
    return (
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon
          type="right-arrow"
          color="white"
          width={50}
          height={50}
          rotation={180}
        />
      </TouchableOpacity>
    );
  }

  if (!hasPermission) {
    return <Text>No access to the camera </Text>;
  } else if (focusedScreen) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(r) => {
          setCamera(r);
        }}
      />
      <View style={styles.buttonContainer}>
        <CancelTakingPictureButton navigation={navigation} />
        <TakePictureButton
          onClickTakePicture={onClickTakePicture}
          isDisabled={isTakingPicture}
        />
        <ValidateProductButton
          onPress={openValidateProductModal}
          isDisabled={!photoList.length || isTakingPicture}
        />
      </View>
      <PreviewPhotoList photoList={photoList} setPhotoList={setPhotoList} />
      <SaveProductModal
        isModalVisible={isValidateProductModalVisible}
        setModalVisible={setValidateProductModalVisible}
        photoList={photoList}
        eventName={eventName}
        onProductSaved={onProductSaved}
      />
      <Toast
        title={toastMessage}
        type={toastType}
        visible={isToastVisible}
        setVisible={setToastVisible}
        timeout={toastTimeout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: Math.round(Dimensions.get("window").height), // the keyboard does not push up
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    height: 200,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  cancelButton: {
    paddingTop: 25,
    width: 100,
    height: 100,
    alignItems: "center",
  },
});
