import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
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
        <View style={styles.container}>
            <Text>SignUp Screen </Text>
            <View>
                <TextInput placeholder="Prénom" onChangeText={(value) => setFirstname(value)} value={firstname} style={styles.input} />
                <TextInput placeholder="Nom" onChangeText={(value) => setLastname(value)} value={lastname} style={styles.input} />
                <TextInput
                    placeholder="Adresse email"
                    onChangeText={(value) => setEmail(value)}
                    value={email} style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoComplete="email"
                />
                {emailError && <Text style={styles.error}>Adresse email invalide</Text>}
                <TextInput placeholder="Mot de passe" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />
                <TextInput placeholder="Confirmation de mot de passe" onChangeText={(value) => setConfirmedPassword(value)} value={confirmedPassword} style={styles.input} />
                {passwordError && <Text style={styles.error}>Les mots de passe ne correspondent pas</Text>}
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
                    <Text style={styles.textButton}>s'enregistrer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
    justifyContent: 'center',

    },
    input: {
        width: '65%',
        marginTop: 6,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 16,
    },
    button: {
        width: '30%',
        alignItems: 'center',
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