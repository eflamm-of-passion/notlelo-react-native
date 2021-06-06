import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import ExpandProductPhotoModal from "./ExpandProductPhotoModal";

import {
  getProductsByEventName,
  deserializeFlatProductList,
  removeProduct,
} from "../event-service";
import EventView from "./EventView";

export default function LibraryScreen({ route, navigation }) {
  const [productList, setProductList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const { eventName } = route.params;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(async () => {
    const flatProductList = await getProductsByEventName(eventName);
    const productList = deserializeFlatProductList(flatProductList);
    setProductList(productList);
  }, []);

  const deleteProduct = async (product) => {
    await removeProduct(product);
    fetchProducts();
  };

  const displayEvents = (eventMap) => {
    const eventList = [];
    for (const [eventName, dateMap] of eventMap) {
      eventList.push({ name: eventName, dateMap: dateMap });
    }
    const event = eventList[0];

    return (
      <View style={styles.container}>
        <EventView
          navigation={navigation}
          event={event}
          deleteProduct={deleteProduct}
          setSelectedPhoto={setSelectedPhoto}
        ></EventView>
        <ExpandProductPhotoModal
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
        ></ExpandProductPhotoModal>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {productList.size ? displayEvents(productList) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
