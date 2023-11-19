import React, { useState} from "react";
import { View, StyleSheet, SafeAreaView, Image, StatusBar} from 'react-native';

import CreateAccountForm from "../../molecules/createAccountForm";
import LoginFooter from "../../molecules/loginFooter";
import ReturnButton from "../../atoms/button/returnButton";
import InputConfirmPassowrd from "../../atoms/input/inputConfirmPassowrd";

const CreateAccount = ({ navigation}) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()



const handleEmailChange = (text) => {
    setEmail(text);
};

const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handlePassword2Change = (text) => {
    setPassword2(text);
  };

  return (
    <SafeAreaView style={ styles.container}>
        <ReturnButton navigation={navigation}/>
        <View>
        <Image source={require('../../../assets/Logo.png')} style={ styles.logo}/>
        <CreateAccountForm 
          navigation={navigation}
          setEmail={setEmail}
          setPassword={setPassword}
          setPassword2={setPassword2}
          buttonText={"Criar Conta"}

        />
        <View styles={styles.loginbox}>
        </View>
        </View>
        <LoginFooter />
        {/* <StatusBar /> */}
    </SafeAreaView>
  )

}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#191919',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  
  logo: {
    marginBottom: '25%',
    alignSelf: 'center',
  },


// loginbox: {
//   alignContent: 'stretch',
//   width: '90%',
//   marginBottom: 20,
//   borderRadius: 20,
//   height: 50,
//   backgroundColor: '#1e2817',
//   // O correto seria colocar a cor #43AF00 e uma opacidade de 0.1, mas sem alterar a opacidade da letra interna
// },

})

export default CreateAccount;