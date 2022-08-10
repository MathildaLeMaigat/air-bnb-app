import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

import logo from "../assets/img/logo.png";

import CustomInput from "./components/CustomInput";

export default function SignUpScreen({ setToken, navigation }) {
  // States
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // On submit
  const handleSubmit = async () => {
    setErrorMessage("");
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            {
              email,
              username,
              description,
              password,
            }
          );
          console.log(response.data);
          if (response.data.token) {
            alert("Inscription réussie");
          }
        } catch (error) {
          console.log(error.response.data);
          if (error.response.data) {
            setErrorMessage(error.response.data.error);
          }
        }
      } else {
        setErrorMessage("Vos mots de passe ne sont pas identiques");
      }
    } else {
      setErrorMessage("veuillez remplir tous les champs");
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.topContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>
      </View>
      <CustomInput placeholder={"email"} value={email} setState={setEmail} />

      <CustomInput
        placeholder={"username"}
        value={username}
        setState={setUsername}
      />

      <TextInput
        multiline={true}
        placeholder="Describe yourself in a few words..."
        style={styles.bigInput}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      <CustomInput
        placeholder={"password"}
        value={password}
        setState={setPassword}
        password
      />

      <CustomInput
        placeholder={"confirm password"}
        value={confirmPassword}
        setState={setConfirmPassword}
        password
      />

      {errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : null}

      <TouchableOpacity style={styles.signUp} onPress={handleSubmit}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text>Already have an account ? Sign in</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#727272",
  },

  bigInput: {
    borderWidth: 2,
    borderColor: "#FFBAC0",
    width: "80%",
    height: 80,
    marginBottom: 30,
  },

  logo: {
    height: 150,
    width: 100,
  },

  topContainer: {
    marginBottom: 40,
  },

  signUp: {
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
