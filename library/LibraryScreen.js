import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";

import ExpandProductPhotoModal from "./ExpandProductPhotoModal";

import { getProductsByEventName, removeProduct } from "../event-service";
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

  const deserializeFlatProductList = (flatProductList) => {
    // yeah... I know
    const eventMap = new Map();
    for (const flatProduct of flatProductList) {
      const dateMap = eventMap.get(flatProduct.event);
      if (dateMap) {
        const mealMap = dateMap.get(flatProduct.date);
        if (mealMap) {
          const product = deserializeProduct(flatProduct);
          const productList = mealMap.get(flatProduct.meal);
          if (productList) {
            productList.push(product);
            mealMap.set(flatProduct.meal, productList);
          } else {
            // the meal does not exist
            mealMap.set(flatProduct.meal, [product]);
          }
          dateMap.set(flatProduct.date, mealMap);
        } else {
          // the date does not exist
          const product = deserializeProduct(flatProduct);
          const newMealMap = new Map();
          newMealMap.set(flatProduct.meal, [product]);
          dateMap.set(flatProduct.date, newMealMap);
        }
      } else {
        // the event does not exist
        const product = deserializeProduct(flatProduct);
        const newDateMap = new Map();
        const newMealMap = new Map();
        newMealMap.set(flatProduct.meal, [product]);
        newDateMap.set(flatProduct.date, newMealMap);
        eventMap.set(flatProduct.event, newDateMap);
      }
    }
    return eventMap;
  };

  const deserializeProduct = (flatProduct) => {
    return {
      uuid: flatProduct.uuid,
      name: flatProduct.name,
      photos: flatProduct.photos,
      date: flatProduct.date,
    };
  };

  const deleteProduct = async (product) => {
    await removeProduct(product);
    fetchProducts();
  };

  const displayEvents = (eventMap) => {
    const eventList = [];

    for (const [eventName, dateMap] of eventMap) {
      eventList.push({ name: eventName, dateMap: dateMap });
    }

    return eventList.map((event, index) => (
      <View style={styles.container} key={index}>
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
    ));
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
