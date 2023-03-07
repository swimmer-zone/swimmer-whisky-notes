import React, { useState, useEffect } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    Form,
    FormItem,
    Picker
} from 'react-native-form-component';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import Clipboard from '@react-native-clipboard/clipboard';
import Slider from '@react-native-community/slider';
import SwitchSelector from "react-native-switch-selector";
import {
    jsonColors,
    jsonCountries,
    jsonDistilleries,
    jsonFinishes,
    jsonFlavours,
    jsonInput,
    jsonRegions,
    jsonTypes
} from '../../assets/json';
import colors from '../misc/colors';
import mapStyle from '../misc/mapStyle';

const TastingForm = () => {
    const [ state, setState ] = useState(jsonInput);

    const [ region, setRegion ] = useState({
        "latitude": 51.5079145,
        "longitude": -0.0899163,
        "latitudeDelta": 0.1,
        "longitudeDelta": 0.1
    });
    const [ marker, setMarker ] = useState({latitude: 0, longitude: 0});
    const [ status, requestPermission ] = Location.useForegroundPermissions();

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});

                setRegion({
                    "latitude": location.coords.latitude,
                    "longitude": location.coords.longitude,
                    "latitudeDelta": 0.5,
                    "longitudeDelta": 0.5
                });
            }
        })();
    }, []);

    const copyJson = () => {
        Clipboard.setString(JSON.stringify(state, undefined, 4));
    };

    const getToday = () => {
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() < 9 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1;
        const todayDay = today.getDate() <= 9 ? '0' + today.getDate() : today.getDate();
        return todayYear + '-' + todayMonth + '-' + todayDay;
    };
    if (state.dateOfTasting.length < 1) {
        state.dateOfTasting = getToday();
    }

    if (state.nearestTown.length < 1 || state.nearestTown == state.brand.substring(0, state.brand.length - 1)) {
        state.nearestTown = state.brand;
    }

    if (state.country !== 'Scotland') {
        switch (state.country) {
            case 'The Netherlands':
                state.region = 'netherlands';
                break;
            case 'United States':
                state.region = 'usa';
                break;
            default:
                state.region = state.country.toLowerCase();
                break;
        }
    }

    const getColor = (id) => {
        return jsonColors.filter( element => element.id == id)[0].value;
    }
    const getColorId = (value) => {
        return jsonColors.filter( element => element.value == value)[0].id;
    }
    const getColorHex = (value) => {
        return jsonColors.filter( element => element.value == value)[0].hex;
    }

    return (<Form onButtonPress={copyJson} buttonText={'Copy JSON'} buttonStyle={styles.button}>
        <FormItem 
            type="text" 
            id="brand" 
            key="brand" 
            placeholder="Brand / Distillery name" 
            style={styles.input}
            shadowOpacity={8} shadowRadius={4} shadowOffset={[4, 4]} shadowColor={'black'}
            isRequired
            asterisk
            value={state.brand}
            onChangeText={(brand) => setState({...state, brand: brand})}/>

        <FormItem 
            type="date" 
            id="date-of-tasting" 
            key="date-of-tasting" 
            style={styles.input}
            isRequired
            value={state.dateOfTasting}
            onChangeText={(dateOfTasting) => setState({...state, dateOfTasting: dateOfTasting})}/>

        <View key="country-wrapper" style={styles.pickerWrapper}>
            <Picker 
                id="country" 
                items={jsonCountries} 
                style={styles.input}
                isRequired
                selectedValue={state.country}
                onSelection={(item) => setState({...state, country: item.value})}/>
        </View>

        {state.country === 'Scotland' && (
        <View key="region-wrapper" style={styles.pickerWrapper}>
            <Picker 
                id="region" 
                items={jsonRegions} 
                style={styles.input}
                selectedValue={state.region}
                onSelection={(item) => setState({...state, region: item.value})}/>
        </View>) }

        <FormItem 
            type="text" 
            id="nearest-town" 
            key="nearest-town" 
            placeholder="Nearest Town" 
            style={styles.input}
            value={state.nearestTown}
            onChangeText={(nearestTown) => setState({...state, nearestTown: nearestTown})}/>

        <SwitchSelector
            id='cask-strength'
            key='cask-strength'
            initial={1}
            borderRadius={8}
            borderWidth={-2}
            onPress={(caskStrength) => setState({...state, caskStrength: caskStrength})}
            textColor={colors.black}
            selectedColor={colors.white}
            buttonColor={colors.purple}
            borderColor={colors.white}
            style={styles.input}
            hasPadding
            options={[
                { label: "Cask strength", value: true },
                { label: "No cask strength", value: false }
            ]}/>

        <SwitchSelector
            id='chill-filtered'
            key='chill-filtered'
            initial={1}
            borderRadius={8}
            borderWidth={-2}
            onPress={(chillFiltered) => setState({...state, chillFiltered: chillFiltered})}
            textColor={colors.black}
            selectedColor={colors.white}
            buttonColor={colors.purple}
            borderColor={colors.white}
            style={styles.input}
            hasPadding
            options={[
                { label: "Chill filtered", value: true },
                { label: "Not filtered", value: false }
            ]}/>

        <View key="type-wrapper" style={styles.pickerWrapper}>
            <Picker 
                id="type" 
                items={jsonTypes} 
                style={styles.input}
                selectedValue={state.type}
                onSelection={(item) => setState({...state, type: item.value})}/>
        </View>

        <FormItem 
            id="age" 
            key="age" 
            type="number" 
            inputmode="numeric" 
            placeholder="How many years has it aged in the cask" 
            style={styles.input}
            value={state.age}
            onChangeText={(age) => setState({...state, age: age})}/>

        <FormItem 
            id="strength" 
            key="strength" 
            type="number" 
            inputmode="numeric" 
            min="40" 
            max="100" 
            placeholder="Alcohol level in %" 
            style={styles.input}
            value={state.strength}
            onChangeText={(strength) => setState({...state, strength: strength})}/>

        <SwitchSelector
            id="taster"
            key="taster"
            initial={1}
            borderRadius={8}
            borderWidth={-2}
            onPress={(taster) => setState({...state, taster: taster})}
            textColor={colors.black}
            selectedColor={colors.white}
            buttonColor={colors.purple}
            borderColor={colors.white}
            style={styles.input}
            hasPadding
            options={[
                { label: "Taster", value: true },
                { label: "Regular bottle", value: false }
            ]}/>

        <FormItem 
            id="url" 
            key="url" 
            type="text" 
            placeholder="URL: Preferably https://www.heijdenwijnimport.nl/" 
            style={styles.input}
            value={state.url}
            onChangeText={(url) => setState({...state, url: url})}/>

        <Text style={styles.h2}>My Tasting</Text>

        <View style={styles.mapContainer}>
            <MapView 
                showsUserLocation={true}
                style={styles.map}
                initialRegion={region}
                region={region}
                customMapStyle={mapStyle}
                onRegionChangeComplete={(region) => setRegion(region)}
                onPress={(e) => setMarker({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}>
                {
                    jsonDistilleries.map((distillery, i) => (
                        <Marker 
                            coordinate={{"latitude": distillery.latitude, "longitude": distillery.longitude}} 
                            key={i}
                            image={require("../../assets/images/logo128.png")}>
                            <Text style={{marginLeft: 44, marginTop: 12}}>{distillery.name}</Text>
                        </Marker>
                    ))
                }
                <Marker 
                    coordinate={marker} 
                    image={require("../../assets/images/glass128.png")}>
                    <Text style={{marginLeft: 40, marginTop: 10}}>{'Tasting ' + state.brand}</Text>
                </Marker>
            </MapView>
        </View>
        <FormItem 
            id="location-text" 
            key="location-text" 
            type="text" 
            readonly 
            style={[styles.input, styles.readonly]}
            value={'x: ' + region.latitude + ', y: ' + region.longitude}/>

        <Slider
            id="color"
            key="color"
            style={styles.slider}
            minimumValue={1}
            maximumValue={9}
            step={1}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.black}
            thumbTintColor={colors.black}
            value={getColorId(state.tasting.color)}
            onValueChange={(color) => setState({...state, tasting: {...state.tasting, color: getColor(color)}})}/>
        <FormItem 
            type="text" 
            id="color-text" 
            key="color-text" 
            value={state.tasting.color} 
            readonly 
            style={{...styles.input, ...styles.readonly, backgroundColor: getColorHex(state.tasting.color)}}/>

        <Slider
            id="glance"
            key="glance"
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={10}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.black}
            thumbTintColor={colors.black}
            value={state.tasting.glance}
            onValueChange={(glance) => setState({...state, tasting: {...state.tasting, glance: glance}})}/>
        <FormItem 
            type="text" 
            id="glance-text" 
            key="glance-text" 
            value={state.tasting.glance + '% oily'} 
            readonly 
            style={[styles.input, styles.readonly]}/>

        <View key="flavour-wrapper" style={styles.pickerWrapper}>
            <Picker 
                id="flavour" 
                items={jsonFlavours} 
                style={styles.input} 
                isMulti
                selectedValue={state.tasting.flavour}
                onSelection={(item) => setState({...state, tasting: {...state.tasting, flavour: item.value}})}/>
        </View>

        <View key="finish-wrapper" style={styles.pickerWrapper}>
            <Picker 
                id="finish" 
                items={jsonFinishes} 
                style={styles.input}
                selectedValue={state.tasting.finish}
                onSelection={(item) => setState({...state, tasting: {...state.tasting, finish: item.value}})}/>
        </View>

        <Slider
            id="rating"
            key="rating"
            style={styles.slider}
            minimumValue={1}
            maximumValue={5}
            step={.5}
            minimumTrackTintColor={colors.white}
            maximumTrackTintColor={colors.black}
            thumbTintColor={colors.black}
            value={state.tasting.rating}
            onValueChange={(rating) => setState({...state, tasting: {...state.tasting, rating: rating}})}/>
        <FormItem 
            type="text" 
            id="rating-text" 
            key="rating-text" 
            value={state.tasting.rating + ' stars'} 
            readonly 
            style={[styles.input, styles.readonly]}/>

        <SwitchSelector
            id="would-buy"
            key="would-buy"
            initial={1}
            borderRadius={8}
            borderWidth={-2}
            onPress={(wouldBuy) => setState({...state, tasting: {...state.tasting, wouldBuy: wouldBuy}})}
            textColor={colors.black}
            selectedColor={colors.white}
            buttonColor={colors.purple}
            borderColor={colors.white}
            style={styles.input}
            hasPadding
            options={[
                { label: "Would buy again", value: true },
                { label: "Not again", value: false }
            ]}/>

        <FormItem 
            id="notes" 
            key="notes" 
            placeholder="Some notes..." 
            textArea 
            style={styles.input}
            value={state.tasting.notes}
            onChangeText={(notes) => setState({...state, tasting: {...state.tasting, notes: notes}})}/>

        <Text class="json_output" style={styles.output}>
            {JSON.stringify(state, undefined, 4)}
        </Text>
    </Form>);
}

const styles = StyleSheet.create({
    h2: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 8,
        marginTop: 16,
        textAlign: "center"
    },
    button: {
        backgroundColor: colors.black,
        color: colors.white,
        padding: 8,
        marginLeft: 120,
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
    input: {
        fontFamily: "IndieFlower",
        borderRadius: 8,
        width: 350,
        marginLeft: 20,
        marginBottom: 20,
        padding: 4,
        backgroundColor: colors.white,
        elevation: 4,
        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    pickerWrapper: {
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 16
    },
    slider: {
        width: 350,
        marginLeft: 20,
        marginBottom: 20
    },
    readonly: {
        backgroundColor: colors.white + '22',
        elevation: 0
    },
    colors: {
        height: 8
    },
    mapContainer: {
        marginLeft: 20,
        width: 350,
        height: 350,
        borderRadius: 8,
        marginBottom: 10
    },
    map: {
        width: 350,
        height: 350,
        borderRadius: 8
    },
    output: {
        borderRadius: 8,
        width: 350,
        minHeight: 200,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 40,
        backgroundColor: colors.black,
        fontFamily: "monospace",
        color: colors.purple,
        whiteSpace: "pre",
        elevation: 8,
        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        overflow: "hidden",
        fontSize: 16
    }
});

export default TastingForm;
