import { BACK_API } from "@env";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();

  const createAlert = (backMessage) =>
    Alert.alert("L'enregistrement n'a pas fonctionné", backMessage, [
      { text: "OK" },
    ]);

  const handleSubmit = () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      return;
    }

    if (password !== confirmedPassword || password === "") {
      setPasswordError(true);
    } else {
      fetch(`${BACK_API}/users/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === false) {
            createAlert(data.error);
            return;
          }

          const newUser = {
            userId: data.user._id,
            firstname: data.user.firstname,
            lastname: data.user.lastname,
            email: data.user.email,
            token: data.user.authTokens[0].authToken,
          };
          dispatch(addUser(newUser));
          navigation.navigate("TabNavigator", { screen: "MyEvents" });

          setFirstname("");
          setLastname("");
          setEmail("");
          setPassword("");
          setConfirmedPassword("");
        });
    }
  };

  return (
    <View style={styles.container}>
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
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
                style={styles.input}
                placeholderTextColor="#faf5ff"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nom"
                onChangeText={(value) => setLastname(value)}
                value={lastname}
                style={styles.input}
                placeholderTextColor="#faf5ff"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Adresse email"
                onChangeText={(value) => setEmail(value)}
                value={email}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                placeholderTextColor="#faf5ff"
              />
            </View>
            {emailError && (
              <Text style={styles.error}>Adresse email invalide</Text>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Mot de passe"
                onChangeText={(value) => setPassword(value)}
                value={password}
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor="#faf5ff"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Confirmation de mot de passe"
                onChangeText={(value) => setConfirmedPassword(value)}
                value={confirmedPassword}
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor="#faf5ff"
              />
            </View>
            {passwordError && (
              <Text style={styles.error}>
                Les mots de passe ne correspondent pas
              </Text>
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.buttonSignUp}
                activeOpacity={0.8}
              >
                <Text style={styles.textButton}>s'enregistrer</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}

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
  },

  inputContainer: {
    width: "80%",
    borderColor: "#ec6e5b",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 10,
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
});
