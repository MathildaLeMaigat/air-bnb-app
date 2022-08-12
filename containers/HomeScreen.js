import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function HomeScreen() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log({ error: error.message });
      }
    };
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

  const navigation = useNavigation();
  return isLoading ? (
    <View style={styles.indicator}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(elem) => elem._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { roomId: item._id });
              }}
            >
              <ImageBackground
                style={styles.imageBack}
                source={{ uri: item.photos[0].url }}
              >
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{item.price} €</Text>
                </View>
              </ImageBackground>
              <View style={styles.bottomContainer}>
                <View style={styles.leftContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.starsContainer}>
                    {displayStars(item.ratingValue)}
                  </View>
                </View>
                <View style={styles.rightContainer}>
                  <Image
                    style={styles.profilPics}
                    source={{ uri: item.user.account.photo.url }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

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

  imageBack: {
    height: 220,
    width: "100%",
    justifyContent: "flex-end",
  },
  priceContainer: {
    height: 50,
    width: 100,
    backgroundColor: "black",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  price: {
    color: "white",
    fontSize: 20,
  },
  starsContainer: {
    flexDirection: "row",
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
    alignItems: "flex-end",
  },
});
