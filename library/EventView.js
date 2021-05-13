import React, { useRef, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import ViewPager from "@react-native-community/viewpager";

import DateView from "./DateView";
import ShareEventButton from "./ShareEventButton";
import SpinnerModal from "./SpinnerModal";
import TopBar from "../components/TopBar";
import Icon from "../icons/Icon";
import { primaryColor } from "../global";

export default function EventView({
  navigation,
  event,
  deleteProduct,
  setSelectedPhoto,
}) {
  const pager = useRef(null);
  const [pageIndex, setPageIndex] = useState(0);
  const [isSharingInProgress, setSharingInProgress] = useState(false);

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
      <TopBar navigation={navigation} title={event.name}>
        <ShareEventButton
          setSharingInProgress={setSharingInProgress}
          event={event}
        ></ShareEventButton>
      </TopBar>
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
      {isSharingInProgress && <SpinnerModal />}
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
      <Icon type="right-arrow" color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  swipeButton: {
    position: "absolute",
    backgroundColor: primaryColor,
    justifyContent: "center",
    bottom: 25,
    height: 55,
    width: 55,
    borderRadius: 40,
    padding: 7,
  },
  rightButton: {
    right: 30,
    paddingLeft: 12,
  },
  leftButton: {
    left: 30,
    transform: [{ rotate: "180deg" }],
    paddingLeft: 12,
  },
  enabledButton: {
    backgroundColor: primaryColor,
  },
  disabledButton: {
    backgroundColor: "lightgrey",
  },
});
