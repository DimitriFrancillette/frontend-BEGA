import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image } from "react-native";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from "../reducers/user";

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpScreen() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    //todo verification
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (!EMAIL_REGEX.test(email)) {
            setEmailError(true);
            return
        }

        if (password !== confirmedPassword) {
            setPasswordError(true);
        } else {
            console.log(firstname, lastname, email, password, confirmedPassword);

            //*modele du fetch pour post dans le backend
            // fetch(`http://mon.adresse.ip/maRouteBack`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         firstname: firstname,
            //         lastname: lastname,
            //         email: email,
            //         password: password
            //     }),
            // }).then((response) => response.json())
            //     .then((data) => {
            //         console.log(data)
            //     });

            const newUser = {
                firstname,
                lastname,
                email,
                password,
            };

            dispatch(addUser(newUser));

            setFirstname('');
            setLastname('');
            setEmail('');
            setPassword('');
            setConfirmedPassword('');
        }

    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Image style={styles.logo} source={require("../assets/logo-bega.png")} />
            <View>
                <View style={styles.inputContainer}>
                <TextInput placeholder="Prénom" onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                <TextInput placeholder="Nom" onChangeText={(value) => setLastname(value)} value={lastname} style={styles.input} />
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
                />
                </View>
                {emailError && <Text style={styles.error}>Adresse email invalide</Text>}
                <View style={styles.inputContainer}>
                <TextInput placeholder="Mot de passe" onChangeText={(value) => setPassword(value)} value={password} secureTextEntry={true} style={styles.input} />
                </View>
                <View style={styles.inputContainer}>
                <TextInput placeholder="Confirmation de mot de passe" onChangeText={(value) => setConfirmedPassword(value)} value={confirmedPassword} secureTextEntry={true} style={styles.input} />
                </View>
                {passwordError && <Text style={styles.error}>Les mots de passe ne correspondent pas</Text>}
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>s'enregistrer</Text>
                </TouchableOpacity>
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
    logo: {
        width: "100%",
        height: "40%",
    },

    inputContainer: {
        borderColor: '#ec6e5b',
        borderWidth: 1,
        borderRadius:15,
        paddingLeft:10,
        marginTop: 6,
        fontSize: 16,
    },
    input: {
        

        color: '#FAF5FF',

    },
    button: {
        width: '30%',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 8,
        backgroundColor: '#ec6e5b',
        borderRadius: 10,
    },
    textButton: {
        color: '#ffffff',
        height: 30,
        fontWeight: '600',
        fontSize: 16,
    },
});