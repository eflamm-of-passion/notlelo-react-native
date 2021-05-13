import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import Icon from "../icons/Icon";

export default function PreviewPhotoList({ photoList, setPhotoList }) {
  const onClickFlushPictures = async () => {
    setPhotoList([]);
  };

  const onClickPhotoBubble = (id) => {
    setPhotoList(photoList.filter((photo) => photo.id !== id));
  };

  const displayPreviewPhotos = () => {
    // TODO filler
    return photoList.map((photo) => {
      return (
        <TouchableOpacity
          onPress={() => onClickPhotoBubble(photo.id)}
          key={photo.id}
        >
          {photo.filler ? (
            <View style={styles.photoPreviewFiller}></View>
          ) : (
            <Image style={styles.photoPreview} source={{ uri: photo.uri }} />
          )}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.photoPreviewList}>
      {displayPreviewPhotos()}
      {photoList.length ? (
        <TouchableOpacity onPress={() => onClickFlushPictures()}>
          <Icon type="clear" color="lightgray" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  photoPreviewList: {
    flex: 1,
    position: "absolute",
    left: 20,
    top: 40,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  photoPreviewFiller: {
    backgroundColor: "#323633",
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 10,
  },
  photoPreview: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 10,
  },
});
