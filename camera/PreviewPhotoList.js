import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Svg, Path } from 'react-native-svg';

export default function PreviewPhotoList({photoList, setPhotoList}) {

    const onClickFlushPictures = async () => {
      setPhotoList([]);
    }

    const onClickPhotoBubble = (id) => {
      setPhotoList(photoList.filter(photo => photo.id !== id));
    }

    const displayPreviewPhotos = () => {
        // TODO filler
        return photoList.map(photo => {
          return <TouchableOpacity onPress={() => onClickPhotoBubble(photo.id)} key={photo.id}>
                  {
                    photo.filler
                    ? <View style={styles.photoPreviewFiller}></View>
                    : <Image style={styles.photoPreview} source={{uri: photo.uri}}/>
                  }
                </TouchableOpacity>
        })
      }

    return (
        <View style={styles.photoPreviewList}>
        {displayPreviewPhotos()}
        {
          photoList.length ? 
          <TouchableOpacity style={styles.flushPicturesButton} onPress={() => onClickFlushPictures()}>
            <Svg width="50" height="50" viewBox="0 0 256 256"  fill="lightgray">
              <Path d="M183.191,174.141c2.5,2.498,2.5,6.552,0,9.05c-1.249,1.25-2.889,1.875-4.525,1.875c-1.638,0-3.277-0.625-4.525-1.875  l-46.142-46.142L81.856,183.19c-1.249,1.25-2.888,1.875-4.525,1.875c-1.638,0-3.277-0.625-4.525-1.875c-2.5-2.498-2.5-6.552,0-9.05  l46.143-46.143L72.806,81.856c-2.5-2.499-2.5-6.552,0-9.05c2.497-2.5,6.553-2.5,9.05,0l46.142,46.142l46.142-46.142  c2.497-2.5,6.553-2.5,9.051,0c2.5,2.499,2.5,6.552,0,9.05l-46.143,46.142L183.191,174.141z M256,128C256,57.42,198.58,0,128,0  C57.42,0,0,57.42,0,128c0,70.58,57.42,128,128,128C198.58,256,256,198.58,256,128z M243.2,128c0,63.521-51.679,115.2-115.2,115.2  c-63.522,0-115.2-51.679-115.2-115.2C12.8,64.478,64.478,12.8,128,12.8C191.521,12.8,243.2,64.478,243.2,128z"/>
            </Svg>
          </TouchableOpacity>
          : null
        }
      </View>
    );
}

const styles = StyleSheet.create({
    photoPreviewList: {
        flex: 1,
        position: 'absolute',
        left: 20,
        top: 40,
        alignItems: 'center',
        flexDirection: 'column-reverse'
      },
    photoPreviewFiller: {
        backgroundColor: '#323633',
        width: 80,
        height: 80,
        borderRadius: 50,
        marginTop: 10
      },
      photoPreview: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginTop: 10
      },
});


