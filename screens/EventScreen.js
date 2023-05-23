import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Button,
  Switch,
  Alert,
  Modal,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BACKEND_URL } from "../constants";
import Todo from "../components/TodoComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function EventScreen({ navigation, route }) {
  const user = useSelector((state) => state.user.value);
  const [eventTitle, setEventTitle] = useState("Nom de l'event");
  const [date, setDate] = useState("Date & Heure");
  const [address, setAddress] = useState("Nom & adresse du lieu rendez-vous");
  const [description, setDescription] = useState("Ajouter une description");
  const [participants, setParticipants] = useState();
  const [isChanged, setIsChanged] = useState(false);
  const [showCagnotte, setShowCagnotte] = useState(false);
  const [showTodo, setShowTodo] = useState(false);
  const [todoList, setTodoList] = useState();
  const [transactions, setTransactions] = useState([]);
  const [amountCagnotte, setAmountCagnotte] = useState(0);
  const [strongboxId, setStrongboxId] = useState();

  const { eventId } = route.params;

  const handleCheckbox = (todo, id) => {
    console.log("TODO", todo, id);
  };

  useFocusEffect(
    useCallback(() => {
    const fetchEvent =  fetch(`${BACKEND_URL}/events/findevent/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          const newDate = new Date(data.event.date).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
          setEventTitle(data.event.title);
          setAddress(data.event.location);
          setDescription(data.event.description);
          setParticipants(data.event.participants);
          setTodoList(data.event.todoId);
          setStrongboxId(data.event.strongboxId);
          setDate(newDate);
        });
    //  const fetchGetStrongbox = fetch(`${BACKEND_URL}/strongbox/getstrongbox/${eventId}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data.strongbox.strongboxId.transactionId)
    //       setTransactions(data.strongbox.strongboxId.transactionId);
    //     });
      return () => {
        fetchEvent
        // fetchGetStrongbox
      }
    }, [])
  );

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
        console.log(createdTransactionData);
        if (createdTransactionData.result === false) {
          return;
        }
        setTransactions([...transactions, createdTransactionData.saveTransaction])
        setAmountCagnotte(0);
      });
  };

  const todo = todoList?.map((data) => {
    return (
      <Todo
        navigation={navigation}
        closeModal={() => setShowTodo(!showTodo)}
        handleCheckbox={handleCheckbox}
        title={data.taskName}
        description={data.description}
        id={data._id}
        isDone={data.isDone}
        participants={data.userId}
      />
    );
  });

  
   const userList = transactions?.map(transaction => transaction.userId.firstname)
  const uniqueUserList = [...new Set(userList)];
 

  const people = uniqueUserList?.map((user, i) => {
    return (
      <Text key={i} style={styles.people}>
        {user}
      </Text>
    );
  });

  let totalStrongBox = 0;
  for (let transaction of transactions) {
    totalStrongBox += transaction.amount;
  }

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
            onPress={() => navigation.navigate("MyEvents")}
          />
        </View> */}
        <View style={styles.titleContainer}>
          <FontAwesome
            name="arrow-left"
            size={25}
            color="#000000"
            style={{ marginLeft: 10 }}
            onPress={() => navigation.navigate("MyEvents")}
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
          <View style={styles.inputDateContainer}>
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
                {people}
              </View>
              <View style={styles.arrowContainerCagnotte}>
                <FontAwesome
                  name="arrow-left"
                  size={25}
                  color="#000000"
                  onPress={() => setShowCagnotte(false)}
                />
              </View>
              <TouchableOpacity
                style={styles.cagnotteValidButton}
                activeOpacity={0.8}
                //onPress={}
              >
                <Text style={styles.textButtonValid}> Valider </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </SafeAreaView>
        {/*Modal TODO */}
        <Modal animationType={"slide"} transparent={false} visible={showTodo}>
          <View style={styles.arrowContainer}>
            <FontAwesome
              name="arrow-left"
              size={25}
              color="#000000"
              onPress={() => setShowTodo(!showTodo)}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>To Do List</Text>
          </View>
          {todo}
          <TouchableOpacity style={styles.plusButton}>
            <Text>
              <FontAwesome name="plus" size={50} color="#6B21A8" />
            </Text>
          </TouchableOpacity>
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

            <View style={styles.oneGuestContainer}>
              <FontAwesome
                name="user-circle"
                size={50}
                color="#6B21A8"
                style={{ marginRight: 10 }}
              />
              <Text>Latifa</Text>
            </View>

            <View style={styles.oneGuestContainer}>
              <FontAwesome
                name="user-circle"
                size={50}
                color="#6B21A8"
                style={{ marginRight: 10 }}
              />
              <Text>Oksana</Text>
            </View>

            <View style={styles.oneGuestContainer}>
              <FontAwesome
                name="user-circle"
                size={50}
                color="#6B21A8"
                style={{ marginRight: 10 }}
              />
              <Text>Vincent</Text>
            </View>

            <View style={styles.oneGuestContainer}>
              <FontAwesome
                name="user-circle"
                size={50}
                color="#6B21A8"
                style={{ marginRight: 10 }}
              />
              <Text>Dimitri</Text>
            </View>
          </View>
          <View style={styles.guestsButtonContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                // onPress={() => handleRemove()}
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
    position: "absolute",
    zIndex: 1,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  title: {
    width: "100%",
    fontSize: 28,
    fontWeight: "600",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  eventInfosContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "90%",
  },
  inputDateContainer: {
    width: "50%",
    borderColor: "#6B21A8",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
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
  plusButton: {
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
});
