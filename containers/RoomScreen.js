import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

const RoomScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is the RoomScreen component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RoomScreen;
