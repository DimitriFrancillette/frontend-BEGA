import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import AskFriendMessage from "../components/askFriendMessage";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../constants";
import { useNavigation } from "@react-navigation/native";
import ToastManager, { Toast } from "toastify-react-native";

const MessageScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.value);
  const [messagesList, setMessagesList] = useState();
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const [listfriend, setListfriend] = useState();

  const showToasts = () => {
    Toast.success("Vous venez d'ajouter un(e) ami(e) !");
  };
  const badToast = () => {
    Toast.error("Au revoir !");
  };

  const askFriend = (userId) => {
    console.log("iCCCCCIIIII", user.userId);
    fetch(`${BACKEND_URL}/askfriend/`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "Post",
      body: JSON.stringify({
        userIdMe: user.userId,
        userIdHim: userId,
        myName: user.email,
      }),
    });
  };

  const searchFriend = (value) => {
    setSearch(value);
    fetch(`${BACKEND_URL}/askfriend/findfriendbyemail`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "Post",
      body: JSON.stringify({ email: search }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListfriend(data.user);
      });
  };

  const acceptFriend = (userId) => {
    fetch(`${BACKEND_URL}/askfriend/acceptfriend`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userIdMe: user.userId,
        userIdHim: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.result) {
          badToast();
          return;
        }
        showToasts();
      });
    setReload(!reload);
  };

  const refuseFriend = (userId) => {
    fetch(`${BACKEND_URL}/askfriend/refusedfriend`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        userIdHim: userId,
        userIdMe: user.userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          return;
        }
        badToast();
        setReload(!reload);
      });
  };

  useEffect(() => {
    const fetchMessage = fetch(
      `${BACKEND_URL}/askfriend/getaskfriendmessage/${user.userId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMessagesList(data.findMessage.askFriend);
        console.log(data.findMessage.askFriend);
      });

    return () => {
      fetchMessage;
    };
  }, [reload]);

  return (
    <View style={styles.container}>
      <ToastManager />
      <ScrollView style={styles.scrollView}>
        <View style={styles.arrowContainer}>
          <FontAwesome
            name="arrow-left"
            size={30}
            color="#d48221"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <Image
          style={styles.logo}
          source={require("../assets/logo-bega.png")}
        />
        <View style={{ backgroundColor: "#7935b0" }}>
          <Text style={styles.title}>Ajouter vos ami(e)s</Text>
          <KeyboardAvoidingView style={{ width: "100%" }}>
            <TextInput
              onChangeText={(value) => searchFriend(value)}
              value={search}
              style={styles.input}
              placeholder="Chercher des ami(e)s"
            />
          </KeyboardAvoidingView>
          <View style={styles.container}>
            {listfriend?.map((data, i) => {
              return (
                <View key={i} >
                  <Text style={styles.title}>{data.email} </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => askFriend(data._id)}>
                      <Text style={styles.textButton}>ENVOYER UNE INVITATION</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View>
          {messagesList?.map((data, i) => {
            return (
              <AskFriendMessage
                key={i}
                message={data.message}
                userId={data.userId}
                acceptFriend={acceptFriend}
                refuseFriend={refuseFriend}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7935b0",
    color: '#FDBA74',
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
    color: '#FDBA74',
  },
  logo: {
    width: 400,
    height: 200,
  },
  buttonContainer: {
    backgroundColor: "#6B21A8",
    color: '#FDBA74',
    borderRadius: 10,
    padding: 5,
    alignSelf: "center",
  },
  textButton: {
    color: "#FDBA74",
    backgroundColor:'#6B21A8',
    fontFamily: "Inter",
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    height: 25,
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
  title: {
    fontSize: 25,
    fontWeight: 700,
    fontFamily: "Inter",
    textAlign: "center",
    color: '#d48221',
  },
  input: {
    width: "80%",
    fontFamily: "Inter",
    alignSelf: "center",
    color:"#6B21A8",
    marginHorizontal: "5%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    height: 40,
    marginTop: 25,
    backgroundColor: "#e9d5ff",
    fontSize: 18,
  },
});

export default MessageScreen;
