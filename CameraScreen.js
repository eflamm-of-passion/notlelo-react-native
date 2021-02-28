import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { requestPermissionsAsync, createAssetAsync, createAlbumAsync, getAlbumAsync, addAssetsToAlbumAsync, getAssetsAsync } from 'expo-media-library';
import { Camera } from 'expo-camera';
import EventService from './EventService';

const ALBUM_NAME = "Batch Number";

export default function CameraScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoList, setPhotoList] = useState([]);
  const [creationDate, setCreationDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      const cameraAccess = await Camera.requestPermissionsAsync();
      const mediaLibraryAccess = await requestPermissionsAsync();
      setHasPermission(cameraAccess.status === 'granted' && mediaLibraryAccess.status === 'granted');
    })();
  }, []);

  if(hasPermission === null) {
    return <Text>No access to the camera </Text>;
  }
  if(hasPermission === false) {
    return <Text>No access to the camera </Text>;
  }

  const takePicture = async () => {
    if(camera) {
      if(!photoList.length) {
        setCreationDate(new Date());
      }
      const photo = await camera.takePictureAsync();
      photo.id = Math.random();
      setPhotoList([photo].concat(photoList));
    }
  }

  const savePictures = async () => {
    if (photoList.length) {
      
      // create the assets from the taken pictures
      let photoAssetList = [];
      for(const photo of photoList) {
        const createdAsset = await createAssetAsync(photo.uri);
        photoAssetList.push(createdAsset);
      }
      
      // add the assets to the album
      const album = await getAlbumAsync(ALBUM_NAME);
      if (!album) {
        const createdAlbum = await createAlbumAsync(ALBUM_NAME, photoAssetList[0], false);
        await addAssetsToAlbumAsync(photoAssetList.slice(1), createdAlbum, false);
      } else {
        await addAssetsToAlbumAsync(photoAssetList, album, false);
      }
      setPhotoList([]);

      // save the product to the database
      const product = {event: "someEvent", meal: "breakfast", name: "noodles"};
      EventService.addProduct(product, creationDate);

    }
  }


  const cancelTakingPictures = async () => {
    // TODO
    const album = await getAlbumAsync(ALBUM_NAME);
    const options = {album: album};
    const assets = await getAssetsAsync(options);
    const products = await EventService.getProducts();
    console.log("assets");
    console.log(JSON.stringify(assets));
    console.log("photo");
    console.log(JSON.stringify(photoList));
    console.log("products");
    console.log(JSON.stringify(products));
    EventService.setProducts([]);
  }

  const flushPictures = () => {
    // TODO remove all pictures from cache
    setPhotoList([]);
  }

  const displayPreviewPhotos = () => {
    return photoList.map(photo => {
      return <TouchableOpacity onPress={() => removePhoto(photo.id)} key={photo.id}>
              <Image style={styles.photoPreview} source={{uri: photo.uri}}/>
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
          <TouchableOpacity style={styles.cancelButton} onPress={() => cancelTakingPictures()} >
            <Svg width="50" height="50" viewBox="0 0 20 20" fill="white">
                <Path fill="none" stroke="lightgray" stroke-width="1.06" d="M16,16 L4,4"></Path>
                <Path fill="none" stroke="lightgray" stroke-width="1.06" d="M16,4 L4,16"></Path>
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.takePictureButton} onPress={() => takePicture()}>
            <Svg height="40%" width="40%" viewBox="0 0 98 98" >
              <Circle cx="50" cy="50" r="45" stroke="darkgrey" strokeWidth="5" fill="lightgray" />
            </Svg>
          </TouchableOpacity>
          <TouchableOpacity style={styles.validateButton} onPress={() => savePictures()}>
            <Svg viewBox="0 0 512 512" width="40" height="40" fill="white">
              <Path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
            </Svg>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.photoPreviewList}>
        {displayPreviewPhotos()}
        {
          photoList.length ? 
          <TouchableOpacity style={styles.flushPicturesButton} onPress={() => flushPictures()}>
            <Svg width="50" height="50" viewBox="0 0 256 256"  fill="lightgray">
              <Path d="M183.191,174.141c2.5,2.498,2.5,6.552,0,9.05c-1.249,1.25-2.889,1.875-4.525,1.875c-1.638,0-3.277-0.625-4.525-1.875  l-46.142-46.142L81.856,183.19c-1.249,1.25-2.888,1.875-4.525,1.875c-1.638,0-3.277-0.625-4.525-1.875c-2.5-2.498-2.5-6.552,0-9.05  l46.143-46.143L72.806,81.856c-2.5-2.499-2.5-6.552,0-9.05c2.497-2.5,6.553-2.5,9.05,0l46.142,46.142l46.142-46.142  c2.497-2.5,6.553-2.5,9.051,0c2.5,2.499,2.5,6.552,0,9.05l-46.143,46.142L183.191,174.141z M256,128C256,57.42,198.58,0,128,0  C57.42,0,0,57.42,0,128c0,70.58,57.42,128,128,128C198.58,256,256,198.58,256,128z M243.2,128c0,63.521-51.679,115.2-115.2,115.2  c-63.522,0-115.2-51.679-115.2-115.2C12.8,64.478,64.478,12.8,128,12.8C191.521,12.8,243.2,64.478,243.2,128z"/>
            </Svg>
          </TouchableOpacity>
          : null
        }
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoPreviewList: {
    flex: 1,
    position: 'absolute',
    left: 20,
    top: 40,
    alignItems: 'center',
    flexDirection: 'column-reverse'
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 10
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  takePictureButton: {
    flex: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  validateButton: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: 40
  },
  cancelButton: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    marginLeft: 40
  },
  flushPicturesButton: {
    justifyContent: 'center'
  }
});