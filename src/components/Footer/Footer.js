import {socialLinks} from "../../utils/staticLinks";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
    footer: {alignSelf: 'center', alignItems: 'center', height: 40},
    socialLink: {fontSize: 10, marginTop: 10, marginBottom: 20, color: '#b9b9b9'},
});

export const Footer = () => <View style={styles.footer}>
    <Text style={styles.socialLink}>{socialLinks.github}</Text>
</View>;