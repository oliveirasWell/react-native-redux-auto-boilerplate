import {StyleSheet, Text, View} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    header: {alignItems: 'flex-start', justifyContent: 'center', height: 60, paddingTop: 20, paddingBottom: 20},
    headerText: {fontWeight: '900', fontSize: 30, backgroundColor: 'transparent'},

});

export const Header = () => <View style={styles.header}>
    <Text style={styles.headerText}>Home Controller</Text>
</View>;