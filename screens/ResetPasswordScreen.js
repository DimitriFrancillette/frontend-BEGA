import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmitPassword = async () => {
    const fetchEmail = await fetch(
      "http://192.168.1.57:3000/users/resetpassword",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify({ email }),
      }
    );
    const response = fetchEmail.json();
    console.log("envoyé");
    return response;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your email"
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
            <Text style={styles.textButton}>Reset your password</Text>
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
    marginTop: "70%",
  },
  inputContainer: {
    width: "90%",
    borderColor: "#ec6e5b",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    marginBottom: 5,
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
  input: {
    color: "#FAF5FF",
    fontSize: 16,
  },
  textButton: {
    color: "#DDA304",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
});
