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
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const getPermissionAndLocationAndFetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        let response;
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
          console.log(response.data);
          // setData(response.data);
          // setIsLoading(false);
        } else {
          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
          // console.log(response.data);
        }
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPermissionAndLocationAndFetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <MapView
      showsUserLocation={true}
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: latitude ? latitude : 48.866667,
        longitude: longitude ? longitude : 2.333333,
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
