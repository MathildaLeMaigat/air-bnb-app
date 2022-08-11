import { StyleSheet, Text, View, Image } from "react-native";

const LogoHeader = () => {
  return (
    <Image
      style={{ height: 45, width: 60 }}
      source={require("../../assets/img/logo.png")}
    />
  );
};

// const styles = StyleSheet.create({
//   logoHeader: {
//     height: 40,
//     width: 40,
//   },
// });

export default LogoHeader;
