import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import ViewPager from "@react-native-community/viewpager";

import EventService from "../EventService";
import EventView from "./EventView";

export default function LibraryScreen() {
  const [productList, setProductList] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(async () => {
    const flatProductList = await EventService.getProducts();
    const productList = deserializeFlatProductList(flatProductList);
    setProductList(productList);
  }, []);

  const deserializeFlatProductList = (flatProductList) => {
    const eventMap = new Map();
    for (const flatProduct of flatProductList) {
      const mealMap = eventMap.get(flatProduct.event);
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
        eventMap.set(flatProduct.event, mealMap);
      } else {
        // the event does not exist
        const product = deserializeProduct(flatProduct);
        const newMealMap = new Map();
        newMealMap.set(flatProduct.meal, [product]);
        eventMap.set(flatProduct.event, newMealMap);
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
    await EventService.removeProduct(product);
    fetchProducts();
  };

  const displayEvents = (eventMap) => {
    const eventList = [];

    for (const [eventName, mealMap] of eventMap) {
      eventList.push({ name: eventName, mealMap: mealMap });
    }

    return eventList.map((event) => (
      <View key={Math.random()}>
        <EventView
          event={event}
          deleteProduct={deleteProduct}
          setSelectedPhoto={setSelectedPhoto}
        ></EventView>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ViewPager style={styles.viewPager} initialPage={0}>
        {productList.size ? displayEvents(productList) : null}
      </ViewPager>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewPager: {
    flex: 1,
  },
});
