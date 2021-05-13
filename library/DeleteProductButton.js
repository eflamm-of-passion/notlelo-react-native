import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Icon from "../icons/Icon";

export default function DeleteProductButton({ product, deleteProduct }) {
  return (
    <TouchableOpacity
      style={styles.deleteProductButton}
      onPress={() => deleteProduct(product)}
    >
      <Icon type="garbage" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deleteProductButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
