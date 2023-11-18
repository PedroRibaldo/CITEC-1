import { SafeAreaView, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';

import InputEmail from '../atoms/input/inputEmail.jsx';
import InputPassword from '../atoms/input/inputPassword.jsx';
import LoginButton from '../atoms/button/login.jsx';
import CreateAccount from '../atoms/button/createAcc.jsx';

const LoginForm = ({ navigation, setEmail, setPassword }) => {
    return (
        <View style={ styles.formBox }>
            <InputEmail setEmail={setEmail}/>
            <InputPassword navigation={navigation} setPassword={setPassword}/>
            <LoginButton navigation={navigation}/>
            <CreateAccount navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create ({
      formBox: {
        alignItems: 'center', 
        alignSelf: 'stretch',
        // Está mexendo na lateral
        position: 'absolute',
        right: 0,
        left: 0,
    },
})

export default LoginForm;