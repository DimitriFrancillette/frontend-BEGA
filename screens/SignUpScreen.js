import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
} from "react-native";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addUser } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen({ navigation }) {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!EMAIL_REGEX.test(email)) {
            setEmailError(true);
            return;
        }

        if (password !== confirmedPassword || password === '') {
            setPasswordError(true);
        } else {

            fetch(`http://192.168.1.32:3000/users/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
                }),
            }).then((response) => response.json()).then((data) => {
                console.log(data)
                //todo rajouter une condition en cas de retour négatif
                const newUser = {
                    firstname: data.user.firstname,
                    lastname: data.user.lastname,
                    email: data.user.email,
                    token: data.user.authTokens,
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
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.arrowContainer}>
                <FontAwesome
                    name='arrow-left'
                    size={30}
                    color='#DDA304'
                    onPress={() => navigation.navigate("Home")}
                />
            </View>
            <Image style={styles.logo} source={require("../assets/logo-bega.png")} />
            <View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Prénom"
                        onChangeText={(value) => setFirstname(value)}
                        value={firstname} style={styles.input}
                        placeholderTextColor="#faf5ff"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Nom"
                        onChangeText={(value) => setLastname(value)}
                        value={lastname} style={styles.input}
                        placeholderTextColor="#faf5ff"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Adresse email"
                        onChangeText={(value) => setEmail(value)}
                        value={email} style={styles.input}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoComplete="email"
                        placeholderTextColor="#faf5ff"
                    />
                </View>
                {emailError && <Text style={styles.error}>Adresse email invalide</Text>}
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
                {passwordError && <Text style={styles.error}>Les mots de passe ne correspondent pas</Text>}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => handleSubmit()}
                        style={styles.buttonSignUp}
                        activeOpacity={0.8}>
                        <Text style={styles.textButton}>s'enregistrer</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7935b0",
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    arrowContainer: {
        position:"absolute",
        marginTop: 70,
        marginLeft: 20,
        alignSelf: 'flex-start',
    },
    logo: {
        marginTop: 30,
        width: "100%",
        height: "30%",
    },
    inputContainer: {
        borderColor: '#ec6e5b',
        borderWidth: 1,
        borderRadius: 25,
        paddingLeft: 10,
        padding: 10,
        marginTop: 10,
    },
    input: {
        color: '#FAF5FF',
        fontSize: 16,
    },
    buttonContainer: {
        backgroundColor: '#6B21A8',
        borderRadius: 10,
        marginTop: 20,
        paddingTop: 8,
        paddingLeft: 20,
        paddingRight: 20,
        alignSelf: 'center',
    },

    textButton: {
        color: '#DDA304',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },
});