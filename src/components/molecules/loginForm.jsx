import { SafeAreaView, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';

import InputEmail from '../atoms/input/inputEmail.jsx';
import InputPassword from '../atoms/input/inputPassword.jsx';
import LoginButton from '../atoms/button/login.jsx';
import CreateAccountPageButton from '../atoms/button/createAcc.jsx';

const LoginForm = ({ navigation, setEmail, setPassword, buttonText, showButtons, email, password}) => {
    return (
        <View style={styles.container}>
            <View style={ styles.formBox }>
                <InputEmail setEmail={setEmail}/>
                <InputPassword navigation={navigation} setPassword={setPassword} showButtons={showButtons} placeholderText={"Senha"}/>
                <LoginButton navigation={navigation} buttonText={buttonText} email={email} password={password}/>
                {showButtons && (
                    <CreateAccountPageButton navigation={navigation} style={styles.createButton}/>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        // flex: 1,
        justifyContent: 'flex-end',
        // marginTop: 400,
        // verticalAlign: 'top',
      },

      formBox: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center', 
        // justifyContent: 'center'
    },

})

export default LoginForm;