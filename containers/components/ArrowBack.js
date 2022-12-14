import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ArrowBack = () => {
  const navigation = useNavigation();
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
    />
  );
};

export default ArrowBack;
