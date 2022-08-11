import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useNavigation,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RoomScreen = ({ route }) => {
  const { roomId } = route.params;

  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${roomId}`
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      fetchData();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is the RoomScreen component:{route.params.roomId}</Text>
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
