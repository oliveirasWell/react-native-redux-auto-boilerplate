import {ListItem} from "../ListItem/ListItem";
import {StyleSheet, Text} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    textMessage: {color: 'black', textAlign: 'center', fontSize: 20, marginTop: 20, marginBottom: 20},
});

export const List = ({dataList, node, changeAndPushKeyStateOfNode}) => {
    if (dataList == null) {
        return <Text style={styles.textMessage}> Loading... </Text>
    }

    if (dataList.length === 0) {
        return <Text style={styles.textMessage}> nothing here </Text>
    }

    return dataList.map((item, index) =>
        <ListItem key={index} node={node} item={item} changeNode={changeAndPushKeyStateOfNode}/>
    );
};