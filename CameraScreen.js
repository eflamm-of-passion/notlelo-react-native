import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Camera } from 'expo-camera';

export default function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [photoList]);

  if(hasPermission === null) {
    <Text>No access to the camera</Text>;
  }
  if(hasPermission === false) {
    return <Text>No access to the camera</Text>;
  }

  const takePicture = async () => {
    if(camera) {
      const p = await camera.takePictureAsync();
      // setPhoto(p);
      p.id = Math.random();
      setPhotoList([p].concat(photoList));
    }
  }

  const displayPreviewPhotos = () => {
    return photoList.map(photo => {
      return <TouchableOpacity onPress={() => removePhoto(photo.id)} key={photo.id}>
              <ImageBackground style={styles.photo} source={{uri: photo && photo.uri}}/>
            </TouchableOpacity>
    })
  }

  const removePhoto = (id) => {
    setPhotoList(photoList.filter(photo => photo.id !== id));
    displayPreviewPhotos();
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={(r) => {setCamera(r)}}>
        <View style={styles.buttonContainer}>
          <View style={styles.photoPreview}>
            {displayPreviewPhotos()}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => takePicture()}>
            <Svg height="25%" width="25%" viewBox="0 0 100 100" >
              <Circle cx="50" cy="50" r="45" stroke="darkgrey" strokeWidth="2.5" fill="lightgray" />
            </Svg>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  photo: {
    width: 80,
    height: 80,
    backgroundColor: 'white'
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});