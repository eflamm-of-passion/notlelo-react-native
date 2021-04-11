import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { requestPermissionsAsync } from 'expo-media-library';
import { Camera } from 'expo-camera';

import CancelTakingPictureButton from './CancelTakingPictureButton';
import TakePictureButton from './TakePictureButton';
import ValidateProductButton from './ValidateProductButton';
import PreviewPhotoList from './PreviewPhotoList';
import SaveProductModal from './SaveProductModal'; 

export default function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoList, setPhotoList] = useState([]);
  
  const [creationDate, setCreationDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    (async () => {
      const cameraAccess = await Camera.requestPermissionsAsync();
      const mediaLibraryAccess = await requestPermissionsAsync();
      setHasPermission(cameraAccess.status === 'granted' && mediaLibraryAccess.status === 'granted');
    })();
  }, [isModalVisible, photoList]);

  if(hasPermission === null || hasPermission === false) {
    return <Text>No access to the camera </Text>;
  }

  const onClickTakePicture = async () => {
    if(camera) {
      if(!photoList.length) {
        setCreationDate(new Date());
      }
      const photoFiller = {id: 0, filler: true}
      setPhotoList([photoFiller].concat(photoList));
      const photo = await camera.takePictureAsync({quality: 0.5});
      setPhotoList(photoList.filter(photo => photo.id !== photoFiller.id));
      photo.id = Math.random();
      setPhotoList([photo].concat(photoList));
    }
  }

  const openModal = () => {
    setModalVisible(true);
    // TODO open the keyboard
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(r) => {setCamera(r)}}>
        <View style={styles.buttonContainer}>
          <CancelTakingPictureButton navigation={navigation}></CancelTakingPictureButton>
          <TakePictureButton onClickTakePicture={onClickTakePicture}></TakePictureButton>
          <ValidateProductButton openModal={openModal}></ValidateProductButton>
        </View>
      </Camera>
      <PreviewPhotoList photoList={photoList} setPhotoList={setPhotoList}></PreviewPhotoList>
      <SaveProductModal isModalVisible={isModalVisible} setModalVisible={setModalVisible} photoList={photoList} setPhotoList={setPhotoList} creationDate={creationDate}></SaveProductModal>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flushPicturesButton: {
    justifyContent: 'center'
  },
});