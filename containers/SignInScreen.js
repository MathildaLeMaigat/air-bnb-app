import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomInput from "./components/CustomInput";
import logo from "../assets/img/logo.png";
// keyBoard
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        alert("Inscription réussie");
      }
      const value = await AsyncStorage.getItem({ password });
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.logo} />
        <Text>Sign In</Text>
      </View>
      <CustomInput placeholder={"email"} value={email} setState={setEmail} />
      <CustomInput
        placeholder={"password"}
        value={password}
        setState={setPassword}
        password
      />

      <TouchableOpacity style={styles.signIn} onPress={handleSubmit}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text>Create an account</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 100,
  },

  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 40,
  },

  signIn: {
    borderWidth: 2,
    borderColor: "#F9585D",
    marginTop: 30,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 25,
    marginBottom: 30,
  },
});
