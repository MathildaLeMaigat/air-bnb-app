import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function CustomInput({
  placeholder,
  value,
  setState,
  password,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => setState(text)}
      secureTextEntry={password ? true : false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
    width: "80%",
    height: 35,
    marginBottom: 30,
  },
});
