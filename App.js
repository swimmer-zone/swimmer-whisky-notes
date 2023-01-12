import React, { useCallback } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { About, Links, TastingForm, Tastings, Wheel } from './app/components';
import colors from './app/misc/colors';

SplashScreen.preventAutoHideAsync();

const App = () => {
    const [fontsLoaded] = useFonts({
        'IndieFlower': require('./assets/fonts/indieflower.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);
  
    if (!fontsLoaded) {
        return null;
    }

    return (<ScrollView style={styles.container} onLayout={onLayoutRootView}>
        <Image source={require('./assets/images/logo256.png')} style={styles.image}/>
        <TastingForm />

        <Text style={styles.textStyle}>
            [ <Tastings /> | <Wheel /> | <Links /> | <About /> ]
        </Text>
    </ScrollView>);
}

const styles = StyleSheet.create({
    container: {
        fontFamily: "IndieFlower",
        fontSize: 20,
        boxSizing: "border-box",
        backgroundColor: colors.purple
    },
    image: {
        marginLeft: 60,
        marginTop: 20
    },
    textStyle: {
        color: colors.white,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 200,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default App;
