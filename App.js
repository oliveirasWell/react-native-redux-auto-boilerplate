import React from 'react';
import DataList from "./src/components/DataList/DataList";
import {Footer} from "./src/components/Footer/Footer";
import {StyleSheet, View} from "react-native";
import {IPhoneStatusBarPlaceHolder} from "./src/components/ui/IPhoneStatusBarPlaceHolder";

const styles = StyleSheet.create({
    container: {backgroundColor: 'transparent', flex: 1,},
});

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <IPhoneStatusBarPlaceHolder/>
                <DataList/>
                <Footer/>
            </View>
        );
    }
}
