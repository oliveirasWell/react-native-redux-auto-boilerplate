import React from "react";
import {Platform, StyleSheet, View} from "react-native";

const styles = StyleSheet.create({
    statusBarBackground: {
        height: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: "white",
    },
});

export const IPhoneStatusBarPlaceHolder = () => <View style={[styles.statusBarBackground]}/>;
