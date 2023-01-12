import React, { useState, useCallback } from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { jsonLinks } from '../../assets/json';
import Ext from '../components/Ext';
import colors from '../misc/colors';

const Links = () => {
    const [ show, setShow ] = useState(false);

    return (<ScrollView>
        <Modal animationType="slide" transparent={true} visible={show} onRequestClose={() => {setShow(!show);}} key="modal">
            <View style={styles.centeredView} key="main-view">
                <View style={styles.modalView} key="sub-view">
                    <Text style={styles.h1} key="header">Links</Text>
                    <Text style={styles.p} key="intro">
                        Below are some links to some Wiki pages that helped me to find the right fields for this form 
                        and some shops I usually go to. This list might be editable in the future.
                    </Text>

                    {Object.keys(jsonLinks).map(key => {
                        const item = jsonLinks[key];
                        return (<>
                            <Text style={styles.h2} key={'title-' + key}>{item.title}</Text>
                            <View style={styles.list} key={'list-' + key}>
                                {Object.keys(item.links).map(keySub => {
                                    const subItem = item.links[keySub];
                                    return (<Ext key={'sub-' + keySub} url={subItem.href} style={styles.listItem}>&bull; {subItem.title}</Ext>);
                                })}
                            </View>
                        </>);
                    })}

                    <Pressable style={styles.button} onPress={() => setShow(!show)} key="close-button">
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        <Pressable onPress={() => setShow(true)} key="open-button">
            <Text style={styles.buttonText} key="button-text">Links</Text>
        </Pressable>
    </ScrollView>);
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
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
    p: {
        marginBottom: 4
    },
    list: {
        marginLeft: 10,
        marginBottom: 20,
        padding: 4,
        width: 300
    },
    listItem: {
        color: colors.purple,
        backgroundColor: "none",
        margin: 0,
        padding: 0,
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

export default Links;
