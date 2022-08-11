import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const RoomScreen = ({ route, navigation }) => {
  console.log(route);
  const { roomId } = route.params;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${roomId}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      fetchData();
    };
  }, []);

  return isLoading ? (
    <View style={styles.indicator}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text>This is the RoomScreen component:{data.roomId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },

  indicator: {
    flex: 1,
    justifyContent: "center",
  },
});

export default RoomScreen;
