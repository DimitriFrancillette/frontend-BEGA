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
  SafeAreaView,
} from "react-native";
import AskFriendMessage from "../components/askFriendMessage";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../constants";
import ToastManager, { Toast } from "toastify-react-native";

const MessageScreen = () => {
  const user = useSelector((state) => state.user.value);
  const [messagesList, setMessagesList] = useState();
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState("");
  const [listfriend, setListfriend] = useState();

  const showToastsInvitation = () => {
    Toast.success("Demande envoyé 🤩");
  };

  const showToasts = () => {
    Toast.success("Vous venez d'ajouter un(e) ami(e) ! 🤩");
  };
  const badToast = () => {
    Toast.error("Au revoir ! 😌");
  };

  const askFriend = (userId) => {
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
    setReload(!reload);
    showToastsInvitation();
  };

  const searchFriend = (value) => {
    setSearch(value);
    fetch(`${BACKEND_URL}/askfriend/findfriendbyemail`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "Post",
      body: JSON.stringify({ email: value }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListfriend(value ? data.user : []);
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
        setReload(!reload);
        showToasts();
      })
      .catch((e) => {
        setReload(!reload);
        badToast();
      });
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
    });
    setReload(!reload);
    badToast();
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
      <SafeAreaView>
        <Text style={styles.title}>Invites tes ami(e)s</Text>
        <ScrollView style={styles.scrollView}>
          <View style={styles.friendsContainer}>
            <View style={styles.inviteContainer}>
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={60}
              >
                <TextInput
                  onChangeText={(value) => searchFriend(value)}
                  value={search}
                  style={styles.input}
                  placeholder="Chercher des ami(e)s"
                />
              </KeyboardAvoidingView>
              {listfriend?.map((data, i) => {
                return (
                  <View key={i} style={styles.invitation}>
                    <Text style={styles.email}>{data.email} </Text>
                    <TouchableOpacity
                      onPress={() => askFriend(data._id)}
                      style={styles.buttonContainer}
                    >
                      <Text style={styles.textButton}>Inviter</Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <View style={styles.messagesContainer}>
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
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FAF5FF",
  },
  scrollView: {
    width: "100%",
  },
  friendsContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  inviteContainer: {
    width: "80%",
  },
  invitation: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 4,
  },
  buttonContainer: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    padding: 8,
    alignSelf: "center",
  },
  textButton: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    fontSize: 38,
    fontWeight: 700,
    fontFamily: "Inter",
    textAlign: "center",
    marginBottom: 30,
  },
  email: {
    color: "#d48221",
  },
  input: {
    width: "100%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
  },
  messagesContainer: {
    marginTop: 20,
  },
});

export default MessageScreen;