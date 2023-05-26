import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { addUser, disconnectUser } from "../reducers/user";
import { BACKEND_URL } from "../constants";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ToastManager, { Toast } from "toastify-react-native";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ProfilScreen({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const showToasts = () => {
    Toast.success("Profil modifié");
  };
  const badToast = () => {
    Toast.error("Profil modifié");
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const updateProfil = () => {
    fetch(`${BACKEND_URL}/users/updateprofil/`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        userId: user.userId,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.result) {
          showToasts();
        } else {
          badToast();
        }
      })
      .catch((e) => badToast());
    console.log("Profil", user);
  };

  useEffect(() => {
    const fetchDataUser = fetch(`${BACKEND_URL}/users/userprofil`, {
      headers: { Authorization: `Bearer ${user.token}` },
      Authorization: `Bearer ${user.token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.result) {
          setEmail(data.user.email);
          setFirstname(data.user.firstname);
          setLastname(data.user.lastname);
        }
      });
    return () => fetchDataUser;
  }, []);

  const createAlert = (user) =>
    Alert.alert("Confirmation", "Voulez-vous valider ces modifications?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          updateProfil();
        },
      },
    ]);

  const handleModification = () => {
    if (!EMAIL_REGEX.test(email)) {
      setEmailError(true);
      return;
    }

    if (firstname === "" || lastname === "") {
      setFieldError(true);
      return;
    }

    const updateUser = {
      firstname: firstname,
      lastname: lastname,
      email: email,
    };
    //todo fetch vers le back à faire pour changer les infos dans la DB
    createAlert(updateUser);
  };

  const handleDisconnect = () => {
    fetch(`${BACKEND_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      method: "POST",
    });
    dispatch(disconnectUser());
    navigation.navigate("Home");
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handleDeleteProfil = () => {
    fetch(`${BACKEND_URL}/users/deleteprofil`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({ email }),
    });
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container1}>
      <ToastManager />
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Profil</Text>
        </View>

        <View style={styles.avatarContainer}>
          <View style={styles.imageContainer}>
            <FontAwesome name="user-circle" size={90} color="#6B21A8" />
          </View>
          <Text style={styles.userNameText}>{firstname}</Text>
        </View>

        <KeyboardAvoidingView
          style={styles.userInfosContainer}
          behavior="padding"
          keyboardVerticalOffset={60}
        >
          <Text style={styles.infosText}>User Infos</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Prénom"
              onChangeText={(value) => {
                setFirstname(value), setIsChanged(true);
              }}
              value={firstname}
              style={styles.input}
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Nom"
              onChangeText={(value) => {
                setLastname(value), setIsChanged(true);
              }}
              value={lastname}
              style={styles.input}
              placeholderTextColor="black"
            />
          </View>
          {fieldError && (
            <Text style={styles.error}>
              Les champs ne peuvent pas être sans récolte
            </Text>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              onChangeText={(value) => {
                setEmail(value), setIsChanged(true);
              }}
              value={email}
              style={styles.input}
              placeholderTextColor="black"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
            />
          </View>
          {emailError && (
            <Text style={styles.error}>Adresse email invalide</Text>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              onChangeText={(value) => {
                setPassword(value), setIsChanged(true);
              }}
              value={password}
              style={styles.input}
              placeholderTextColor="black"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.notificationContainer}>
            <Text>Events notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#6B21A8" }}
              thumbColor={isEnabled ? "#DDA304" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          {isChanged && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleModification()}
                style={styles.buttonSignUp}
                activeOpacity={0.8}
              >
                <Text style={styles.modificationButton}>
                  Enregistrer les modifications
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </KeyboardAvoidingView>
        <View style={styles.otherContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              //todo affichage suite information légales
              // onPress={() => handleSubmit()}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>informations légales</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleDeleteProfil()}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Supprimer mon compte</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleDisconnect()}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>déconnexion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    paddingTop: 60,
  },
  scrollView: {
    width: "100%",
  },
  titleContainer: {
    flex: 1,
    marginBottom: 20,
  },
  avatarContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },

  userNameText: {
    fontSize: 20,
    fontWeight: 600,
  },
  userInfosContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },

  infosText: {
    color: "#6B21A8",
    fontSize: 20,
    fontWeight: 600,
    textDecorationLine: "underline",
  },

  otherContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  title: {
    width: "100%",
    fontSize: 48,
    fontWeight: 600,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  inputContainer: {
    width: "80%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
  },
  input: {
    color: "#000000",
    fontSize: 16,
  },
  error: {
    color: "#DDA304",
    alignSelf: "center",
  },
  notificationContainer: {
    width: "80%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 5,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  buttonContainer: {
    width: "50%",
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
  },

  modificationButton: {
    color: "#DDA304",
  },
  buttonText: {
    color: "#FAF5FF",
  },
});
