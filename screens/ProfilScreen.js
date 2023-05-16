import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FontAwesome, { RegularIcons } from "react-native-vector-icons/FontAwesome";

// const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ProfilScreen() {

    const [firstname, setFirstname] = useState("Dim");
    const [lastname, setLastname] = useState("Dim");
    const [email, setEmail] = useState("bb@fg.fr");
    const [password, setPassword] = useState("******");
    const [isEnabled, setIsEnabled] = useState(false);
    // const [emailError, setEmailError] = useState(false);

    const dispatch = useDispatch();

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container1}>
            <ScrollView style={styles.scrollView}>


                <View style={styles.titleContainer}>
                    <Text style={styles.title1}>Profil</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <View style={styles.imageContainer}>
                        <FontAwesome name="user-circle" size={100} color="#6B21A8" />
                    </View>
                    <Text>Username</Text>
                </View>

                <KeyboardAvoidingView style={styles.userInfosContainer} behavior="padding" keyboardVerticalOffset={60}>
                    <Text>User Infos</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={firstname}
                            onChangeText={(value) => setFirstname(value)}
                            value={firstname} style={styles.input}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={lastname}
                            onChangeText={(value) => setLastname(value)}
                            value={lastname} style={styles.input}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={email}
                            onChangeText={(value) => setEmail(value)}
                            value={email} style={styles.input}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder={password}
                            onChangeText={(value) => setPassword(value)}
                            value={password} style={styles.input}
                            placeholderTextColor="black"
                        />
                    </View>
                    <View style={styles.notificationContainer}>
                        <Text>Events notifications</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#6B21A8' }}
                            thumbColor={isEnabled ? '#DDA304' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View style={styles.otherContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            //todo affichage suite information légales
                            // onPress={() => handleSubmit()}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>informations légales</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            //todo comportement on press
                            // onPress={() => handleSubmit()}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>Supprimer mon compte</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            //todo comportement on press
                            // onPress={() => handleSubmit()}
                            activeOpacity={0.8}>
                            <Text style={styles.buttonText}>déconnexion</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </View>

    )
};

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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,

    },
    userInfosContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        marginBottom: 30,
    },

    otherContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },

    title1: {
        width: "100%",
        fontSize: 48,
        fontWeight: 600,
        fontFamily: "roboto",
        textAlign: 'center'
    },
    inputContainer: {
        width: "80%",
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

    notificationContainer: {
        width: '80%',
        borderColor: '#6B21A8',
        borderWidth: 1,
        borderRadius: 25,
        padding: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    buttonContainer: {
        width: "50%",
        backgroundColor: '#6B21A8',
        borderRadius: 10,
        marginTop: 20,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },

    buttonText: {
        color: "#FAF5FF",
    },
});