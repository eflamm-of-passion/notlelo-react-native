import React from "react";
import { StyleSheet, View, Text } from "react-native";

import DeleteProductButton from "./DeleteProductButton";
import ProductPhotoImage from "./ProductPhotoImage";

export default function ProductView({
  product,
  deleteProduct,
  setSelectedPhoto,
}) {
  return (
    <View>
      <View style={styles.productTitle}>
        <Text style={styles.productTitleText}>{product.name}</Text>
        <DeleteProductButton
          product={product}
          deleteProduct={deleteProduct}
        ></DeleteProductButton>
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
});
