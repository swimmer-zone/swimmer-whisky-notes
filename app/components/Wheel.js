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
import ImageZoom from 'react-native-image-pan-zoom';
import Ext from '../components/Ext';
import colors from '../misc/colors';

const Wheel = () => {
    const [ show, setShow ] = useState(false);

    return (<View>
        <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => {setShow(!show);}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.h1}>Flavour Wheel</Text>
                    <Text style={styles.p}>
                        A visualisation of the possible flavours. Pinch to zoom.
                    </Text>
                    <ImageZoom cropWidth={340} cropHeight={340} imageWidth={320} imageHeight={320}>
                        <Image source={require('../../assets/images/wheel.png')} style={styles.image}/>
                    </ImageZoom>
                    <Pressable style={styles.button} onPress={() => setShow(!show)}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        <Pressable onPress={() => setShow(true)}>
            <Text style={styles.buttonText}>Flavour Wheel</Text>
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
        width: 320,
        height: 320,
        resizeMode: "stretch"
    },
    modalView: {
        margin: 10,
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 0,
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
    p: {
        marginBottom: 32,
        paddingHorizontal: 35
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
        marginVertical: 20,
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

export default Wheel;
