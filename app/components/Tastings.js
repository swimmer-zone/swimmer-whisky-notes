import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import {
    Form,
    FormItem,
    Picker
} from 'react-native-form-component';
import Swipeout from 'react-native-swipeout';
import { jsonTastings } from '../../assets/json';
import Accordion from '../components/Accordion';
import colors from '../misc/colors';
import { realm as realmTasting } from '../../databases/tasting';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const TastingItem = props => {
    const { id, brand } = props;
    const showEditModal = () => {

    };
    const confirmDelete = () => {
        Alert.alert(
            'Delete',
            'Delete a tasting',
            [
                {
                    text: 'No', onPress: () => {}
                },
                {
                    text: 'Yes', onPress: () => {}
                }
            ]
        );
    };
    return (<Swipeout right={[
        {
            text: 'Edit', 
            backgroundColor: 'green', 
            onPress: showEditModal
        }, {
            text: 'Delete', 
            backgroundColor: 'red', 
            onPress: confirmDelete
        }]} autoClose={true}>
        <TouchableOpacity onPress={onPressItem}>
            <View>
                <Text>{brand}</Text>
            </View>
        </TouchableOpacity>
    </Swipeout>);
};

const Tastings = () => {
    const [ show, setShow ] = useState(false);
    const [ search, setSearch ] = useState("");
    const [ asc, setAsc ] = useState("");
    const [ sort, setSort ] = useState("");
    const [ filter, setFilter ] = useState("");
    const [ filters, setFilters ] = useState("");

    const [ tastings, setTastings ] = useState([]);

    reloadData = () => {
        realmTasting._read().then((tastings) => {
            setTastings(tastings);
        }).catch((error) => {

        });
        console.log('reloadData', tastings);
    };

    // if (isAddNew == true) {
        const newTasting = {
            id: Math.floor(Date.now() / 1000),
            brand: 'Test',
            createdAt: new Date()
        };
        realmTasting._create(newTasting).then().catch((error) => {
            alert('Create new Tasting failed: ' + error);
        });
    // }

    const jsonSort = [
        { "value": "", "label": "-- Sort --" },
        { "value": "brand", "label": "Brand" },
        { "value": "dateOfTasting", "label": "Date of Tasting" },
        { "value": "strength", "label": "Strength" },
        { "value": "rating", "label": "Rating" }
    ];

    const jsonFilter = [
        { "value": "", "label": "-- Filters --" },
        { "value": "brand", "label": "Brand" },
        { "value": "country", "label": "Country" },
        { "value": "region", "label": "Region" },
        { "value": "type", "label": "Type" },
        { "value": "taster", "label": "Taster" },
        { "value": "flavour", "label": "Flavour" },
        { "value": "wouldBuy", "label": "Would Buy" }
    ];

    const searchable = {
        "brand": "Brand",
        "nearestTown": "Nearest Town",
        "age": "Age",
        "url": "URL",
        "notes": "Notes"
    };

    const handleImport = () => {
    };

    const handleExport = () => {
    };

    const sortResults = () => {
        jsonTastings.sort(function(a, b) {
            if (asc) {
                return (a[sort] > b[sort]) ? 1 : ((a[sort] < b[sort]) ? -1 : 0);
            } else {
                return (b[sort] > a[sort]) ? 1 : ((b[sort] < a[sort]) ? -1 : 0);
            }
        });
        return jsonTastings;
    };

    const renderAccordions = () => {
        const items = [];
        for (let item of sortResults()) {
            items.push(<Accordion 
                brand={item.brand}
                dateOfTasting={item.dateOfTasting}
                country={item.country}
                region={item.region}
                nearestTown={item.nearestTown}
                caskStrength={item.caskStrength}
                chillFiltered={item.chillFiltered}
                type={item.type}
                age={item.age}
                strength={item.strength}
                taster={item.taster}
                url={item.url}
                flavour={item.tasting.flavour}
                glance={item.tasting.glance}
                color={item.tasting.color}
                finish={item.tasting.finish}
                rating={item.tasting.rating}
                wouldBuy={item.tasting.wouldBuy}
                notes={item.tasting.notes}
            />);
        }
        return items;
    }

    return (<View>
        <Modal 
            animationType="slide" 
            visible={show} 
            onRequestClose={() => {setShow(!show);}} 
            presentationStyle="fullScreen" 
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.h1}>My Tastings ({jsonTastings.length})</Text>

                    {/* <View style={styles.buttonContainer}>
                        <Pressable style={styles.buttonImport} onPress={() => handleImport()}>
                            <Text style={styles.textStyle}>Import JSON</Text>
                        </Pressable>
                        <Pressable style={styles.buttonImport} onPress={() => handleExport()}>
                            <Text style={styles.textStyle}>Export JSON</Text>
                        </Pressable>
                    </View> */}

                    <View style={styles.filterContainer}>
                        {/* <FormItem 
                            type="text" 
                            id="search" 
                            placeholder="Search" 
                            style={styles.input}
                            value={search}
                            onChangeText={(search) => setSearch(search)}/> */}
                        <Picker 
                            id="sort"
                            items={jsonSort}
                            style={styles.input}
                            selectedValue={sort}
                            onSelection={(sort) => setSort(sort)}/>
                        <Picker 
                            id="flavour" 
                            items={jsonFilter} 
                            style={styles.input} 
                            // isMulti
                            selectedValue={filter}
                            onSelection={(filter) => setFilter(filter)}/>
                    </View>

                    <ScrollView style={styles.listContainer}>{renderAccordions()}</ScrollView>

                    <Pressable style={styles.button} onPress={() => setShow(!show)}>
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
        <Pressable onPress={() => setShow(true)}>
            <Text style={styles.buttonText}>My Tastings</Text>
        </Pressable>
    </View>);
}

const styles = StyleSheet.create({
    listContainer: {
        height: 500,
        marginBottom: 20,
        width: 320
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 0
    },
    modalView: {
        margin: 0,
        backgroundColor: colors.white,
        padding: 20,
        alignItems: "center",
        shadowColor: colors.black
    },
    h1: {
        fontSize: 32,
        fontWeight: "bold",
        margin: 16
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "space-between",
        width: 300,
        height: 40,
        flex: 1,
        flexDirection: 'row'
    },
    filterContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    input: {
        fontFamily: "IndieFlower",
        borderRadius: 8,
        width: 350,
        marginLeft: 4,
        marginBottom: 4,
        padding: 2,
        backgroundColor: colors.white,
        elevation: 4,
        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.black
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
    buttonImport: {
        backgroundColor: colors.black,
        color: colors.white,
        padding: 2,
        marginBottom: 4,
        marginRight: 4,
        borderRadius: 8,
        elevation: 16,
        shadowColor: colors.black,
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: 120
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

export default Tastings;
