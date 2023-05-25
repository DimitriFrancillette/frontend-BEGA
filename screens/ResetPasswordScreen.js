import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import ToastManager, { Toast } from "toastify-react-native";
import { BACKEND_URL } from "../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const showToasts = () => {
    Toast.success("Email envoyé");
  };
  const showFailedToasts = () => {
    Toast.info("Impossible");
  };

  const handleSubmitPassword = () => {
    fetch(`${BACKEND_URL}/users/resetpassword`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "Post",
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        showToasts();
      })
      .catch((e) => showFailedToasts());
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      <ScrollView style={styles.scrollView}>
        <View style={styles.arrowContainer}>
          <FontAwesome
            name="arrow-left"
            size={30}
            color="#DDA304"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <Image
          style={styles.logo}
          source={require("../assets/logo-bega.png")}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Adresse email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            style={styles.input}
            autoCapitalize="none"
            textContentType="emailAddress"
            placeholderTextColor="#faf5ff"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSubmitPassword}>
            <Text style={styles.textButton}>Réinitialiser mon mot de passe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7935b0",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  scrollView: {
    width: "100%",
  },
  arrowContainer: {
    position: "absolute",
    zIndex: 1,
    marginTop: 70,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  logo: {
    width: "100%",
    resizeMode: 'contain',
  },

  inputContainer: {
    width: "70%",
    borderColor: "#ec6e5b",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  input: {
    color: "#FAF5FF",
    fontSize: 16,
  },

  error: {
    color: "#DDA304",
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    marginTop: 20,
    paddingTop: 8,
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
  },

  textButton: {
    color: "#DDA304",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },

  forgotText: {
    marginTop: 20,
    color: "#DDA304",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
});
