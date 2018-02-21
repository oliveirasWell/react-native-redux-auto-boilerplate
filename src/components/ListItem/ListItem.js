import {StyleSheet, Text, View} from "react-native";
import {getRandomImage} from "../../utils/images";
import React from "react";
import BorderedCardWithFade from "../ui/BorderedCardWithFade";
import {ItemProperty} from "../ItemProperty/ItemProperty";

const styles = StyleSheet.create({
    itemValueTextHeader: {color: 'white', fontWeight: '400', fontSize: 25, marginTop: 5, marginBottom: 15},
    itemValueText: {color: 'white', fontSize: 15, marginTop: 5, marginBottom: 15},
    listItem: {
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 20,
        backgroundColor: '#000000',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 15,
        shadowRadius: 1,
        shadowOpacity: 0.24,
        shadowOffset: {
            width: 0,
            height: 1
        },
        minHeight: 175,
    },
    listItemSwitchers: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',},
    listItemText: {fontSize: 10, color: '#f4f4f4'},

});


export const ListItem = ({item, node, changeNode}) => {

    const {keys} = node;

    const printItem = (key, item) => {
        if (key.key === 'name' || key.name === 'Name') {
            return <Text style={styles.itemValueTextHeader}> {getItemOrTrueIfTrue(item[key.key])} </Text>
        } else {
            return <Text style={styles.itemValueText}> {getItemOrTrueIfTrue(item[key.key])} </Text>;
        }
    };

    const getItemOrTrueIfTrue = (item) => {
        if (item === true) {
            return 'on';
        } else if (item === false) {
            return 'off';
        } else {
            return item
        }
    };

    const image = {uri: !!(item['imageUrl']) ? item['imageUrl'] : getRandomImage()};

    return (
        item &&
        <View style={styles.listItem}>

            <BorderedCardWithFade src={image}
                //its need to be obj
                                  style={{
                                      flex: 1,
                                      top: 0,
                                      left: 0,
                                      bottom: 0,
                                      right: 0,
                                      position: 'absolute',
                                      borderRadius: 20,
                                  }}
            />

            {
                keys.filter(key => !(key.type === 'checkbox')).map((key, index) =>
                    <React.Fragment key={index}>
                        <Text style={styles.listItemText}> {key.name} </Text>
                        {printItem(key, item)}
                    </React.Fragment>
                )
            }

            <View style={styles.listItemSwitchers}>
                {
                    keys.filter(key => key.type === 'checkbox').map((key, index) =>
                        <ItemProperty key={index} keyIn={key} changeNode={changeNode} item={item}/>
                    )
                }
            </View>
        </View>
    );
};