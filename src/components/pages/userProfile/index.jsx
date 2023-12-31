import React, { cloneElement, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, Modal } from "react-native";
import { useProfilePhoto } from '../../atoms/context/profilePhoto';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, getFirestore, getDocs, doc, collection, query, where } from "firebase/firestore";
import db from "../../../Services/firebaseConfig"

import ReturnButton from "../../atoms/button/returnButton";
import Separator from "../../atoms/plain/separator";

const UserProfile = ({ navigation }) => {

    const { profilePhoto } = useProfilePhoto();

    const [userName, setUserName] = useState("");

    const [configModalVisible, setConfigModalVisible] = useState(false);
    const [historyModalVisible, setHistoryModalVisible] = useState(false);
    const [accessibilityModalVisible, setAccessibilityModalVisible] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    console.log(user.uid)

                    const usersCollectionRef = collection(db, "users");
                    const userDocQuery = query(usersCollectionRef, where("uid", "==", user.uid));
                    const userDocsSnapshot = await getDocs(userDocQuery);

                    if (!userDocsSnapshot.empty) {
                        const userDocSnapshot = userDocsSnapshot.docs[0];
                        const userNameFromFirestore = userDocSnapshot.data().Name;
                        console.log("Nome do usuário do Firestore:", userNameFromFirestore);
                        setUserName(userNameFromFirestore);
                    } else {
                        console.error("Documento não encontrado no Firestore para o UID:", user.uid);
                        console.log("Snapshot:", userDocsSnapshot); // Adicione esta linha
                    }
                } catch (error) {
                    console.log("Erro ao buscar o nome do usuário", error);
                }
            } else {
                console.log("Usuário não autenticado");
            }
        });

        return () => unsubscribe(); // Função de limpeza para desinscrever do listener ao desmontar o componente
    }, []); // O segundo argumento [] garante que o useEffect seja executado apenas uma vez ao montar o componente

    

    const openConfigModal = () => {
        setConfigModalVisible(true);
    };

    const openHistoryModal = () => {
        setHistoryModalVisible(true);
    };

    const closeConfigModal = () => {
        setConfigModalVisible(false);
    };

    const closeHistoryModal = () => {
        setHistoryModalVisible(false);
    };

    const openAccessibilityModal = () => {
        setAccessibilityModalVisible(true);
    };

    const closeAccessibilityModal = () => {
        setAccessibilityModalVisible(false);
    };

    const PerfilConfigPage = () => {
        navigation.navigate("PerfilConfigPage")
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.returnButton}>
                <ReturnButton navigation={navigation} />
            </View>
            <View style={styles.header}>
                <Image style={{ borderRadius: 200, height: 200, width: 200 }} source={profilePhoto} />
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.textWhite}>{userName}</Text>
            </View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={PerfilConfigPage}>
                <Text style={styles.perfilText}>Ver perfil</Text>
            </TouchableOpacity>
            <View style={{ top: 40 }}>
                <TouchableOpacity
                    onPress={openConfigModal}
                    activeOpacity={0.7}
                    style={styles.text_config}
                >
                    <Text style={styles.paragraph}>Configuração</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openHistoryModal}
                    activeOpacity={0.7}
                    style={styles.text_config}
                >
                    <Text style={styles.paragraph}>Histórico</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={openAccessibilityModal}
                    activeOpacity={0.7}
                    style={styles.text_config}
                >
                    <Text style={styles.paragraph}>Acessibilidade</Text>
                </TouchableOpacity>
                {/* Modal de Configuração */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={configModalVisible}
                    onRequestClose={closeConfigModal}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#191919',
                                width: '80%',
                                height: '80%',
                                borderRadius: 60,
                                padding: '20',

                            }}
                        >
                            <TouchableOpacity onPress={closeConfigModal}>
                                <Text style={styles.interno} >X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Modal de Histórico */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={historyModalVisible}
                    onRequestClose={closeHistoryModal}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#191919',
                                width: '80%',
                                height: '80%',
                                borderRadius: 60,
                                padding: '20',
                            }}
                        >
                            <TouchableOpacity onPress={closeHistoryModal}>
                                <Text style={styles.interno}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* Modal de Acessibilidade */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={accessibilityModalVisible}
                    onRequestClose={closeAccessibilityModal}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#191919',
                                width: '80%',
                                height: '80%',
                                borderRadius: 60,
                                padding: '20',
                            }}
                        >
                            <TouchableOpacity onPress={closeAccessibilityModal}>
                                <Text style={styles.interno}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        backgroundColor: '#191919',
        paddingHorizontal: 10,

    },

    header: {
        justifyContent: "flex-start",
        alignItems: "center",
    },

    returnButton: {
        top: 80
    },

    separator: {
        top: 20,
        marginHorizontal: 30,
    },

    textWhite: {
        color: '#C3C3C3',
        fontSize: 20,
        fontFamily: 'Montserrat-SemiBold',
        paddingTop: 10,
    },

    perfilText: {
        color: '#C3C3C3',
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        paddingTop: 10,
        textDecorationLine: 'underline',
    },

    paragraph: {
        //position: 'absolute',
        margin: 10,
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'left',
        color: '#C3C3C3',
    },

    interno: {
        top: 35,
        left: 25,
        width: 30, // Adjust the width as needed
        height: 30, // Adjust the height as needed
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#C3C3C3',
        paddingLeft: 8,
        paddingTop: 2,

    },

    stretch: {
        width: 50,
        height: 200,
        resizeMode: 'stretch',
    },

    text_config: {
        marginBottom: 10,
        alignSelf: 'flex-start',
    },

    header2: {
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
    },

    textwhite2: {
        color: '#C3C3C3',
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 10,
    },
});

export default UserProfile;