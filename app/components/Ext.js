import React, { useCallback } from 'react';
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import colors from '../misc/colors';

const Ext = ({url, key, style, children}) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
  
        if (supported) {
            // Opening the link with some app, if the URL scheme is "https" or "http" 
            // the web link should be opened by some browser in the mobile
            await Linking.openURL(url);
        }
    }, [url]);

    return (<TouchableOpacity style={styles.listItem} onPress={handlePress} key={key}>
        <Text style={style} key={'text-' + key}>{children}</Text>
    </TouchableOpacity>);
};

export default Ext;
