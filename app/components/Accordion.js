import React, { useState } from 'react';
import {
    LayoutAnimation,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ext from '../components/Ext';
import colors from '../misc/colors';

const Accordion = (props) => {
    const [ state, setState ] = useState({ 
        data: props.data,
        expanded : false
    });

    const handlePress = (index) => {
        const temp = state.data.slice();
        temp[index].value = !temp[index].value;
        setState({data: temp});
    };

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setState({expanded : !state.expanded});
    };

    return (
        <View>
            <TouchableOpacity style={styles.row} onPress={() => toggleExpand()}>
                <Text style={[styles.title]}>{props.brand}</Text>
                <Icon 
                    name={state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} 
                    size={30} 
                    color={colors.black}/>
            </TouchableOpacity>
            {state.expanded && <View>
                <View style={styles.general}>
                    <Text style={styles.p}>
                        <Text style={styles.bold}>{props.country}</Text>
                        {props.country.toLowerCase() != props.region && <Text> (Region: <Text style={styles.bold}>{props.region[0].toUpperCase() + props.region.substring(1).toLowerCase()}</Text>)</Text>}
                    </Text>
                    <Text style={styles.p}>Nearest Town: <Text style={styles.bold}>{props.nearestTown}</Text></Text>
                    <Text style={styles.p}>Abv.: <Text style={styles.bold}>{props.strength}%</Text></Text>
                    {props.caskStrength && <Text style={styles.p}>Cask Strength</Text>}
                    {props.chillFiltered && <Text style={styles.p}>Chill Filtered</Text>}
                    <Text style={styles.p}>Type: <Text style={styles.bold}>{props.type}</Text></Text>
                    {props.age.length > 0 && props.age != '-' && <Text style={styles.p}>Matured {props.age} years</Text>}
                    {props.taster && <Text style={styles.p}>Taster</Text>}
                    <Ext style={styles.buy} url={props.url}>Buy</Ext>
                </View>

                <View style={styles.tasting}>
                    <Text style={styles.p}>Date of Tasting: <Text style={styles.bold}>{props.dateOfTasting}</Text></Text>
                    <Text style={styles.p}>
                        Color: <Text style={styles.bold}>{props.color}</Text>, 
                        Glance: <Text style={styles.bold}>{props.glance}% oily</Text>
                    </Text>
                    <Text style={styles.p}>
                        Flavour: <Text style={styles.bold}>{props.flavour}</Text>,
                        Finish: <Text style={styles.bold}>{props.finish}</Text>
                    </Text>
                    <Text style={styles.p}>
                        Rating: <Text style={styles.bold}>{props.rating}</Text>
                        {props.wouldBuy && <Text style={styles.p}> (Would buy again)</Text>}
                    </Text>
                    
                    {props.notes.length > 0 && <Text style={styles.p}>Other notes: <Text style={styles.bold}>{props.notes}</Text></Text>}
                </View>
            </View>}
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        height: 54,
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 12
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.gray
    },
    itemActive: {
        fontSize: 12,
        color: colors.purple
    },
    itemInActive: {
        fontSize: 12,
        color: colors.gray
    },
    btnActive: {
        borderColor: colors.purple
    },
    btnInActive: {
        borderColor: colors.gray
    },
    row: {
        borderTopColor: colors.light,
        borderTopWidth: 1,
        borderTopStyle: "solid",
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        width: 320
    },
    childRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    p: {
        marginBottom: 4,
        color: colors.black
    },
    bold: {
        fontWeight: "bold"
    },
    brand: {
        fontWeight: "bold",
        width: 120
    },
    general: {
        padding: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.light
    },
    tasting: {
        backgroundColor: colors.light,
        padding: 10,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: colors.light
    },
    strength: {
        width: 80
    },
    rating: {
        width: 60
    },
    buy: {
        backgroundColor: colors.purple,
        color: colors.white,
        borderRadius: 8,
        fontWeight: "bold"
    },
    parentHr: {
        height: 1,
        width: '100%'
    },
    colorActive: {
        borderColor: colors.purple
    },
    colorInActive: {
        borderColor: colors.grey
    }
});

export default Accordion;
