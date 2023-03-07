import React, { useState } from 'react';
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Ext from '../components/Ext';
import colors from '../misc/colors';
import packageJson from '../package.json';

const About = () => {
    const [ show, setShow ] = useState(false);

    const getYear = () => {
        const today = new Date();
        const todayYear = today.getFullYear();
        return todayYear;
    };

    return (<View>
        <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => {setShow(!show);}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.h1}>About</Text>
                    <Text style={styles.p}>
                        Version {packageJson.version}
                    </Text>
                    <Text style={styles.p}>
                        Developed by Swimmer to simplify adding new whiskies to my website while tasting. This app 
                        saves your findings locally and the contents can be exported as a JSON string, which makes
                        the app operate strictly offline, with one optional exception: It can use the Google Maps 
                        API to enter the location where you did the tasting. This can also be entered manually.
                    </Text>
                    <Image source={require('../../assets/images/swimmer.png')} style={styles.image}/>
                    <Text style={styles.p}>Visit my website:</Text>
                    <Ext url={'https://swimmer.zone/'}>
                        <Text>https://swimmer.zone</Text>
                    </Ext>
                    <Text style={styles.p}>
                        Here you can also find my personal tastings.
                    </Text>
                    <Text style={styles.copy}>
                        &copy; Swimmer 2022 / {getYear()}
                    </Text>
                    <Pressable style={styles.button} onPress={() => setShow(!show)}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        <Pressable onPress={() => setShow(true)}>
            <Text style={styles.buttonText}>About</Text>
        </Pressable>
    </View>);
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    image: {
        width: 300,
        height: 92,
        resizeMode: "stretch"
    },
    modalView: {
        margin: 10,
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 35,
        elevation: 16,
        alignItems: "center",
        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.16,
        shadowRadius: 4
    },
    h1: {
        fontSize: 32,
        fontWeight: "bold",
        margin: 16
    },
    h2: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 8,
        marginTop: 16
    },
    version: {
        marginBottom: 4
    },
    p: {
        marginBottom: 4,
        
    },
    copy: {
        marginBottom: 20
    },
    list: {
        marginLeft: 10,
        marginBottom: 20,
        padding: 4,
        width: 240
    },
    button: {
        backgroundColor: colors.black,
        color: colors.white,
        padding: 8,
        marginBottom: 20,
        width: 160,
        borderRadius: 8,
        elevation: 16,
        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    buttonText: {
        color: colors.white,
        marginTop: 4,
        marginBottom: -4
    },
    textStyle: {
        color: colors.white,
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default About;
