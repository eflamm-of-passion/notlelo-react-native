import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import ProductPhotoImage from "./ProductPhotoImage";
import Icon from "../icons/Icon";

export default function ProductView({
  product,
  deleteProduct,
  setSelectedPhoto,
}) {
  return (
    <View>
      <View style={styles.productTitle}>
        <Text style={styles.productTitleText}>{product.name}</Text>
        <TouchableOpacity
          style={styles.deleteProductButton}
          onPress={() => deleteProduct(product)}
        >
          <Icon type="garbage" />
        </TouchableOpacity>
      </View>
      <View style={styles.photoList}>
        {product.photos
          ? product.photos.map((photo, index) => (
              <ProductPhotoImage
                key={index}
                photo={photo}
                setSelectedPhoto={setSelectedPhoto}
              ></ProductPhotoImage>
            ))
          : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  productTitleText: {
    fontSize: 19,
    paddingLeft: 80,
    letterSpacing: 1,
    color: "#404040",
  },
  photoList: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  deleteProductButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
