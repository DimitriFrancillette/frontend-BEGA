import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
} from "react-native";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_URL } from "../constants";
import Todo from "../components/TodoComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CreateTodoModal from "../components/CreateTodoComponent";

export default function EventScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const [eventTitle, setEventTitle] = useState("Nom de l'event");
  const [date, setDate] = useState("Date & Heure");
  const [address, setAddress] = useState("Nom & adresse du lieu rendez-vous");
  const [description, setDescription] = useState("Ajouter une description");
  const [participants, setParticipants] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [showCagnotte, setShowCagnotte] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [todoList, setTodoList] = useState();
  const [transactions, setTransactions] = useState([]);
  const [amountCagnotte, setAmountCagnotte] = useState(0);
  const [strongboxId, setStrongboxId] = useState();
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  const [reloadTodo, setReloadTodo] = useState(false);
  const [friends, setFriends] = useState([]);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [newParticipants, setNewParticipants] = useState([]);

  const { eventId } = route.params;
  ////////////////////todo/////////////////////////////
  const handleCheckbox = (isDone, todoId) => {
    fetch(`${BACKEND_URL}/todo/updatetodo`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ todoId, userId: user.userId }),
    });
    setReloadTodo(!reloadTodo);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchEvent = fetch(`${BACKEND_URL}/events/findevent/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          const newDate = new Date(data.event.date).toLocaleString("fr-FR", {
            timeZone: "Europe/Paris",
          });
          setEventTitle(data.event.title);
          setAddress(data.event.location);
          setDescription(data.event.description);
          setParticipants(data.event.participants);
          setTodoList(data.event.todoId);
          setStrongboxId(data.event.strongboxId);
          setDate(newDate);
        });
      const fetchGetStrongbox = fetch(
        `${BACKEND_URL}/strongbox/getstrongbox/${eventId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTransactions(data.strongbox.strongboxId.transactionId);
        });
      return () => {
        fetchEvent;
        fetchGetStrongbox;
      };
    }, [])
  );
  const handleTodo = (description, taskName) => {
    fetch(`${BACKEND_URL}/todo/addtodo`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ description, taskName, eventId }),
    })
      .then((response) => response.json())
      .then((result) => {
        setTodoList([...todoList, result.saveTodo]);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  ////////////////////todo/////////////////////////////

  const handleParticipate = () => {
    fetch(`${BACKEND_URL}/transaction/createtransaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountCagnotte,
        userId: user.userId,
        strongboxId: strongboxId,
      }),
    })
      .then((response) => response.json())
      .then((createdTransactionData) => {
        if (createdTransactionData.result === false) {
          return;
        }
        setTransactions([
          ...transactions,
          createdTransactionData.saveTransaction,
        ]);
        setAmountCagnotte(0);
      });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchEvent = fetch(`${BACKEND_URL}/events/findevent/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setEventTitle(data.event.title);
          setAddress(data.event.location);
          setDescription(data.event.description);
          setParticipants(data.event.participants);
          setTodoList(data.event.todoId);
          setStrongboxId(data.event.strongboxId);
        });
      const fetchGetStrongbox = fetch(
        `${BACKEND_URL}/strongbox/getstrongbox/${eventId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTransactions(data.strongbox.strongboxId.transactionId);
        });

      return () => {
        fetchEvent;
        fetchGetStrongbox;
      };
    }, [reloadTodo])
  );
  ///////////////////////todo//////////////////////////////////////
  const todo = todoList?.map((data, i) => {
    return (
      <Todo
        key={i}
        navigation={navigation}
        closeModal={() => setShowTodo(!showTodo)}
        handleCheckbox={handleCheckbox}
        title={data.taskName}
        description={data.description}
        id={data._id}
        isDone={data.isDone}
        participants={data.userId}
        reloadTodo={() => setReloadTodo(!reloadTodo)}
      />
    );
  });
  ///////////////////////todo//////////////////////////////////////

  const userList = transactions?.map(
    (transaction) => transaction.userId.firstname
  );

  const uniqueUserList = [...new Set(userList)];
  const people = uniqueUserList?.map((user, i) => {
    return (
      <View key={i} >
      <Text style={styles.people}>
        {user}
      </Text>
      </View>
    );
  });

  let totalStrongBox = 0;
  for (let transaction of transactions) {
    totalStrongBox += transaction.amount;
  }

  const guestList =  participants.map((participant, i) => {
    return (
      <View key={i} style={styles.oneGuestContainer}>
        <FontAwesome
          name="user-circle"
          size={50}
          color="#6B21A8"
          style={{ marginRight: 10 }}
        />
        <Text>{participant.userId.firstname}</Text>
      </View>
    );
  });

  const showGuests = () => {
    setShowFriendModal(!showFriendModal);
    fetch(`${BACKEND_URL}/users/getfriends/${user.userId}`)
      .then((response) => response.json())
      .then((data) => {
        setFriends(data.user.friends);
      });
  };

  let friendsList = friends.map((data, i) => {
    let inviteIcon = "user-plus";

    const invited = newParticipants.includes(data._id);

    !invited ? (inviteIcon = "user-plus") : (inviteIcon = "minus");
    return (
      <View key={i} style={styles.friendContainer}>
        <Text onPress={() => handleGuest(data._id)} style={styles.participant}>
          {data.firstname}
        </Text>
        <FontAwesome
          onPress={() => handleGuest(data._id)}
          name={inviteIcon}
          size={30}
          color="#6B21A8"
        />
      </View>
    );
  });

  const handleGuest = (guestId) => {
    console.log("NEW PART", newParticipants);
    console.log(guestId);

    const invited = newParticipants.includes(guestId);
    console.log("INVITED", invited);

    if (!invited) {
      setNewParticipants([...newParticipants, guestId]);
      console.log("ADDED");
      // showToasts();
    } else {
      setNewParticipants(newParticipants.filter((e) => e !== guestId));
      console.log("REMOVED");
      // badToast();
    }
  };

  const updateEvent = () => {
    console.log("NEW PARTS", newParticipants);
    let updatedParticipantsList = [];

    for (const participant of participants) {
      const object = { userId: participant.userId._id, role: participant.role };
      updatedParticipantsList.push(object);
    }

    for (const newParticipant of newParticipants) {
      const object = { userId: newParticipant, role: "participant" };
      updatedParticipantsList.push(object);
    }
    fetch(`${BACKEND_URL}/events/updateevent`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: eventTitle,
        location: address,
        description: description,
        eventId: eventId,
        participants: updatedParticipantsList,
      }),
    })
      .then((response) => response.json())
      .then((updateData) => {
        if (updateData.result === false) {
          console.log(updateData);
          setNewParticipants([]);
          return;
        }
        console.log("FETCH UPDATE", updateData);
        setNewParticipants([]);
        setReloadTodo(!reloadTodo);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}
      >
        {/* <View style={styles.arrowContainer}>
          <FontAwesome
            name="arrow-left"
            size={25}
            color="#000000"
            onPress={() => navigation.navigate("Mes Events")}
          />
        </View> */}
        <View style={styles.titleContainer}>
          <FontAwesome
            name="arrow-left"
            size={25}
            color="#000000"
            style={{ marginLeft: 10 }}
            onPress={() => {
              navigation.navigate("Mes Events")
              updateEvent();
            }}
          />
          <TextInput
            placeholder="Nom"
            onChangeText={(value) => {
              setEventTitle(value), setIsChanged(true);
            }}
            value={eventTitle}
            style={styles.title}
            placeholderTextColor="black"
          />
        </View>
        <KeyboardAvoidingView
          style={styles.eventInfosContainer}
          behavior="padding"
          keyboardVerticalOffset={60}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Date"
              onChangeText={(value) => {
                setDate(value), setIsChanged(true);
              }}
              value={date}
              style={styles.input}
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="adresse"
              onChangeText={(value) => {
                setAddress(value), setIsChanged(true);
              }}
              value={address}
              style={styles.input}
              placeholderTextColor="black"
            />
          </View>
          <View style={styles.inputDescContainer}>
            <TextInput
              placeholder="description"
              onChangeText={(value) => {
                setDescription(value), setIsChanged(true);
              }}
              value={description}
              style={styles.input}
              placeholderTextColor="black"
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </KeyboardAvoidingView>
        <SafeAreaView style={{ flex: 1 }}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={showCagnotte}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            <View style={styles.modalCagnotte}>
              <View style={styles.titleGift}>
                <Text style={styles.titleCagnotte}>Cagnotte</Text>
                <FontAwesome name="gift" size={70} color="#6B21A8" />
              </View>

              <View style={styles.amountAdd}>
                <TextInput
                  onChangeText={setAmountCagnotte}
                  value={amountCagnotte.toString()}
                  style={styles.inputAmount}
                  inputMode="numeric"
                  placeholderTextColor="grey"
                />
                <TouchableOpacity
                  style={styles.addAmountButton}
                  activeOpacity={0.8}
                  onPress={handleParticipate}
                >
                  <Text style={styles.textaddAmount}> Ajouter </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.total}> Total : {totalStrongBox} €</Text>
              <View style={styles.showParticipants}>
                <Text style={styles.participe}>Participants :</Text>
                {uniqueUserList?.map((user, i) => {
                  return (
                   <View key={i}>
                      <Text  style={styles.people}>
                        {user}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.arrowContainerCagnotte}>
                <FontAwesome
                  name="arrow-left"
                  size={25}
                  color="#000000"
                  onPress={() => { 
                    setShowCagnotte(false)
                    
                  }} 
                />
              </View>
              <TouchableOpacity
                style={styles.cagnotteValidButton}
                activeOpacity={0.8}
                onPress={() => setShowCagnotte(false)}
              >
                <Text style={styles.textButtonValid}> Valider </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </SafeAreaView>
        {/*Modal TODO */}
        <Modal animationType={"slide"} transparent={false} visible={showTodo}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.modalTodo}>
              <View style={styles.arrowContainerTodo}>
                <FontAwesome
                  name="arrow-left"
                  size={25}
                  color="#000000"
                  onPress={() => setShowTodo(!showTodo)}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Liste des To Do</Text>
              </View>
              {todo}
              {!showCreateTodo && (
                <>
                  <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => setShowCreateTodo(true)}
                  >
                    <Text style={styles.plusButtonText}>Nouvelle tâche</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.todoValidButton}
                    activeOpacity={0.8}
                    onPress={() => setShowTodo(false)}
                  >
                    <Text style={styles.textButtonValid}> Valider </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            {showCreateTodo && (
              <Modal
                animationType={"fade"}
                transparent={true}
                visible={showCreateTodo}
              >
                <CreateTodoModal
                  closeModal={() => setShowCreateTodo(false)}
                  handleTodo={handleTodo}
                />
              </Modal>
            )}
          </SafeAreaView>
        </Modal>
        {/*Modal TODO */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowCagnotte(!showCagnotte);
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>CAGNOTTE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => setShowTodo(!showTodo)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>TO DO LIST</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              // onPress={() => {
              //   setShowModal(!showModal);
              // }}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>DÉPENSES</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.guestsContainer}>
          <View style={styles.guestsListContainer}>
            <Text style={styles.infosText}>Guest List</Text>
            {guestList}
          </View>
          <View style={styles.guestsButtonContainer}>
            <View style={styles.buttonContainer}>
              <SafeAreaView style={{ flex: 1 }}>
                <Modal
                  animationType={"slide"}
                  transparent={false}
                  visible={showFriendModal}
                  onRequestClose={() => {
                    console.log("Modal has been closed.");
                  }}
                >
                  <View style={styles.modalFriend}>
                    <Text style={styles.title}> Liste d'amis</Text>
                    {/* <TextInput
onChangeText={(value) => setEmailInvitation(value)}
value={emailInvitation}
style={styles.inputEmailInvitation}
placeholder="email de l'invité"
placeholderTextColor="#c0c0c0"
/>
<View style={styles.closeButton}>
<Button
color="#841584"
title="X"
onPress={() => {
setShowModal(!showModal);
}}
/>
</View> */}

                    {friendsList}

                    <TouchableOpacity
                      style={styles.modalValidButton}
                      activeOpacity={0.8}
                      onPress={() => {
                        updateEvent();
                        setShowFriendModal(!showFriendModal);
                      }}
                    >
                      <Text style={styles.textButtonValid}> Valider </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </SafeAreaView>
              <TouchableOpacity
                onPress={() => {
                  showGuests();
                }}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF5FF",
    alignItems: "center",
    paddingTop: 60,
  },
  scrollView: {
    width: "100%",
  },
  scrollViewContentContainer: {
    // flex: 1,
    alignItems: "center",
  },
  arrowContainer: {
    zIndex: 1,
    marginTop: 20,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginBottom: 30,
  },
  title: {
    width: "100%",
    fontSize: 36,
    fontWeight: "600",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  eventInfosContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "90%",
  },
  inputContainer: {
    width: "100%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
  },
  inputDescContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
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

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "28%",
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#DDA304",
  },

  guestsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },

  guestsListContainer: {
    width: "50%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infosText: {
    color: "#6B21A8",
    fontSize: 20,
    fontWeight: 600,
    textDecorationLine: "underline",
    marginBottom: 10,
  },

  oneGuestContainer: {
    marginTop: 10,
    width: "60%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  guestsButtonContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#3f2949",
    marginTop: 10,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 30,
  },
  modalTodo: {
    height: "100%",
    display: "flex",
    paddingTop: 20,
    alignItems: "center",
  },
  arrowContainerTodo: {
    position: "absolute",
    zIndex: 1,
    marginTop: 30,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  plusButton: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    padding: 14,
    alignItems: "center",
    marginTop: 50,
  },
  plusButtonText: {
    color: "white",
  },
  todoValidButton: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    borderColor: "#DDA304",
    borderWidth: 1,
    paddingTop: 8,
    alignItems: "center",
    display: "flex",
    position: "absolute",
    bottom: 70,
    paddingHorizontal: 40,
  },
  modalCagnotte: {
    height: "100%",
    display: "flex",
    paddingTop: 20,
    alignItems: "center",
  },
  cagnotteValidButton: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    borderColor: "#DDA304",
    borderWidth: 1,
    paddingTop: 8,
    alignItems: "center",
    display: "flex",
    position: "absolute",
    bottom: 70,
    paddingHorizontal: 40,
  },

  textButtonValid: {
    color: "#DDA304",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  titleCagnotte: {
    fontSize: 35,
    marginRight: 40,
  },
  titleGift: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 120,
    paddingRight: 55,
    paddingTop: 20,
    paddingBottom: 20,
  },
  total: {
    fontSize: 30,
    fontWeight: 400,
    position: "absolute",
    bottom: 150,
  },
  people: {
    fontSize: 20,
    marginTop: 5,
  },
  arrowContainerCagnotte: {
    position: "absolute",
    zIndex: 1,
    marginTop: 60,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  amountAdd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
  },

  addAmountButton: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    padding: 8,
    marginLeft: 30,
  },
  textaddAmount: {
    color: "#ffff",
    fontSize: 20,
  },
  inputAmount: {
    color: "#6B21A8",
    fontSize: 20,
    borderRadius: 6,
    borderColor: "#DDA304",
    borderWidth: 0.2,
    padding: 10,
    paddingHorizontal: 20,
  },
  showParticipants: {
    display: "flex",
    alignContent: "flex-end",
    marginTop: 20,
  },
  participe: {
    color: "#6B21A8",
    fontWeight: 700,
  },
  modalFriend: {
    alignItems: "center",
    backgroundColor: "#FAF5FF",
    paddingTop: 30,
    width: "100%",
    height: "100%",
  },
  modalValidButton: {
    backgroundColor: "#6B21A8",
    borderRadius: 10,
    borderColor: "#DDA304",
    borderWidth: 1,
    paddingTop: 8,
    alignItems: "center",
    position: "absolute",
    bottom: 70,
    paddingHorizontal: 40,
  },
  participant: {
    fontSize: 30,
    margin: 10,
  },
  friendContainer: {
    marginTop: 20,
    width: "70%",
    borderColor: "#DDA304",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
