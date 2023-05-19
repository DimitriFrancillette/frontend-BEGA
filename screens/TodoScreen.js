import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    Alert
} from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Checkbox from 'expo-checkbox';


export default function EventScreen({ navigation }) {
    const [eventTitle, setEventTitle] = useState("Nom de l'event");
    const [date, setDate] = useState("Date & Heure");
    const [address, setAddress] = useState("Nom & adresse du lieu rendez-vous");
    const [description, setDescription] = useState("Ajouter une description");
    const [isChanged, setIsChanged] = useState(false);
    const [isChecked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContentContainer}>

                <View style={styles.arrowContainer}>
                    <FontAwesome
                        name='arrow-left'
                        size={25}
                        color='#000000'
                        onPress={() => navigation.navigate("Events")}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>To Do List</Text>
                </View>

                <KeyboardAvoidingView style={styles.eventInfosContainer} behavior="padding" keyboardVerticalOffset={60}>

                    <View style={styles.tasksContainer}>
                    <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={isChecked ? '#4630EB' : undefined}/>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Date"
                                onChangeText={(value) => { setDate(value), setIsChanged(true) }}
                                value={date} style={styles.input}
                                placeholderTextColor="black"
                            />
                        </View>
                        <FontAwesome name="user-circle" size={30} color="#6B21A8" style={{ marginRight: 10 }} />
                    </View>


                </KeyboardAvoidingView>


            </ScrollView>

        </View>
    )
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
        marginTop: 15,
        marginLeft: 20,
        alignSelf: "flex-start",
    },
    titleContainer: {
        justifyContent: 'center',
        marginBottom: 20,
    },

    title: {
        width: "100%",
        fontSize: 38,
        fontWeight: '600',
        fontFamily: "Roboto",
        textAlign: "center",
    },


    eventInfosContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "90%",
    },

    tasksContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },


    inputContainer: {
        width: "75%",
        borderColor: '#6B21A8',
        borderWidth: 1,
        borderRadius: 25,
        padding: 10,
        marginTop: 10,
    },

    input: {
        color: '#000000',
        fontSize: 16,
    },




// -----------------------------------





    buttonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        width: "100%",
        marginBottom: 30,
    },
    buttonContainer: {
        width: "28%",
        backgroundColor: '#6B21A8',
        borderRadius: 10,
        marginTop: 15,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: "#DDA304",
    },

    guestsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: 'flex-start',
        marginBottom: 10,
    },

    guestsListContainer: {
        width: '50%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    infosText: {
        color: '#6B21A8',
        fontSize: 20,
        fontWeight: 600,
        textDecorationLine: 'underline',
        marginBottom: 10,
    },

    oneGuestContainer: {
        marginTop: 10,
        width: "60%",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    guestsButtonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});