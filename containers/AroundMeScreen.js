import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

const AroundMeScreen = () => {
  // States
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 48.866667,
        longitude: 2.333333,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
    >
      {data.map((flat, index) => {
        return (
          <MapView.Marker
            key={flat._id}
            coordinate={{
              latitude: flat.location[1],
              longitude: flat.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
});

export default AroundMeScreen;
