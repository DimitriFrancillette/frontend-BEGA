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
    Toast.success("Un nouvel ami youpi");
  };
  const badToast = () => {
    Toast.error("Aurevoir !");
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
            color="#DDA304"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <Image
          style={styles.logo}
          source={require("../assets/logo-bega.png")}
        />
        <View style={{ backgroundColor: "#C7ABDE" }}>
          <Text style={styles.title}>Search a friend</Text>
          <KeyboardAvoidingView style={{ width: "100%" }}>
            <TextInput
              onChangeText={(value) => searchFriend(value)}
              value={search}
              style={styles.input}
              placeholder="search friends"
            />
          </KeyboardAvoidingView>
          <View style={styles.container}>
            {listfriend?.map((data, i) => {
              return (
                <View>
                  <Text style={styles.title}>{data.email} </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => askFriend(data._id)}>
                      <Text style={styles.textButton}>demander en ami</Text>
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
    width: 400,
    height: 200,
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
  title: {
    fontSize: 25,
    fontWeight: 600,
    fontFamily: "Roboto",
    textAlign: "center",
  },
  input: {
    width: "90%",
    marginHorizontal: "5%",
    padding: 10,
    marginBottom: 10,
    height: 40,
    marginTop: 25,
    backgroundColor: "#ffff",
    fontSize: 18,
  },
});

export default MessageScreen;
