import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ViewPager from "@react-native-community/viewpager";

import DateView from "./DateView";
import ShareEventButton from "./ShareEventButton";

export default function EventView({ event, deleteProduct, setSelectedPhoto }) {
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
    width: "90%",
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
});
