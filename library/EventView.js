import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import ViewPager from "@react-native-community/viewpager";
import { useFonts } from "expo-font";

import DateView from "./DateView";
import ShareEventButton from "./ShareEventButton";

export default function EventView({
  navigation,
  event,
  deleteProduct,
  setSelectedPhoto,
}) {
  const pager = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [fontLoaded] = useFonts({
    CaveatBrush: require("../assets/fonts/CaveatBrush-Regular.ttf"),
  });

  const displayDates = () => {
    const dateList = [];
    for (const [dateName, mealMap] of event.dateMap) {
      dateList.push({ name: dateName, mealMap: mealMap });
    }
    return dateList.reverse().map((date, index) => (
      <ScrollView key={index}>
        <DateView
          date={date}
          deleteProduct={deleteProduct}
          setSelectedPhoto={setSelectedPhoto}
        />
      </ScrollView>
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
          style={[
            styles.eventTitleText,
            fontLoaded ? { fontFamily: "CaveatBrush" } : null,
          ]}
        >
          {event.name}
        </Text>
        <ShareEventButton event={event}></ShareEventButton>
      </View>
      <ViewPager
        ref={pager}
        style={styles.pager}
        initialPage={pageIndex}
        onPageSelected={(e) => {
          const { position } = e.nativeEvent;
          setPageIndex(position);
        }}
      >
        {displayDates()}
      </ViewPager>
      <SwithPageButton
        direction="right"
        pager={pager}
        pageIndex={pageIndex}
        numberOfPages={event.dateMap.size}
      />
      <SwithPageButton
        direction="left"
        pager={pager}
        pageIndex={pageIndex}
        numberOfPages={event.dateMap.size}
      />
    </View>
  );
}

const SwithPageButton = ({ direction, pager, pageIndex, numberOfPages }) => {
  const isDisabled = () => {
    switch (direction) {
      case "left":
        return pageIndex <= 0;
      case "right":
        return pageIndex >= numberOfPages - 1;
    }
    return true;
  };

  const switchPage = () => {
    switch (direction) {
      case "left":
        if (pageIndex > 0) {
          pager.current.setPage(pageIndex - 1);
        }
        break;
      case "right":
        if (pageIndex < numberOfPages - 1) {
          pager.current.setPage(pageIndex + 1);
        }
        break;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.swipeButton,
        direction === "left" ? styles.leftButton : styles.rightButton,
        isDisabled() ? styles.disabledButton : styles.enabledButton,
      ]}
      onPress={switchPage}
    >
      <Svg
        style={direction === "left" ? styles.leftArrow : styles.rightArrow}
        fill="#fff"
        viewBox="0 0 330.002 330.002"
      >
        <Path d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z" />
      </Svg>
    </TouchableOpacity>
  );
};

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
    // textTransform: "uppercase",
    fontSize: 45,
    letterSpacing: 1,
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
    backgroundColor: "#003a5d",
    justifyContent: "center",
    bottom: 25,
    height: 55,
    width: 55,
    borderRadius: 40,
    padding: 7,
  },
  rightButton: {
    right: 30,
  },
  rightArrow: {
    height: 35,
    marginLeft: 5,
  },
  leftButton: {
    left: 30,
  },
  leftArrow: {
    height: 35,
    transform: [{ rotate: "180deg" }],
    marginLeft: -3,
  },
  enabledButton: {
    backgroundColor: "#003a5d",
  },
  disabledButton: {
    backgroundColor: "lightgrey",
  },
});
