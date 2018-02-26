import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FirebaseService} from '../../services/FirebaseService';
import {nodes} from '../../utils/custom/nodes';
import {Header} from "../Header/Header";
import {List} from "../List/List";
import {copyFirebaseObjWithoutKey} from "../../utils/util";

const styles = StyleSheet.create({
    container: {backgroundColor: 'transparent', flex: 1,},
    margin10: {margin: 10},
    nodeList: {flexDirection: 'row', marginBottom: 10},
    nodeListText: {backgroundColor: 'transparent'},
    nodeListTextTouch: {marginRight: 20},
    fullWidth: {flex: 1}
});

export default class DataList extends React.Component {

    state = {
        dataList: null,
        node: nodes.devices,
        ref: null
    };
    changeAndPushKeyStateOfNode = (item, key) => {
        if (key.type !== 'checkbox') {
            return;
        }
        const copyItem = copyFirebaseObjWithoutKey(item, key);
        FirebaseService.writeData(item['.key'], copyItem, this.state.node);
    };
    updateNode = (node) => {
        if (node !== this.state.node) {
            this.setState({dataList: null, node});
        }

        if (this.state.ref !== undefined) {
            this.state.ref.off();
        }

        let ref = FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 20, c => node.flat(c), node.orderByChild);
        this.setState({ref});
    };

    componentDidMount() {
        const {node} = this.state;
        let ref = FirebaseService.getAllDataBy(node, dataIn => this.setState({dataList: dataIn}), 20, c => node.flat(c), node.orderByChild);
        this.setState({ref});
    };

    render() {
        const {dataList, node} = this.state;

        const dataListProps = {dataList, node, changeAndPushKeyStateOfNode: this.changeAndPushKeyStateOfNode};

        return (
            <ScrollView style={styles.margin10}>
                <Header/>
                <View style={styles.nodeList}>
                    {
                        Object.values(nodes).map((node, index) =>
                            <TouchableOpacity key={index} onPress={() => this.updateNode(node)} style={styles.nodeListTextTouch}>
                                <Text style={[styles.nodeListText, {fontWeight: node === this.state.node ? 'bold' : '100'}]}>{node.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View style={styles.fullWidth}>
                    <List {...dataListProps}/>
                </View>
            </ScrollView>
        );
    }
}