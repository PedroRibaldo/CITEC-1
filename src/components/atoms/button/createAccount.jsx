import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const CreateAccountButton = ({navigation, buttonText = 'Login', email, password}) => {
  const handleCreateAccount = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });

    console.log("Email: ", email);
    console.log("Password: ", password);
    navigation.navigate("Login")
  };
  return (
    <TouchableOpacity style={ styles.loginbutton } onPress={handleCreateAccount}>
      <Text style={ styles.loginButtonText }>{buttonText}</Text>
    </TouchableOpacity>
  )
        
}

const styles = StyleSheet.create ({
    loginbutton: {
        width: '90%',
        backgroundColor: '#004222',
        marginBottom: 20,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        height: 50,
      },

      loginButtonText: {
        color: '#C3C3C3',
        fontSize: 25,
        fontFamily: 'Montserrat-SemiBold',
      },
})

export default CreateAccountButton;