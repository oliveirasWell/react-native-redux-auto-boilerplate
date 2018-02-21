import {StyleSheet, Switch, Text, View} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    switchName: {fontSize: 10, color: '#f4f4f4'},
    margin10: {margin: 10},

});

export const ItemProperty = ({index, keyIn: key, changeNode, item}) => {
    return <View style={styles.margin10}>
        <Text style={styles.switchName}> {key.name} </Text>
        <Switch style={styles.margin10} onValueChange={() => changeNode(item, key)} value={item[key.key]} tintColor="white"/>
    </View>
};