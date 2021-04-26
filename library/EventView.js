import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";
import ViewPager from "@react-native-community/viewpager";

import DateView from "./DateView";
import ShareEventButton from "./ShareEventButton";

export default function EventView({
  navigation,
  event,
  deleteProduct,
  setSelectedPhoto,
}) {
  const displayDates = () => {
    const dateList = [];
    for (const [dateName, mealMap] of event.dateMap) {
      dateList.push({ name: dateName, mealMap: mealMap });
    }
    return dateList.reverse().map((date, index) => (
      <View key={index}>
        <DateView
          date={date}
          deleteProduct={deleteProduct}
          setSelectedPhoto={setSelectedPhoto}
        ></DateView>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.eventTitle}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Svg fill="#fff" viewBox="0 0 330.002 330.002">
            <Path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
          </Svg>
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={styles.eventTitleText}
        >
          {event.name}
        </Text>
        <ShareEventButton event={event}></ShareEventButton>
      </View>
      <ViewPager style={styles.pager} initialPage={0}>
        {displayDates()}
      </ViewPager>
      <TouchableOpacity style={[styles.swipeButton, styles.rightButton]}>
        <Svg
          style={styles.rightArrow}
          fill="#fff"
          viewBox="0 0 330.002 330.002"
        >
          <Path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.swipeButton, styles.leftButton]}>
        <Svg style={styles.leftArrow} fill="#fff" viewBox="0 0 330.002 330.002">
          <Path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  eventTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 90,
    backgroundColor: "#003a5d",
  },
  eventTitleText: {
    width: "75%",
    paddingTop: 20,
    paddingLeft: 10,
    color: "white",
    textTransform: "uppercase",
    fontSize: 40,
    letterSpacing: 8,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  goBackButton: {
    height: 40,
    width: 40,
    marginBottom: -15,
    transform: [{ rotate: "180deg" }],
  },
  swipeButton: {
    position: "absolute",
    bottom: 25,
    height: 55,
    width: 55,
    borderRadius: 40,
    backgroundColor: "#003a5d",
    padding: 7,
  },
  rightButton: {
    right: 30,
  },
  rightArrow: {
    marginLeft: 5,
  },
  leftButton: {
    left: 30,
  },
  leftArrow: {
    transform: [{ rotate: "180deg" }],
    marginLeft: -3,
  },
});
