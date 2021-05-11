import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { requestPermissionsAsync } from "expo-media-library";
import { Camera } from "expo-camera";

import CancelTakingPictureButton from "./CancelTakingPictureButton";
import TakePictureButton from "./TakePictureButton";
import ValidateProductButton from "./ValidateProductButton";
import PreviewPhotoList from "./PreviewPhotoList";
import SaveProductModal from "./validateModal/SaveProductModal";
import Toast from "../components/Toast";
import i18n from "../i18n";

export default function CameraScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoList, setPhotoList] = useState([]);
  const [isTakingPicture, setTakingPicture] = useState(false);

  const [creationDate, setCreationDate] = useState(new Date());
  const [
    isValidateProductModalVisible,
    setValidateProductModalVisible,
  ] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);
  const [message, setMessage] = useState(null);

  const { eventName } = route.params;

  useEffect(() => {
    (async () => {
      const cameraAccess = await Camera.requestPermissionsAsync();
      const mediaLibraryAccess = await requestPermissionsAsync();
      setHasPermission(
        cameraAccess.status === "granted" &&
          mediaLibraryAccess.status === "granted"
      );
    })();
  }, [isValidateProductModalVisible, photoList]);

  if (!hasPermission) {
    return <Text>No access to the camera </Text>;
  }

  const onClickTakePicture = async () => {
    if (camera && !isTakingPicture) {
      if (!photoList.length) {
        setCreationDate(new Date());
      }
      const photoFiller = { id: 0, filler: true };
      setPhotoList([photoFiller].concat(photoList));
      setTakingPicture(true);
      const photo = await camera.takePictureAsync({ quality: 0.1 });
      // remove the filler from the previw list
      setPhotoList(photoList.filter((photo) => photo.id !== photoFiller.id));
      photo.id = Math.random();
      setPhotoList([photo].concat(photoList));
      setTakingPicture(false);
    }
  };

  const openValidateProductModal = () => {
    setValidateProductModalVisible(true);
    // TODO open the keyboard
  };

  const onProductSaved = () => {
    // empty the preview list
    setPhotoList([]);
    // feedback to user
    setMessage(i18n.t("camera.productSaved"));
    setToastVisible(true);
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(r) => {
          setCamera(r);
        }}
      >
        <View style={styles.buttonContainer}>
          <CancelTakingPictureButton navigation={navigation} />
          <TakePictureButton
            onClickTakePicture={onClickTakePicture}
            isDisabled={isTakingPicture}
          />
          <ValidateProductButton
            openModal={openValidateProductModal}
            isDisabled={photoList.length === 0}
          />
        </View>
      </Camera>
      <PreviewPhotoList photoList={photoList} setPhotoList={setPhotoList} />
      <SaveProductModal
        isModalVisible={isValidateProductModalVisible}
        setModalVisible={setValidateProductModalVisible}
        photoList={photoList}
        creationDate={creationDate}
        eventName={eventName}
        onProductSaved={onProductSaved}
      />
      <Toast
        title={message}
        type={"success"}
        visible={isToastVisible}
        setVisible={setToastVisible}
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
    backgroundColor: "transparent",
    flexDirection: "row",
  },
});
