import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

// import AsyncStorage from "@react-native-async-storage/async-storage";

const RoomScreen = ({ route, navigation }) => {
  //   console.log(route);
  const { roomId } = route.params;

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [coords, setCoords] = useState();

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
    };

    const getPermission = async () => {
      try {
        // Demander à l'utilisateur la permission de récupérer sa localisation
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          // Récupérer sa latitude et sa longitude
          const location = await Location.getCurrentPositionAsync();
          //   console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
        } else {
          alert("Permission refusee");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getPermission();
    fetchData();
  }, []);

  const displayStars = (num) => {
    const tab = [];
    for (let i = 0; i < 5; i++) {
      if (i < num) {
        tab.push(<Entypo key={i} name="star" size={24} color="#FFB100" />);
      } else {
        tab.push(<Entypo key={i} name="star" size={24} color="gray" />);
      }
    }
    return tab;
  };

  return isLoading ? (
    <View style={styles.indicator}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={styles.img}
          source={{ uri: data.photos[0].url }}
        >
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{data.price} €</Text>
          </View>
        </ImageBackground>
        <View style={styles.bottomContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {data.title}
            </Text>
            <View style={styles.underLeftPart}>
              <View style={styles.displayStars}>
                {displayStars(data.ratingValue)}
              </View>
              <View>
                <Text style={styles.reviews}>{data.reviews} reviews</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Image
              style={styles.profilPics}
              source={{ uri: data.user.account.photo.url }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowText(!showText);
          }}
          style={styles.descrptionPart}
        >
          <Text style={styles.description} numberOfLines={showText ? null : 3}>
            {data.description}
          </Text>
        </TouchableOpacity>

        <View>
          <MapView
            showsUserLocation={true}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
            style={styles.mapview}
            provider={PROVIDER_GOOGLE}
          >
            <MapView.Marker
              coordinate={{
                latitude: data.location[1],
                longitude: data.location[0],
              }}
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  indicator: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    height: 270,
    width: "100%",
    justifyContent: "flex-end",
  },
  priceContainer: {
    height: 50,
    width: 120,
    backgroundColor: "black",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  displayStars: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
  },
  profilPics: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  bottomContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  leftContainer: {
    width: "80%",
  },
  rightContainer: {
    width: "20%",
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
  },
  mapview: {
    height: 300,
    width: "100%",
  },
  underLeftPart: {
    flexDirection: "row",
    marginTop: 10,
  },
  reviews: {
    marginLeft: 10,
    marginTop: 7,
    color: "#C0C0C0",
  },
});

export default RoomScreen;
