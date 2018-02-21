import {StyleSheet, Text, View} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    header: {alignItems: 'flex-start', justifyContent: 'flex-start', height: 60, paddingTop: 20, paddingBottom: 20, flexDirection: 'row'},
    headerText900: {fontWeight: '900', fontSize: 20, backgroundColor: 'transparent'},
    headerText800: {fontWeight: '700', fontSize: 20, backgroundColor: 'transparent'},
    headerText700: {fontWeight: '500', fontSize: 20, backgroundColor: 'transparent'},
    headerText600: {fontWeight: '300', fontSize: 20, backgroundColor: 'transparent'},
    headerText500: {fontWeight: '100', fontSize: 20, backgroundColor: 'transparent'},

});

export const Header = () => <View style={styles.header}>
    <Text style={styles.headerText900}>React</Text>
    <Text style={styles.headerText800}>Native</Text>
    <Text style={styles.headerText600}>Firebase</Text>
    <Text style={styles.headerText500}>Example</Text>
</View>;